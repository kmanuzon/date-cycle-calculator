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
                                dateFormat: 'YYYY-MM-DD',
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
