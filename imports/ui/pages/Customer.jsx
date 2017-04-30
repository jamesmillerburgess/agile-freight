import React from 'react';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';
import { Route, NavLink } from 'react-router-dom';

import CustomerOverview from './CustomerOverview.jsx';
import CustomerQuotes from './CustomerQuotes.jsx';
import CustomerShipments from './CustomerShipments.jsx';
import CustomerInvoices from './CustomerInvoices.jsx';
import CustomerConfiguration from './CustomerConfiguration.jsx';

import { Customers } from '../../api/customers/customers';

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
        <NavLink
          to={`/customer/${customer._id}/shipments/active`}
          activeClassName="active"
          isActive={(match, location) => location.pathname.indexOf(`/customer/${customer._id}/shipments`) !== -1}
        >
          2. Shipments (2)
        </NavLink>
        <NavLink
          to={`/customer/${customer._id}/invoices/active`}
          activeClassName="active"
          isActive={(match, location) => location.pathname.indexOf(`/customer/${customer._id}/invoices`) !== -1}
        >
          3. Invoices (1)
        </NavLink>
        <NavLink
          to={`/customer/${customer._id}/overview/ytd`}
          activeClassName="active"
          isActive={(match, location) => location.pathname.indexOf(`/customer/${customer._id}/overview`) !== -1}
        >
          Overview
        </NavLink>
      </div>
      <div className="col-10 content">
        <div className="content-header">
          <div className="content-header-inner">
            {customer.name}
          </div>
        </div>
        <Route
          path={`/customer/${customer._id}/overview/:kpiPeriod`}
          render={props => <CustomerOverview {...props} customer={customer} />}
        />
        <Route
          path={`/customer/${customer._id}/quotes`}
          render={props => <CustomerQuotes {...props} customer={customer} />}
        />
        <Route
          path={`/customer/${customer._id}/shipments`}
          render={props => <CustomerShipments {...props} customer={customer} />}
        />
        <Route
          path={`/customer/${customer._id}/invoices`}
          render={props => <CustomerInvoices {...props} customer={customer} />}
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
