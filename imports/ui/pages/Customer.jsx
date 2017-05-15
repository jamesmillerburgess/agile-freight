import React from 'react';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';
import { Route, NavLink } from 'react-router-dom';

import CustomerQuotes from './CustomerQuotes.jsx';
import CustomerConfiguration from './CustomerConfiguration.jsx';

import { Customers } from '../../api/customers/customers-collection';

const CustomerInner = ({ customer }) =>
  (
    <div className="row sidebar-container no-gutters">
      <div className="col-2 sidebar">
        <div className="sidebar-section-spacer" />
        <div className="sidebar-section-header">
          <NavLink
            to={`/customer/${customer._id}/configuration`}
            activeClassName="active"
            isActive={(match, location) => location.pathname.indexOf(`/customer/${customer._id}/configuration`) !== -1}
          >
            {customer.name} (<i className="fa fa-fw fa-pencil" />Add)
          </NavLink>
        </div>
        <NavLink
          to={`/customer/${customer._id}/quotes/active`}
          activeClassName="active"
          isActive={(match, location) => location.pathname.indexOf(`/customer/${customer._id}/quotes`) !== -1}
        >
          1. Quotes (4)
        </NavLink>
      </div>
      <div className="col-10 content">
        <div className="content-header">
          <div className="content-header-inner">
            {customer.name}
          </div>
        </div>
        <Route
          path={`/customer/${customer._id}/quotes`}
          render={props => <CustomerQuotes {...props} customer={customer} />}
        />
        <Route
          path={`/customer/${customer._id}/configuration`}
          render={props => <CustomerConfiguration {...props} customer={customer} />}
        />

      </div>
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
