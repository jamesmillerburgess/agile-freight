import React from 'react';
import PropTypes from 'prop-types';
import { Route, Link } from 'react-router-dom';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

import CustomerListItem from '../list-items/CustomerListItem.jsx';
import QuoteListItem from '../list-items/QuoteListItem.jsx';

import { Customers } from '../../api/customers/customersCollection';
import { Quotes } from '../../api/quotes/quotesCollection';

import EditShipmentConnect from '../editors/EditShipmentConnect.jsx';
import EditQuoteHeaderConnect from '../editors/EditQuoteHeaderConnect.jsx';
import EditQuoteChargesConnect from '../editors/EditQuoteChargesConnect';
import EditQuoteEmailConnect from '../editors/EditQuoteEmailConnect';
import ViewQuote from '../objects/ViewQuote.jsx';

const CustomerInner = ({ customer, loading, history }) => {
  return (
    <div className="">
      <div className="content customer">
        <div className="process-header">
          <div className="title">CUSTOMER</div>
          <Link to="/customers">
            <button className="button-primary">BACK TO CUSTOMER LIST</button>
          </Link>
        </div>
        {
          loading ?
            null :
            <CustomerListItem customer={customer} history={history} header />
        }
        <Route
          path="/customers/view/:customerId/overview"
          render={
            props => (
              <div>
                {
                  loading ?
                    null :
                    Quotes
                      .find({ _id: { $in: customer.quotes } })
                      .fetch()
                      .sort((a, b) => {
                        if (a.createdOn > b.createdOn) {
                          return -1;
                        }
                        if (a.createdOn < b.createdOn) {
                          return 1;
                        }
                        return 0;
                      })
                      .map(quote => (
                        <QuoteListItem key={quote._id} {...props} quoteId={quote._id} />
                      ))
                }
              </div>
            )
          }
        />
        <Route
          path="/customers/view/:customerId/quotes/:quoteId/header"
          render={props => <EditQuoteHeaderConnect {...props} />}
        />
        <Route
          path="/customers/view/:customerId/quotes/:quoteId/charges"
          render={props => <EditQuoteChargesConnect {...props} />}
        />
        <Route
          path="/customers/view/:customerId/quotes/:quoteId/email"
          render={props => <EditQuoteEmailConnect {...props} />}
        />
        <Route
          path="/customers/view/:customerId/quotes/:quoteId/view"
          render={props => <ViewQuote {...props} />}
        />
        <Route
          path="/customers/view/:customerId/shipments/:shipmentId"
          render={props => <EditShipmentConnect {...props} />}
        />
      </div>
      <div className="content-footer-accent customers-footer-accent" />
    </div>
  );
};

CustomerInner.propTypes = {
  customer: PropTypes.object,
  loading: PropTypes.bool,
  history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

const Customer = createContainer((props) => {
  const customerId      = props.match.params.customerId;
  const customerHandler = Meteor.subscribe(
    'customers.deepCustomer',
    customerId,
  );
  const customer        = Customers.find({ _id: customerId }).fetch()[0];
  const loading         = !customerHandler.ready();
  return {
    customer,
    loading,
  };
}, CustomerInner);


export default Customer;
