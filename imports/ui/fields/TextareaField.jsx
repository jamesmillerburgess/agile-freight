import React from 'react';
import PropTypes from 'prop-types';

import { autoheight } from '../formatters/autoheight';

export default class TextareaField extends React.Component {
  constructor(props) {
    super(props);
    this.handleFieldButtonClick = this.handleFieldButtonClick.bind(this);
    this.handleConfirmButtonClick = this.handleConfirmButtonClick.bind(this);
    this.handleTextareaInput = this.handleTextareaInput.bind(this);
  }

  componentDidMount() {
    autoheight(this.textareaNode);
  }

  handleFieldButtonClick() {
    $('.dropdown-textarea-input').select();
    autoheight(this.textareaNode);
  }

  handleTextareaInput() {
    autoheight(this.textareaNode);
  }

  handleConfirmButtonClick(event) {
    const value = $(event.target).parents('.dropdown-menu').find('.dropdown-textarea-input')[0].value;
    const needUpdate = this.props.value !== value;

    // Update if needed and reset the UI because it displays the value twice otherwise
    if (needUpdate) {
      this.props.valueUpdateCallback(this.props.path, value);
    }

    // Toggle the dropdown
    $(event.target).parents('.dropdown').removeClass('show');
  }

  render() {
    const { value } = this.props;
    return (
      <div className="dropdown">

        {/* Field Button */}
        <div
          className="value-container dropdown-button"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
          onClick={this.handleFieldButtonClick}
        >
          <button className="value">
            <span>{value}</span>
          </button>
        </div>

        {/* Field Menu */}
        <div
          className="dropdown-menu"
        >
          <textarea
            ref={node => this.textareaNode = node}
            className="dropdown-textarea-input"
            defaultValue={value}
            onInput={this.handleTextareaInput}
          />
          <button
            className="focis-button dropdown-textarea-confirm-button"
            onClick={this.handleConfirmButtonClick}
          >
            <i className="fa fa-fw fa-check" />
          </button>
        </div>

      </div>
    );
  }
}

TextareaField.propTypes = {
  value: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  valueUpdateCallback: PropTypes.func.isRequired,
};
