import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Customers } from '../../api/customers/customersCollection';

import CustomerListItem from '../list-items/CustomerListItem.jsx';
import BranchField from '../fields/BranchField.jsx';

import { Branches } from '../../api/branch/branchCollection';

import { compareCustomers } from '../../api/customers/customerUtils';

export const CustomerListInner = (props) => {
  const { customers, list, dispatchers, history } = props;

  const newCustomer = () => {
    dispatchers.loadCustomer({ branch: list.filter });
    history.push('/customers/new');
  };

  return (
    <div>
      <div className="content customer">
        <div className="process-header">
          <div className="title">CUSTOMER LIST</div>
          <div className="horizontal-input-group">
            <div className="label">BRANCH</div>
            <div className="field">
              <BranchField
                value={list.filter}
                options={Branches.find().fetch()}
                onChange={option => dispatchers.setListFilter(option._id)}
              />
            </div>
          </div>
          <button
            className="button-primary"
            onClick={newCustomer}
          >
            NEW CUSTOMER
          </button>
        </div>
        {
          customers
            .filter(customer => customer.branch === list.filter)
            .sort((a, b) => compareCustomers(a, b, Meteor.user()))
            .map(customer => (
              <CustomerListItem
                key={customer._id}
                customer={customer}
                history={history}
              />
            ))
        }
      </div>
      <div className="content-footer-accent customers-footer-accent" />
    </div>
  );
};

CustomerListInner.propTypes = {
  customers: PropTypes.array,
  list: PropTypes.object,
  dispatchers: PropTypes.objectOf(PropTypes.func),
  history: PropTypes.object,
};

CustomerListInner.defaultProps = {
  customers: [],
  list: {},
};

const CustomerList = createContainer(() => ({
  customers: Customers.find().fetch(),
}), CustomerListInner);

export default CustomerList;
