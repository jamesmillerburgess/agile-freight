import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import { Jobs } from '../../api/jobs/jobs';

import StakeholderFieldContainer from '../fields/StakeholderField.jsx';

class Job extends Component {
  constructor(props) {
    super(props);
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
                      <i className="icon fa fa-fw fa-ship"/>
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
                        <StakeholderFieldContainer stakeholderId={job.shipper} />

                        {/*{{> field shipper}}*/}
                        {/*{{> field exportOffice}}*/}
                      </div>
                      <div className="destination col-3">
                        {/*{{> field consignee}}*/}
                        {/*{{> field importOffice}}*/}
                      </div>
                      <div className="terms col-3">
                        {/*{{> field incoterm}}*/}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-3">
                        {/*{{> field physicalReceiptOfGoods}}*/}
                      </div>
                      <div className="col-3">
                        {/*{{> field internationalDeparture}}*/}
                      </div>
                      <div className="col-3">
                        {/*{{> field internationalArrival}}*/}
                      </div>
                      <div className="col-3">
                        {/*{{> field proofOfDelivery}}*/}
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
