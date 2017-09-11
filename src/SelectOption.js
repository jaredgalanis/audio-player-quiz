import React, { Component } from 'react';
import './SelectOption.css';

class SelectOption extends Component {
  constructor(props) {
    super(props);
    this.handleSelectChange = this.handleSelectChange.bind(this);
  }

  handleSelectChange(e) {
    this.props.onSelectChange(e.target.value);
  }

  render() {
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
        <option value="0" disabled>Select song to play</option>
        {options}
      </select>
    );
  }
}

export default SelectOption;
