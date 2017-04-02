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
    const updateValue = $(event.target).parents('.a-container')[0].key || '';
    const display = $(event.target).parents('.a-container')[0].title || '';

    // Update the UI now
    $(event.target).parents('.dropdown').find('.value')[0].innerText = display;

    // Check if we should update the collection
    this.setState({ search: display });

    // Update if needed and reset the UI because it displays the value twice otherwise
    // if (needUpdate) {
    //   Meteor.call(this.update.method, this.update.id, this.update.path, updateValue);
    // }
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
    const { loading, job, value, currentStakeholder, stakeholders } = this.props;
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
          <button className="value {{overdueClass}}">
            <span>{currentStakeholder.name}</span>
          </button>
        </div>

        {/* Field Menu */}
        <div
          className="dropdown-menu {{dropdownMenuClasses}}"
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

                <div key={searchResult._id} className="a-container" title={searchResult.name}>
                  <a
                    className="dropdown-item row"
                    onClick={this.handleClickResult}
                  >
                    <pre
                      dangerouslySetInnerHTML={{ __html: smartHighlight(searchResult.search, search) }}></pre>
                  </a>
                </div>
              )
            )}
        </div>

      </div>
    );
  }
}


StakeholderField.propTypes = {
  value: React.PropTypes.string,
  loading: React.PropTypes.bool,
  stakeholders: React.PropTypes.array,
  currentStakeholder: React.PropTypes.object,
};

const StakeholderFieldContainer = createContainer((props) => {
  const { stakeholderId } = props;
  const branch = Meteor.subscribe('branch.active');
  const loading = !branch.ready();
  return {
    loading,
    stakeholders: Customers.find({}).fetch(),
    currentStakeholder: Customers.findOne(stakeholderId),
  };
}, StakeholderField);

export default StakeholderFieldContainer;
