import React from 'react';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';
import { Route } from 'react-router-dom';

import CustomerListItem from '../list-items/CustomerListItem.jsx';

import { Customers } from '../../api/customers/customers-collection';

const CustomerInner = ({ customer }) =>
  (
    <div className="">
      <div className="content customer">
        <CustomerListItem customer={customer} header />
      </div>
      {
        customer.quotes.map(quote => quote)
      }
      <div className="content-footer-accent customers-footer-accent" />
    </div>
  );

CustomerInner.propTypes = {
  customer: PropTypes.object.isRequired,
};

const Customer = createContainer((props) => {
  const customerId = props.match.params.id;
  const customer = Customers.findOne(customerId);
  return {
    customer,
  };
}, CustomerInner);


export default Customer;
