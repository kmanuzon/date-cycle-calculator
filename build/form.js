//var React = require('react');
//var DatePicker = require('react-datepicker');
//var moment = require('moment');

var Report = React.createClass({
    displayName: "Report",

    daysToMilliseconds: function (numOfDays) {
        // hours per day, minutes per hour, seconds per minute, millisecconds.
        return 24 * 60 * 60 * 1000 * numOfDays;
    },
    buildReport: function (data) {
        var report = [];
        var days = parseInt(data.days);
        var stages = parseInt(data.stages);
        var stageDate;
        for (var i = 0; i < stages; i++) {
            if (i === 0) {
                // do nothing.
                stageDate = new Date(data.startDate);
            } else {
                stageDate = new Date(stageDate.getTime() + this.daysToMilliseconds(days));
            }
            report.push({
                id: Date.now() + i,
                label: i + 1,
                //date: stageDate.toDateString()
                date: moment(stageDate.getTime()).format("YYYY-MM-DD"),
                datePretty: moment(stageDate.getTime()).format("dddd, MMMM D, YYYY")
            });
        }
        // calculate last day.
        stageDate = new Date(stageDate.getTime() + this.daysToMilliseconds(days - 1));
        report.push({
            id: Date.now() + stages,
            label: 'Last day',
            //date: stageDate.toDateString()
            date: moment(stageDate.getTime()).format("YYYY-MM-DD"),
            datePretty: moment(stageDate.getTime()).format("dddd, MMMM D, YYYY")
        });
        return report;
    },
    buildListItem: function (item) {
        return React.createElement(
            "li",
            { key: item.id },
            item.label,
            " -- ",
            item.date
        );
    },
    buildRow: function (item) {
        console.log(item);
        return React.createElement(
            "tr",
            null,
            React.createElement(
                "td",
                null,
                item.label
            ),
            React.createElement(
                "td",
                null,
                item.date
            ),
            React.createElement(
                "td",
                null,
                item.datePretty
            )
        );
    },
    render: function () {
        var reports = this.buildReport(this.props.data);
        //<ul>{reports.map(this.buildListItem)}</ul>
        return React.createElement(
            "div",
            null,
            React.createElement(
                "table",
                null,
                React.createElement(
                    "thead",
                    null,
                    React.createElement(
                        "tr",
                        null,
                        React.createElement(
                            "th",
                            { width: "90" },
                            "Cycle"
                        ),
                        React.createElement(
                            "th",
                            { width: "110" },
                            "Date"
                        ),
                        React.createElement(
                            "th",
                            null,
                            " "
                        )
                    )
                ),
                React.createElement(
                    "tbody",
                    null,
                    reports.map(this.buildRow)
                )
            )
        );
    }
});

var MainForm = React.createClass({
    displayName: "MainForm",

    getInitialState: function () {
        return {
            items: [],
            startDate: moment(), //'March 1, 2016',
            stages: 1,
            days: 32
        };
    },
    handleSubmit: function (e) {
        e.preventDefault();
        var nextItems = this.state.items.concat([{
            text: Date.now(),
            id: Date.now()
        }]);
        this.setState({
            items: nextItems
        });
    },
    handleChange: function (e) {
        console.log(e.target.name, e.target.value);
        this.setState({
            [e.target.name]: e.target.value
        });
    },
    handleDateChange: function (date) {
        console.log('date change', date);
        this.setState({
            startDate: date
        });
    },
    render: function () {
        return React.createElement(
            "div",
            null,
            React.createElement(
                "form",
                { className: "form-inline", onSubmit: this.handleSubmit },
                React.createElement(
                    "div",
                    { className: "row" },
                    React.createElement(
                        "div",
                        { className: "small-5 medium-3 large-2 column" },
                        React.createElement(
                            "label",
                            null,
                            "Start Date",
                            React.createElement(DatePicker, {
                                selected: this.state.startDate,
                                onChange: this.handleDateChange
                            })
                        )
                    ),
                    React.createElement(
                        "div",
                        { className: "small-3 medium-2 large-1 column" },
                        React.createElement(
                            "label",
                            null,
                            "Cycles",
                            React.createElement("input", {
                                type: "number",
                                name: "stages",
                                className: "form-control",
                                value: this.state.stages,
                                onChange: this.handleChange
                            })
                        )
                    ),
                    React.createElement(
                        "div",
                        { className: "small-4 medium-3 large-2 column end" },
                        React.createElement(
                            "label",
                            null,
                            "Days per cycle",
                            React.createElement("input", {
                                type: "number",
                                name: "days",
                                className: "form-control",
                                onChange: this.handleChange,
                                value: this.state.days
                            })
                        )
                    )
                )
            ),
            React.createElement(Report, { data: this.state })
        );
    }
});

ReactDOM.render(React.createElement(MainForm, null), document.getElementById('main'));