;(function() {
"use strict";

var FormComponent = React.createClass({
    propTypes: {
        value: React.PropTypes.object.isRequired,
        onChange: React.PropTypes.func.isRequired
    },
    render: function() {
        return (
            React.DOM.form({className: 'form-inline'},
                React.DOM.div({className: 'row'},
                    React.DOM.div({className: 'small-5 medium-3 large-2 column'},
                        React.DOM.label(null, 'Start Date',
                            React.createElement(DatePicker, {
                                selected: this.props.value.startDate,
                                onChange: this.handleDateOnChange,
                                popoverAttachment: 'bottom left',
                                popoverTargetAttachment: 'top left',
                                popoverTargetOffset: '10px 0px'
                            })
                        )
                    ),
                    React.DOM.div({className: 'small-3 medium-2 large-1 column'},
                        React.DOM.label(null, 'Cycles',
                            React.DOM.input({
                                className: 'form-control',
                                type: 'number',
                                name: 'cycles',
                                value: this.props.value.cycles,
                                onChange: this.handleInputFieldOnChange
                            })
                        )
                    ),
                    React.DOM.div({className: 'small-4 medium-3 large-2 column end'},
                        React.DOM.label(null, 'Days per cycle',
                            React.DOM.input({
                                className: 'form-control',
                                type: 'number',
                                name: 'days',
                                value: this.props.value.days,
                                onChange: this.handleInputFieldOnChange
                            })
                        )
                    )
                )
            )
        );
    },
    handleDateOnChange: function(date) {
        this.props.value.startDate = date;
        this.props.onChange(this.props.value);
    },
    handleInputFieldOnChange: function(e) {
        if (this.props.value.hasOwnProperty(e.target.name)) {
            this.props.value[e.target.name] = e.target.value;
            this.props.onChange(this.props.value);
        }
    },
    // @todo: remove both functions below.
    handleCyclesOnChange: function(e) {
        this.props.value.cycles = e.target.value;
        this.props.onChange(this.props.value);
    },
    handleDaysOnChange: function(e) {
        this.props.value.days = e.target.value;
        this.props.onChange(this.props.value);
    }
});

var TableRowComponent = React.createClass({
    propTypes: {
        label: React.PropTypes.string,
        date: React.PropTypes.string,
        datePretty: React.PropTypes.string
    },
    render: function() {
        return (
            React.DOM.tr(null,
                React.DOM.td(null, this.props.label),
                React.DOM.td(null, this.props.date),
                React.DOM.td(null, this.props.datePretty)
            )
        );
    }
});
var TableComponent = React.createClass({
    propTypes: {
        value: React.PropTypes.object.isRequired
    },
    render: function() {
        return (
            React.DOM.table(null,
                React.DOM.thead(null,
                    React.DOM.tr(null,
                        React.DOM.th({width: 90}, 'Cycle'),
                        React.DOM.th({width: 110}, 'Date'),
                        React.DOM.th()
                    )
                ),
                React.DOM.tbody(null,
                    this.getTableRowComponents(
                        this.parseValue(this.props.value)
                    )
                )
            )
        );
    },
    /**
     *
     * @param array
     */
    getTableRowComponents: function(rows) {
        return rows.map(function(data, index) {
            return React.createElement(TableRowComponent, {
                key: index,
                label: data.label,
                date: data.date,
                datePretty: data.datePretty
            });
        });
    },
    /**
     *
     * @param int
     */
    daysToMilliseconds: function(numOfDays) {
        // hours per day, minutes per hour, seconds per minute, millisecconds.
        return (24 * 60 * 60 * 1000) * numOfDays;
    },
    /**
     *
     * @param object
     */
    parseValue: function(value) {
        var report = [];
        var days = parseInt(value.days);
        var cycles = parseInt(value.cycles);
        var stageDate;

        if (isNaN(days) || isNaN(cycles) || days < 1 || cycles < 1) return report;

        for (var i = 0; i < cycles; i++) {
            if (i === 0) {
                // do nothing.
                stageDate = new Date(value.startDate);
            } else {
                stageDate = new Date(stageDate.getTime() + this.daysToMilliseconds(days));
            }
            report.push({
                id: Date.now() + i,
                label: (i + 1).toString(),
                //date: stageDate.toDateString()
                date: moment(stageDate.getTime()).format("YYYY-MM-DD"),
                datePretty: moment(stageDate.getTime()).format("dddd, MMMM D, YYYY")
            });
        }
        // calculate last day.
        stageDate = new Date(stageDate.getTime() + this.daysToMilliseconds(days - 1));
        report.push({
            id: Date.now() + cycles,
            label: 'Last day',
            //date: stageDate.toDateString()
            date: moment(stageDate.getTime()).format("YYYY-MM-DD"),
            datePretty: moment(stageDate.getTime()).format("dddd, MMMM D, YYYY")
        });
        return report;
    }
});

var Application = React.createClass({
    getInitialState: function() {
        return {
            startDate: moment(),
            cycles: 1,
            days: 32
        };
    },
    render: function() {
        return (
            React.DOM.div({className: 'row'},
                React.DOM.h1(null, 'Date Cycle Calculator'),
                React.createElement(FormComponent, {
                    value: this.state,
                    onChange: this.handleFormOnChange
                }),
                React.createElement(TableComponent, {
                    value: this.state
                })
            )
        );
    },
    handleFormOnChange: function(value) {
        this.setState(value);
    }
});
ReactDOM.render(
    React.createElement(Application),
    document.getElementById('application')
);
}());
