'use strict';

// todo: laziness...
function hacks (text) {
    return text.startsWith('_') ? text.slice(1) : chrome.i18n.getMessage(text)
}

var Checkbox = React.createClass({
    render: function() {
        return (
            <div className="checkbox">
                <label>
                    <input
                        type="checkbox"
                        name={this.props.name}
                        checked={this.props.value === 1 ? true : false}
                        onChange={this.handleChange}
                    />
                    <span className={this.props.notInSync ? "not-in-sync" : ""}>{hacks(this.props.label)}</span>
                </label>
            </div>
        );
    },
    handleChange: function(e) {
        this.props.onChange(e.target.name, e.target.checked ? 1 : 0);
    }
});

var Select = React.createClass({
    render: function() {
        return (
            <div className="select">
                <label>
                    <select
                        name={this.props.name}
                        value={this.props.notInSync ? -1 : this.props.value}
                        onChange={this.handleChange}
                    >
                        <option className="hidden" disabled selected value="-1" />
                        {
                            this.props.options.map(option => <option value={option.value}>{option.label}</option>)
                        }
                    </select>
                    <span className={this.props.notInSync ? "not-in-sync" : ""}>{hacks(this.props.label)}</span>
                </label>
            </div>
        );

    },
    handleChange: function(e) {
        this.props.onChange(e.target.name, parseInt(e.target.value));
    }
});

var Number = React.createClass({
    render: function() {
        return (
            <div className="number">
                <label>
                    <InputRange
                        name={this.props.name}
                        step={this.props.step}
                        minValue={this.props.min}
                        maxValue={this.props.max}
                        value={this.props.notInSync ? null : this.getDisplayValue()}
                        labelSuffix={this.props.suffix}
                        onChange={this.handleChange}
                    />
                    <span className={this.props.notInSync ? "not-in-sync label" : "label"}>{hacks(this.props.label)}</span>
                </label>
            </div>
        );
    },
    handleChange: function(component, value) {
        if (this.props.offset || this.props.factor) {
            value = Math.floor((value - (this.props.offset || 0)) / (this.props.factor || 1));
        }

        this.props.onChange(component.props.name, value);
    },
    getDisplayValue: function() {
        let val = this.props.value || 0
        if (this.props.offset || this.props.factor) {
            val = (this.props.factor || 1) * val + (this.props.offset || 0);
        }
        if (this.props.round != null) {
            // TODO: Number() is overridden by React for some reason :(
            //val = this.props.round === 0 ? Math.round(val) : Number(val).toPrecision(this.props.round)
            val = Math.round(val)
        }
        return val;
    }
});
