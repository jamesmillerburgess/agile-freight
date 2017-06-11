import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { createContainer } from 'meteor/react-meteor-data';

import { Customers } from '../../api/customers/customersCollection';

import CustomerListItem from '../list-items/CustomerListItem.jsx';
import BranchField from '../fields/BranchField.jsx';

import { Branches } from '../../api/branch/branchCollection';

export const CustomerListInner = (props) => {
  const { customers, customerList, dispatchers, history } = props;

  const newCustomer = () => {
    dispatchers.loadCustomer({ branch: customerList.filter });
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
                value={customerList.filter}
                options={Branches.find().fetch()}
                onChange={option => dispatchers.setCustomerListFilter(option._id)}
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
            .filter(customer => customer.branch === customerList.filter)
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
  customerList: PropTypes.object,
  dispatchers: PropTypes.objectOf(PropTypes.func),
  history: PropTypes.object,
};

CustomerListInner.defaultProps = {
  customers: [],
};

const CustomerList = createContainer(() => ({
  customers: Customers.find().fetch(),
}), CustomerListInner);

export default CustomerList;
