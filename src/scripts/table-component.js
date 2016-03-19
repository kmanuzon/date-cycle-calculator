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
