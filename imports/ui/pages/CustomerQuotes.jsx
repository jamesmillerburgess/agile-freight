import React from 'react';
import PropTypes from 'prop-types';
import { Route, NavLink } from 'react-router-dom';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import moment from 'moment';

import { uniqueValues } from '../statsUtils';

import { Quotes } from '../../api/quotes/quotes-collection';
import { CustomerQuotes as customerQuotesCollection } from '../../api/customerQuotes/customerQuotesCollection';

import EditQuote from '../editors/EditQuote.jsx';
import QuoteList from '../lists/QuoteList.jsx';
import QuoteEditor from '../editors/quote/QuoteEditor.jsx';
import NewQuoteConnect from '../editors/quote/NewQuoteConnect.jsx';

const CustomerQuotesInner = ({ customer, quotes, activeQuotes, customerQuotes, history }) => {
  const newQuote = () =>
    Meteor.call(
      'quote.newDraft',
      customer._id,
      (err, result) => history.push(`/customer/${customer._id}/quotes/${result}/edit`),
    );

  return (
    <div className="customer-quotes">
      <div className="content-navbar">
        <div className="content-navbar-inner">
          <NavLink to={`/customer/${customer._id}/quotes/active`}>
            Active <span className="item-count">{activeQuotes.length}</span>
          </NavLink>
          <NavLink to={`/customer/${customer._id}/quotes/charts`}>
            <i className="fa fa-fw fa-bar-chart" /> Charts
          </NavLink>
          <button onClick={newQuote}>
            <i className="fa fa-fw fa-plus" /> New Quote
          </button>
          <NavLink to={`/customer/${customer._id}/quotes/new-quote`}>
            <i className="fa fa-fw fa-plus" /> New Quote 2
          </NavLink>
        </div>
      </div>
      <div className="content-body">
        <Route
          path={`/customer/${customer._id}/quotes/active`}
          render={props => <QuoteList {...props} quotes={activeQuotes} />}
        />
        <Route
          path={`/customer/${customer._id}/quotes/all`}
          render={props => <QuoteList {...props} quotes={quotes} />}
        />
        <Route
          path={`/customer/${customer._id}/quotes/charts`}
          render={() => <div />}
        />
        <Route
          path="/customer/:customerId/quotes/new-quote"
          render={props => <NewQuoteConnect {...props} customerQuotes={customerQuotes} />}
        />
        <Route
          path="/customer/:customerId/quotes/:quoteId/edit"
          render={props => <EditQuote {...props} customerQuotes={customerQuotes} />}
        />
      </div>
    </div>
  );
};

CustomerQuotesInner.propTypes = {
  customer: PropTypes.object.isRequired,
  quotes: PropTypes.array.isRequired,
  activeQuotes: PropTypes.array.isRequired,
  history: PropTypes.object.isRequired,
};

const CustomerQuotes = createContainer((props) => {
  const { customer }   = props;
  const customerQuotes = customerQuotesCollection
    .find({ _id: { $in: customer.customerQuotes || [] } })
    .fetch();
  const locationIds    = [
    ...uniqueValues(customerQuotes, 'rateParameters.movement.pickup.location').map(val => new Mongo.ObjectID(val)),
    ...uniqueValues(customerQuotes, 'rateParameters.movement.delivery.location').map(val => new Mongo.ObjectID(val)),
  ];
  Meteor.subscribe('unlocations.list', locationIds);
  const quotes       = Quotes
    .find({ _id: { $in: customer.quotes } })
    .fetch()
    .sort((a, b) => new Date(b.expiryDate) - new Date(a.expiryDate));
  const activeQuotes = quotes.filter(quote => !moment().isAfter(quote.expiryDate) && quote.status !== 'Canceled');
  return {
    customer,
    quotes,
    activeQuotes,
    customerQuotes,
  };
}, CustomerQuotesInner);

export default CustomerQuotes;
