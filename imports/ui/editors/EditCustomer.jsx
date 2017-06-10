import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';

import BranchField from '../fields/BranchField.jsx';
import { Branches } from '../../api/branch/branchCollection';

const EditCustomer = props => (
  <div>
    <div className="content customer">
      <div className="process-header">
        <div className="title">
          {
            props.editMode ?
              'EDIT CUSTOMER' :
              'NEW CUSTOMER'
          }
        </div>
        <Link to="/customers">
          <button className="button-primary">BACK TO CUSTOMER LIST</button>
        </Link>
      </div>
      <div className="panel container">
        <div className="row">
          <div className="col">
            <div className="vertical-input-group">
              <span className="label">BRANCH</span>
              <BranchField
                value={props.customer.branch}
                options={Branches.find().fetch()}
                onChange={value => props.dispatchers.setCustomerBranch(value)}
              />
            </div>
            <div className="vertical-input-group">
              <span className="label">NAME</span>
              <input
                value={props.customer.name}
                onChange={e => props.dispatchers.setCustomerName(e.target.value)}
              />
            </div>
            <div className="vertical-input-group">
              <span className="label">ADDRESS</span>
              <textarea
                className="address"
                value={props.customer.address}
                onChange={e => props.dispatchers.setCustomerAddress(e.target.value)}
              />
            </div>
            <div className="vertical-input-group">
              <span className="label">EMAIL ADDRESS</span>
              <input
                value={props.customer.emailAddress}
                onChange={e => props.dispatchers.setCustomerEmailAddress(e.target.value)}
              />
            </div>
            <div className="vertical-input-group">
              <span className="label">CURRENCY</span>
              <input
                value={props.customer.currency}
                onChange={e => props.dispatchers.setCustomerCurrency(e.target.value)}
              />
            </div>
          </div>
        </div>
        <button
          className="button-submit"
          onClick={() => {
            if (props.editMode) {
              const { customerId } = props.match.params;
              Meteor.call('customer.edit', customerId, props.customer, () => {
                props.history.push(`/customers/view/${customerId}/overview`);
              });
            } else {
              Meteor.call('customer.new', props.customer, (err, res) => {
                props.history.push(`/customers/view/${res}/overview`);
              });
            }
          }}
        >
          SAVE CUSTOMER
        </button>
      </div>
    </div>
    <div className="content-footer-accent customers-footer-accent" />
  </div>
);

EditCustomer.propTypes = {
  editMode: PropTypes.bool,
  customer: PropTypes.shape({
    name: PropTypes.string,
    address: PropTypes.string,
    emailAddress: PropTypes.string,
    currency: PropTypes.string,
    branch: PropTypes.string,
  }),
  dispatchers: PropTypes.objectOf(PropTypes.func),
  history: PropTypes.object,
};

EditCustomer.defaultProps = {
  customer: {
    name: '',
    address: '',
    emailAddress: '',
    currency: '',
    branch: '',
  },
};

export default EditCustomer;
