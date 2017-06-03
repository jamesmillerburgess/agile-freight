import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

import CustomerListItem from '../list-items/CustomerListItem.jsx';
import QuoteListItem from '../list-items/QuoteListItem.jsx';

import { Customers } from '../../api/customers/customers-collection';
import { Quotes } from '../../api/quotes/quotesCollection';

import EditQuoteHeaderConnect from '../editors/EditQuoteHeaderConnect.jsx';
import EditQuoteChargesConnect from '../editors/EditQuoteChargesConnect';
import EditQuoteEmailConnect from '../editors/EditQuoteEmailConnect';
import ViewQuote from '../objects/ViewQuote.jsx';

const CustomerInner = ({ customer, quotes, loading, history }) => (
  <div className="">
    <div className="content customer">
      <CustomerListItem customer={customer} history={history} header />
      <Route
        path="/customers/:customerId/overview"
        render={
          props => (
            <div>
              {
                loading ?
                  null :
                  quotes
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
        path="/customers/:customerId/quotes/:quoteId/header"
        render={props => <EditQuoteHeaderConnect {...props} />}
      />
      <Route
        path="/customers/:customerId/quotes/:quoteId/charges"
        render={props => <EditQuoteChargesConnect {...props} />}
      />
      <Route
        path="/customers/:customerId/quotes/:quoteId/email"
        render={props => <EditQuoteEmailConnect {...props} />}
      />
      <Route
        path="/customers/:customerId/quotes/:quoteId/view"
        render={props => <ViewQuote {...props} />}
      />
    </div>
    <div className="content-footer-accent customers-footer-accent" />
  </div>
);

CustomerInner.propTypes = {
  customer: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

const Customer = createContainer((props) => {
  const customerId    = props.match.params.id;
  const customer      = Customers.findOne(customerId);
  const quotesHandler = Meteor.subscribe('quotes.list', customer.quotes);
  const loading       = !quotesHandler.ready();
  const quotes        = Quotes.find({ _id: { $in: customer.quotes } }).fetch();
  return {
    customer,
    quotes,
    loading,
  };
}, CustomerInner);


export default Customer;
