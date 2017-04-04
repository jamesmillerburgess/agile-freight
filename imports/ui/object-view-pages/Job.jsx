import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import { Jobs } from '../../api/jobs/jobs';
import { Customers } from '../../api/customers/customers';
import { Offices } from '../../api/offices/offices';

import { UIGlobals } from '../ui-globals';
import { APIGlobals } from '../../api/api-globals';

import ReferenceFieldContainer from '../fields/ReferenceField.jsx';
import DropdownField from '../fields/DropdownField.jsx';
import EventField from '../fields/EventField.jsx';
import MentionFieldContainer from '../fields/MentionField.jsx';
import UpdateListItem from '../list-items/UpdateListItem.jsx';

class Job extends Component {
  constructor(props) {
    super(props);
    this.updateValue = this.updateValue.bind(this);
    this.updateEvent = this.updateEvent.bind(this);
    this.addUpdate = this.addUpdate.bind(this);
  }

  updateValue(path, value) {
    if (this.props.job[path] !== value) {
      Meteor.call('jobs.updateField', this.props.job._id, path, value);
    }
  }

  updateEvent(event) {
    Meteor.call('jobs.updateEvent', this.props.job._id, event);
  }

  addUpdate(update) {
    Meteor.call('jobs.addUpdate', this.props.job._id, update);
  }

  updatesReversedAndTrimmed() {
    return _.first(this.props.job.updates.slice().reverse(), UIGlobals.listLimit);
  }

  render() {
    const { loading, job } = this.props;
    return (
      <div>
        {loading ?
          <h1>Loading...</h1> :
          <div className="job">
            {/* Job Header */}
            <div className="job-header">
              <div className="panel">
                <div className="panel-header">
                  <div className="panel-header-inner">
                    <div className="icon-container hidden-md-down">
                      <i
                        className="icon fa fa-fw fa-ship"
                      />
                    </div>
                    <div className="panel-header-content container">
                      <div className="row">
                        <div className="panel-title col-1">
                          {job.jobCode}
                        </div>
                        <div className="col-4">
                          FCL – NVOCC
                        </div>
                        <div className="col-4">
                          INNSA – GBFXT
                        </div>
                        <div className="col-3">
                          Door to CY
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="panel-body">
                  <div className="panel-body-inner">
                    <div className="row">
                      <div className="job-status col-3">
                        {job.status.toUpperCase()}
                      </div>
                      <div className="origin col-3">
                        <div className="label">
                          Shipper
                        </div>
                        <ReferenceFieldContainer
                          stakeholderId={job.shipper}
                          path="shipper"
                          collection={Customers}
                          valueUpdateCallback={this.updateValue}
                        />
                        <div className="label">
                          Export Office
                        </div>
                        <ReferenceFieldContainer
                          stakeholderId={job.exportOffice}
                          path="exportOffice"
                          collection={Offices}
                          valueUpdateCallback={this.updateValue}
                        />
                      </div>
                      <div className="destination col-3">
                        <div className="label">
                          Consignee
                        </div>
                        <ReferenceFieldContainer
                          stakeholderId={job.consignee}
                          path="consignee"
                          collection={Customers}
                          valueUpdateCallback={this.updateValue}
                        />
                        <div className="label">
                          Import Office
                        </div>
                        <ReferenceFieldContainer
                          stakeholderId={job.importOffice}
                          path="importOffice"
                          collection={Offices}
                          valueUpdateCallback={this.updateValue}
                        />
                      </div>
                      <div className="terms col-3">
                        <div className="label">
                          Incoterm
                        </div>
                        <DropdownField
                          value={job.incoterm}
                          options={APIGlobals.incotermOptions}
                          path="incoterm"
                          valueUpdateCallback={this.updateValue}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-3">
                        <div className="label">
                          Physical Receipt of Goods
                        </div>
                        <EventField
                          event={_.find(job.events, doc => doc.type === 'Physical Receipt of Goods')}
                          valueUpdateCallback={this.updateEvent}
                        />
                      </div>
                      <div className="col-3">
                        <div className="label">
                          International Departure
                        </div>
                        <EventField
                          event={_.find(job.events, doc => doc.type === 'International Departure')}
                          valueUpdateCallback={this.updateEvent}
                        />
                      </div>
                      <div className="col-3">
                        <div className="label">
                          International Arrival
                        </div>
                        <EventField
                          event={_.find(job.events, doc => doc.type === 'International Arrival')}
                          valueUpdateCallback={this.updateEvent}
                        />
                      </div>
                      <div className="col-3">
                        <div className="label">
                          Proof of Delivery
                        </div>
                        <EventField
                          event={_.find(job.events, doc => doc.type === 'Proof of Delivery')}
                          valueUpdateCallback={this.updateEvent}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Job Body */}
            <div className="job-body row">

              {/* Latest Updates */}
              <div className="latest-updates col-3">
                <div className="panel">
                  <div className="panel-header align-center">
                    Latest Updates
                  </div>
                  <div className="panel-body">
                    <div className="panel-body-inner">
                      <MentionFieldContainer
                        valueUpdateCallback={this.addUpdate}
                      />
                      {/* {{> mention updateField}} */}
                      <div className="latest-update-list">
                        {this.updatesReversedAndTrimmed()
                          .map((update, index) => <UpdateListItem key={index} update={update} />)}
                        <div className="latest-update-list-item">
                          <button
                            id="see-all-updates"
                            className="value"
                            data-toggle="modal"
                            data-target="#all-updates-modal"
                          >
                            See All Updates
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        }
      </div>
    );
  }
}

Job.propTypes = {
  loading: React.PropTypes.bool,
  job: React.PropTypes.object,
};

const JobContainer = createContainer((props) => {
  const branch = Meteor.subscribe('branch.active');
  const loading = !branch.ready();
  const jobId = props.match.params.id;
  return {
    loading,
    job: Jobs.findOne(jobId),
  };
}, Job);

export default JobContainer;
