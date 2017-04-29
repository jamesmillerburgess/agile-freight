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
    <div className="row sidebar-container">
      <div className="col-2 sidebar">
        <div className="sidebar-section-spacer" />
        <div className="sidebar-section-header">
          CUSTOMER
        </div>
        <NavLink
          to={`/customer/${customer._id}/overview/ytd`}
          activeClassName="active"
          isActive={(match, location) => location.pathname.indexOf(`/customer/${customer._id}/overview`) !== -1}
        >
          Overview
        </NavLink>
        <NavLink
          to={`/customer/${customer._id}/quotes`}
          activeClassName="active"
        >
          Quotes
        </NavLink>
        <NavLink
          to={`/customer/${customer._id}/shipments`}
          activeClassName="active"
        >
          Shipments
        </NavLink>
        <NavLink
          to={`/customer/${customer._id}/invoices`}
          activeClassName="active"
        >
          Invoices
        </NavLink>
        <NavLink
          to={`/customer/${customer._id}/configuration`}
          activeClassName="active"
        >
          Configuration
        </NavLink>
        <div className="sidebar-section-spacer" />
        <div className="sidebar-section-header">
          UPDATES
        </div>
        {/* <MentionFieldContainer /> */}
      </div>
      <div className="col-10 content">
        <div className="content-header">
          {customer.name}
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
  customer: PropTypes.object,
};

const Customer = createContainer((props) => {
  const customerId = props.match.params.id;
  const customer = Customers.findOne(customerId);
  return {
    customer,
  };
}, CustomerInner);


export default Customer;
