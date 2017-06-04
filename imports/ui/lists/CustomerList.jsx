import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { createContainer } from 'meteor/react-meteor-data';

import { Customers } from '../../api/customers/customers-collection';

import CustomerListItem from '../list-items/CustomerListItem.jsx';

export const CustomerListInner = (props) => {
  const { customers, history } = props;
  return (
    <div>
      <div className="content customer">
        <div className="process-header">
          <div className="title">CUSTOMER LIST</div>
          <div className="horizontal-input-group">
            <div className="label">BRANCH</div>
            <input />
          </div>
          <Link to="/customers/new">
            <button className="button-primary">NEW CUSTOMER</button>
          </Link>
        </div>
        {
          customers.map(customer =>
            <CustomerListItem key={customer._id} customer={customer} history={history} />)
        }
      </div>
      <div className="content-footer-accent customers-footer-accent" />
    </div>
  );
};

CustomerListInner.propTypes = {
  customers: PropTypes.array,
  history: PropTypes.object,
};

CustomerListInner.defaultProps = {
  customers: [],
};

const CustomerList = createContainer(() => ({
  customers: Customers.find().fetch(),
}), CustomerListInner);

export default CustomerList;
