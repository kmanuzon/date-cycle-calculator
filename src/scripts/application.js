var Application = React.createClass({
    propTypes: function() {
        // js dependencies.
        urijs: React.PropTypes.object.isRequired
    },
    getInitialState: function() {
        // try to incorporate url data to app.
        var params = this.props.urijs.search(true);
        return {
            startDate: moment(params['start-date']),
            cycles: parseInt(params.cycles) || 1,
            days: parseInt(params.days) || 32
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
        // update view.
        this.setState(value);

        // save current state to url.
        var params = {};
        params['start-date'] = value.startDate.format('YYYY-MM-DD');
        params.cycles = value.cycles;
        params.days = value.days;
        window.history.replaceState({}, '', this.props.urijs.search(params).toString());
    }
});
ReactDOM.render(
    React.createElement(Application, {urijs: new URI()}),
    document.getElementById('application')
);
