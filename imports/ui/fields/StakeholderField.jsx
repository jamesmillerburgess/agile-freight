import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import { Customers } from '../../api/customers/customers';

import { smartHighlight } from '../formatters/smart-highlight';

class StakeholderField extends Component {
  constructor(props) {
    super(props);
    this.state = { search: this.props.currentStakeholder.name };
    this.updateSearch = this.updateSearch.bind(this);
    this.handleFieldButtonClick = this.handleFieldButtonClick.bind(this);
    this.handleClickResult = this.handleClickResult.bind(this);
  }

  handleFieldButtonClick() {
    $('.dropdown-filter').select();
  }

  handleClickResult(event) {
    // Prevent redirect on Internet Explorer
    // event.preventDefault();

    // Grab the correct value/id
    const updateValue = $(event.target).parents('.a-container')[0].id || '';
    const display = $(event.target).parents('.a-container')[0].title || '';

    // Update the UI now
    $(event.target).parents('.dropdown').find('.value')[0].innerText = display;
    $(event.target).parents('.dropdown').find('input')[0].value = display;

    // Check if we should update the collection
    this.setState({ search: display });

    this.props.valueUpdateCallback(this.props.path, updateValue);
  }

  updateSearch(event) {
    this.setState({ search: event.target.value });
  }

  searchResults() {
    return Customers.find(
      { search: { $regex: this.state.search, $options: 'gi' } },
      { limit: 5 },
    );
  }

  render() {
    const { loading, currentStakeholder } = this.props;
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
          <button className="value">
            <span>{currentStakeholder.name}</span>
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
            defaultValue={currentStakeholder.name}
            onChange={this.updateSearch}
          />
          {loading ?
            <b>Loading...</b> :
            this.searchResults().map(searchResult =>
              (

                <div
                  id={searchResult._id}
                  key={searchResult._id}
                  className="a-container"
                  title={searchResult.name}
                >
                  <a
                    className="dropdown-item row"
                    onClick={this.handleClickResult}
                  >
                    <pre
                      dangerouslySetInnerHTML={{
                        __html: smartHighlight(searchResult.search, search)
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


StakeholderField.propTypes = {
  path: React.PropTypes.string,
  valueUpdateCallback: React.PropTypes.func,
  loading: React.PropTypes.bool,
  currentStakeholder: React.PropTypes.object,
};

const StakeholderFieldContainer = createContainer((props) => {
  const { stakeholderId, valueUpdateCallback, path } = props;
  const branch = Meteor.subscribe('branch.active');
  const loading = !branch.ready();
  const currentStakeholder = Customers.findOne(stakeholderId);
  return {
    path,
    valueUpdateCallback,
    loading,
    currentStakeholder,
  };
}, StakeholderField);

export default StakeholderFieldContainer;
