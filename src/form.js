//var React = require('react');
//var DatePicker = require('react-datepicker');
//var moment = require('moment');

var Report = React.createClass({
    daysToMilliseconds: function(numOfDays) {
        // hours per day, minutes per hour, seconds per minute, millisecconds.
        return (24 * 60 * 60 * 1000) * numOfDays;
    },
    buildReport: function(data) {
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
    buildListItem: function(item) {
        return (
            <li key={item.id}>{item.label} -- {item.date}</li>
        );
    },
    buildRow: function(item) {
        console.log(item);
        return (
            <tr>
                <td>{item.label}</td>
                <td>{item.date}</td>
                <td>{item.datePretty}</td>
            </tr>
        );
    },
    render: function() {
        var reports = this.buildReport(this.props.data);
        //<ul>{reports.map(this.buildListItem)}</ul>
        return (
            <div>
            <table>
                <thead>
                    <tr>
                        <th width="90">Cycle</th>
                        <th width="110">Date</th>
                        <th>&nbsp;</th>
                    </tr>
                </thead>
                <tbody>
                    {reports.map(this.buildRow)}
                </tbody>
            </table>
            </div>
        );
    }
});

var MainForm = React.createClass({
    getInitialState: function() {
        return {
            items: [],
            startDate: moment(),//'March 1, 2016',
            stages: 1,
            days: 32
        };
    },
    handleSubmit: function(e) {
        e.preventDefault();
        var nextItems = this.state.items.concat([{
            text: Date.now(),
            id: Date.now()
        }]);
        this.setState({
            items: nextItems
        });
    },
    handleChange: function(e) {
        console.log(e.target.name, e.target.value);
        this.setState({
            [e.target.name]: e.target.value
        });
    },
    handleDateChange: function(date) {
        console.log('date change', date);
        this.setState({
            startDate: date
        });
    },
    render: function() {
        return (
            <div>
                <form className="form-inline" onSubmit={this.handleSubmit}>
                    <div className="row">
                        <div className="small-3 column">
                            <label>
                                Start Date
                                <DatePicker
                                    selected={this.state.startDate}
                                    onChange={this.handleDateChange}
                                />
                            </label>
                        </div>
                        <div className="small-2 column">
                            <label>
                                Cycles
                                <input
                                    type="number"
                                    name="stages"
                                    className="form-control"
                                    value={this.state.stages}
                                    onChange={this.handleChange}
                                />
                            </label>
                        </div>
                        <div className="small-2 column">
                            <label>
                                Days per cycle
                                <input
                                    type="number"
                                    name="days"
                                    className="form-control"
                                    onChange={this.handleChange}
                                    value={this.state.days}
                                />
                            </label>
                        </div>
                        <div className="small-5 column">
                            &nbsp;
                        </div>
                    </div>
                </form>
                <Report data={this.state} />
            </div>
        );
    }
});

ReactDOM.render(<MainForm />, document.getElementById('main'));
