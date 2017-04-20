import React from 'react';
import PropTypes from 'prop-types';

import { smartHighlight } from '../formatters/smart-highlight';

export default class DropdownField extends React.Component {
  constructor(props) {
    super(props);
    this.state = { search: '' };
    this.handleFieldButtonClick = this.handleFieldButtonClick.bind(this);
    this.handleClickResult = this.handleClickResult.bind(this);
    this.updateSearch = this.updateSearch.bind(this);
  }

  handleFieldButtonClick() {
    $('.dropdown-filter').select();
  }

  handleClickResult(event) {
    // Prevent redirect on Internet Explorer
    // event.preventDefault();

    // Grab the correct value/id
    const updateValue = $(event.target).parents('.a-container')[0].id || '';

    // Update the UI now
    // $(event.target).parents('.dropdown').find('.value')[0].innerText = updateValue;
    $(event.target).parents('.dropdown').find('input')[0].value = '';

    // Check if we should update the collection
    this.setState({ search: '' });

    this.props.valueUpdateCallback(this.props.path, updateValue);
  }

  updateSearch(event) {
    this.setState({ search: event.target.value });
  }

  searchResults() {
    return this.props.options.filter(option => (new RegExp(this.state.search, 'gi')).test(option));
  }

  render() {
    const { value, unit } = this.props;
    const { search } = this.state;
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
          <button className={`value ${this.props.alignRight ? 'align-right' : 'align-left'}`}>
            <span>{value ? `${value} ${unit || ''}` : <span>&nbsp;</span>}</span>
            <i className="fa fa-fw fa-caret-down dropdown-icon-down" />
            <i className="fa fa-fw fa-caret-up dropdown-icon-up" />
          </button>
        </div>

        {/* Field Menu */}
        <div
          className="dropdown-menu"
          aria-labelledby="dropdownMenuButton"
        >
          <input
            className="dropdown-filter"
            type="text"
            defaultValue=""
            onChange={this.updateSearch}
          />
          {this.searchResults().map(option =>
            (
              <div
                id={option}
                key={option}
                className="a-container"
              >
                <a
                  className="dropdown-item row"
                  onClick={this.handleClickResult}
                >
                    <pre
                      dangerouslySetInnerHTML={{
                        __html: smartHighlight(option, search),
                      }}
                    />
                </a>
              </div>
            ),
          )}
        </div>

      </div>
    );
  }
}

DropdownField.propTypes = {
  value: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.string),
  unit: PropTypes.string,
  path: PropTypes.string,
  valueUpdateCallback: PropTypes.func,
  alignRight: PropTypes.bool,
};

DropdownField.defaultProps = {
  value: '',
  options: [''],
  unit: null,
  path: '',
  valueUpdateCallback: () => null,
  alignRight: false,
};
