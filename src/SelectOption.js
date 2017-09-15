import React, { Component } from 'react';
import './SelectOption.css';

class SelectOption extends Component {
  constructor(props) {
    super(props);

    // lets bind our context
    // leaving this style of binding since arrow functions are best suited for non-method functions and all the handle functions are methods on the class https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions. just mentioning here so you don't think I ignored your feedback.
    this.handleSelectChange = this.handleSelectChange.bind(this);
  }

  handleSelectChange(e) {
    // lift inherited state for changes at the ancestor level
    this.props.onSelectChange(e.target.value);
  }

  render() {
    // build the options with the data passed in
    const selectedOption = this.props.selectedOption.id,
          options = this.props.optionData.map((option) => {
            return (
              <option key={option.id} value={option.id}>
                {option.attributes.title}
              </option>
            )
          });

    return (
      <select className="no-left-pad form-control" value={selectedOption} onChange={this.handleSelectChange}>
        <option value="0" disabled>Make a selection ...</option>
        {options}
      </select>
    );
  }
}

export default SelectOption;
