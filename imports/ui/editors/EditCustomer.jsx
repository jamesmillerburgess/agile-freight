import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';

const EditCustomer = ({ customer, dispatchers, history }) => (
  <div>
    <div className="content customer">
      <div className="process-header">
        <div className="title">NEW CUSTOMER</div>
        <Link to="/customers">
          <button className="button-primary">BACK TO CUSTOMER LIST</button>
        </Link>
      </div>
      <div className="panel">
        <div className="row">
          <div className="col">
            <div className="vertical-input-group">
              <span className="label">NAME</span>
              <input
                value={customer.name}
                onChange={e => dispatchers.setCustomerName(e.target.value)}
              />
            </div>
            <div className="vertical-input-group">
              <span className="label">ADDRESS</span>
              <textarea
                className="address"
                value={customer.address}
                onChange={e => dispatchers.setCustomerAddress(e.target.value)}
              />
            </div>
            <div className="vertical-input-group">
              <span className="label">EMAIL ADDRESS</span>
              <input
                value={customer.emailAddress}
                onChange={e => dispatchers.setCustomerEmailAddress(e.target.value)}
              />
            </div>
            <div className="vertical-input-group">
              <span className="label">CURRENCY</span>
              <input
                value={customer.currency}
                onChange={e => dispatchers.setCustomerCurrency(e.target.value)}
              />
            </div>
          </div>
          <div className="col">
            <div className="vertical-input-group">
              <span className="label">BRANCH</span>
              <input
                value={customer.branch}
                onChange={e => dispatchers.setCustomerBranch(e.target.value)}
              />
            </div>
          </div>
        </div>
        <button
          className="button-submit"
          onClick={() => {
            Meteor.call('customer.new', customer, (err, res) => {
              history.push(`/customers/view/${res}/overview`);
            });
          }}
        >
          CREATE CUSTOMER
        </button>
      </div>
    </div>
    <div className="content-footer-accent customers-footer-accent" />
  </div>
);

EditCustomer.propTypes = {
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
