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
