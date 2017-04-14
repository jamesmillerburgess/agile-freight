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
import { Quotes } from '../../api/quotes/quotes';
import { Jobs } from '../../api/jobs/jobs';

const Customer = ({ customer }) =>
  (
    <div>
      <div>
        <div className="row">
          <div className="col-2 sidebar">
            <div className="sidebar-section-spacer" />
            <div className="sidebar-section-header">
              CUSTOMER
            </div>
            <NavLink
              to={`/customer/${customer._id}/overview`}
              activeClassName="active"
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
            {/*<MentionFieldContainer />*/}
          </div>
          <div className="col-10 content">
            <div className="content-header">
              {customer.name}
            </div>
            <Route
              path={`/customer/${customer._id}/overview`}
              render={props => <CustomerOverview {...props} customer={customer} />}
            />
            <Route
              path={`/customer/${customer._id}/quotes`}
              render={props => <CustomerQuotes {...props} customer={customer} />
              }
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
              exact
              path={`/customer/${customer._id}/configuration`}
              render={props => <CustomerConfiguration {...props} customer={customer} />}
            />

          </div>
        </div>
      </div>
    </div>
  );

Customer.propTypes = {
  customer: PropTypes.object,
  quotes: PropTypes.array,
  jobs: PropTypes.array,
};

const CustomerContainer = createContainer((props) => {
  const customerId = props.match.params.id;
  const customer = Customers.findOne(customerId);
  const quotes = Quotes.find({ 'customer.id': customerId }).fetch();
  const jobs = Jobs.find({ $or: [{ shipper: customerId }, { consignee: customerId }] }).fetch();
  return {
    customer,
    quotes,
    jobs,
  };
}, Customer);

export default CustomerContainer;
