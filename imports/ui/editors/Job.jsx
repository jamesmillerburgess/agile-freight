import { Meteor } from 'meteor/meteor';
import React from 'react';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';

import { Jobs } from '../../api/jobs/jobs';
import { Customers } from '../../api/customers/customers-collection';
import { Offices } from '../../api/offices/offices';

import { UIGlobals } from '../ui-globals';
import { APIGlobals } from '../../api/api-globals';

import ReferenceFieldContainer from '../fields/ReferenceField.jsx';
import DropdownField from '../fields/DropdownField.jsx';
import EventField from '../fields/EventField.jsx';
import MentionFieldContainer from '../fields/MentionField.jsx';
import UpdateListItem from '../list-items/UpdateListItem.jsx';
import TextareaField from '../fields/TextareaField.jsx';

class JobInner extends React.Component {
  constructor(props) {
    super(props);
    this.updateValue = this.updateValue.bind(this);
    this.updateEvent = this.updateEvent.bind(this);
    this.addUpdate = this.addUpdate.bind(this);
    this.unallocatedPackages = this.unallocatedPackages.bind(this);
    this.addUnit = this.addUnit.bind(this);
    this.addPackage = this.addPackage.bind(this);
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

  unallocatedPackages() {
    const unallocatedPackages = [];
    this.props.job.cargo.packages.map((pkg) => {
      if (!pkg.allocatedUnit) {
        unallocatedPackages.push(pkg);
      }
    });
    return unallocatedPackages;
  }

  addUnit() {
    Meteor.call('jobs.addUnit', this.props.job._id);
  }

  addPackage() {
    Meteor.call('jobs.addPackage', this.props.job._id);
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
              <div className="col-9">
                <div className="cargo panel">
                  <div className="panel-header">
                    <div className="panel-header-inner">
                      <div className="panel-header-content container">
                        <div className="row">
                          <div className="panel-title col-4 align-left">
                            Cargo
                            <i className="fa fa-exclamation-triangle" />
                            <i className="fa fa-snowflake-o" />
                            <img className="do-not-stack-icon" src="/lib/do%20not%20stack.png" />
                          </div>
                          <div className="cargo-totals col-7 row">
                            <div className="unit-total col-2">
                              {job.cargo.units.length} Units<br />
                              {job.cargo.totalPackageCount} Pkgs
                            </div>
                            <div className="gross-weight-total col-6 align-right">
                              {job.cargo.totalGrossWeight} kg
                            </div>
                            <div className="volume-total col-4 align-right">
                              {job.cargo.totalVolume} cbm
                            </div>
                          </div>
                          <div className="collapse-button col-1">
                            {/*{{> collapseButton target="#cargo-body"}}*/}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div id="cargo-body" className="panel-body show">
                    <div className="panel-body-inner">
                      <div className="cargo-shipment-level">
                        <div className="cargo-subheading">Shipment</div>
                        <div className="row">
                          <div className="col-3">
                            <div className="field">
                              <div className="label">
                                Total Package Gross Weight
                              </div>
                              <b>700.000 kg</b>
                            </div>
                          </div>
                          <div className="col-3">
                            <div className="field">
                              <div className="label">
                                Total Package Volume
                              </div>
                              <b>15.000 cbm</b>
                            </div>
                          </div>
                          <div className="col-3">
                            <div className="field">
                              <div className="label">
                                Total Package Chargeable Weight
                              </div>
                              <b>15,000 kg</b>
                            </div>
                          </div>
                          <div className="col-3">
                            {/*{{> field totalChargeableWeightOverride}}*/}
                          </div>
                        </div>
                        <div className="cargo-body-header row">
                          <div className="col-3">
                            <div className="label">
                              Marks and Numbers
                            </div>
                            <TextareaField
                              value={job.cargo.shipmentMarksAndNumbers}
                              path={'cargo.shipmentMarksAndNumbers'}
                              valueUpdateCallback={this.updateValue}
                            />
                          </div>
                          <div className="col-3">
                            <div className="label">
                              Description of Goods
                            </div>
                            <TextareaField
                              value={job.cargo.shipmentDescriptionOfGoods}
                              path={'cargo.shipmentDescriptionOfGoods'}
                              valueUpdateCallback={this.updateValue}
                            />
                          </div>
                          <div className="col-3">
                            {/*<!--TODO: Multiselect Field-->*/}
                            {/*<!--{{> field commodityType}}-->*/}
                            <div className="field">
                              <div className="label">
                                Commodity Type
                              </div>
                              <b>General Cargo</b>
                            </div>
                          </div>
                          <div className="col-3">
                            {/*{{> field volumetricRatio}}*/}
                            {/*{{> field measurementSystem}}*/}
                          </div>
                        </div>
                      </div>
                      <div className="cargo-subheading">Units and Packages</div>
                      <button
                        id="add-package"
                        className="btn focis-button"
                        onClick={this.addPackage}
                      >
                        <i className="fa fa-plus-circle" />
                        Package
                      </button>
                      <button
                        id="add-unit"
                        className="btn focis-button"
                        onClick={this.addUnit}
                      >
                        <i className="fa fa-plus-circle" />
                        Unit
                      </button>
                      <div className="cargo-content">
                        <div className="cargo-column-headers row">
                          <span className="marks-and-numbers col-3">Marks and Numbers</span>
                          <span className="col-3">Description of Goods</span>
                          <span className="packages col-1">Packages</span>
                          <span className="type col-1">Type</span>
                          <span className="gross-weight col-2">Gross Weight</span>
                          <span className="volume col-2">Volume</span>
                        </div>
                        {job.cargo.units.map((unit, index) => (
                          <div key={index}>
                            <div className="cargo-row unit-header-row row">
                              <div className="marks-and-numbers col-3">{unit.number}</div>
                              <div className="description-of-goods col-3">{unit.type}</div>
                              <div className="packages col-1" />
                              <div className="type col-1" />
                              <div className="gross-weight col-2" />
                              <div className="volume col-2" />
                            </div>
                            {/*{unit.packages.map(pkg => (*/}
                            {/*<div className="cargo-row unit-package-row row">*/}
                            {/*<div*/}
                            {/*className="marks-and-numbers col-3">{pkg.marksAndNumbers}</div>*/}
                            {/*<div*/}
                            {/*className="description-of-goods col-3">{pkg.descriptionOfGoods}</div>*/}
                            {/*<div className="packages col-1">{pkg.count}</div>*/}
                            {/*<div className="type col-1">{pkg.type}</div>*/}
                            {/*<div*/}
                            {/*className="gross-weight col-2">{pkg.grossWeight}</div>*/}
                            {/*<div className="volume col-2">{pkg.volume}</div>*/}
                            {/*</div>*/}
                            {/*))*/}
                            {/*}*/}
                            <div className="cargo-row unit-total-row row">
                              <div className="marks-and-numbers col-3"></div>
                              <div className="description-of-goods col-3">Unit Total</div>
                              <div className="packages col-1">{unit.packageCount}</div>
                              <div className="type col-1">{unit.packageType}</div>
                              <div className="gross-weight col-2">{unit.totalGrossWeight}</div>
                              <div className="volume col-2">{unit.totalVolume}</div>
                            </div>
                            <div className="cargo-row spacer-row" />
                          </div>
                        ))
                        }
                        <div className="cargo-row unallocated-header-row row">
                          <span className="col-3">Unallocated Packages</span>
                        </div>
                        {this.unallocatedPackages().map((pkg, index) => {
                          return (
                            <div key={index} className="cargo-row unallocated-package-row row">
                              <div className="marks-and-numbers col-3">{pkg.marksAndNumbers}</div>
                              <div
                                className="description-of-goods col-3">{pkg.descriptionOfGoods}</div>
                              <div className="packages col-1">{pkg.count}</div>
                              <div className="type col-1">{pkg.type}</div>
                              <div className="gross-weight col-2">{pkg.grossWeight}</div>
                              <div className="volume col-2">{pkg.volume}</div>
                            </div>
                          );
                        })
                        }
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

JobInner.propTypes = {
  loading: PropTypes.bool,
  job: PropTypes.object,
};

const Job = createContainer((props) => {
  const branch = Meteor.subscribe('branch.active');
  const loading = !branch.ready();
  const jobId = props.match.params.id;
  return {
    loading,
    job: Jobs.findOne(jobId),
  };
}, JobInner);

export default Job;
