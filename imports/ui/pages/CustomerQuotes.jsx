import React from 'react';
import PropTypes from 'prop-types';
import { Route, NavLink } from 'react-router-dom';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

import { uniqueValues } from '../statsUtils';

import { Quotes } from '../../api/quotes/quotesCollection';

import EditQuoteConnect from '../editors/EditQuoteChargesConnect';
import NewQuoteConnect from '../editors/EditQuoteHeaderConnect.jsx';

const CustomerQuotesInner = ({ customer, quotes }) => {
  return (
    <div className="customer-quotes">
      <div className="content-navbar">
        <div className="content-navbar-inner">
          <NavLink to={`/customer/view/${customer._id}/quotes/new-quote`}>
            <i className="fa fa-fw fa-plus" /> New Quote
          </NavLink>
        </div>
      </div>
      <div className="content-body">
        <Route
          path="/customer/:customerId/quotes/new-quote"
          render={props => <EditQuoteHeaderConnect {...props} quotes={quotes} />}
        />
        <Route
          path="/customer/:customerId/quotes/:quoteId/edit"
          render={props => <EditQuoteChargesConnect {...props} quotes={quotes} />}
        />
      </div>
    </div>
  );
};

CustomerQuotesInner.propTypes = {
  customer: PropTypes.object.isRequired,
  quotes: PropTypes.array.isRequired,
};

const CustomerQuotes = createContainer((props) => {
  const { customer }   = props;
  const quotes = Quotes
    .find({ _id: { $in: customer.quotes || [] } })
    .fetch();
  const locationIds    = [
    ...uniqueValues(quotes, 'movement.pickup.location').map(val => new Mongo.ObjectID(val)),
    ...uniqueValues(quotes, 'movement.delivery.location').map(val => new Mongo.ObjectID(val)),
  ];
  Meteor.subscribe('unlocations.list', locationIds);
  return {
    customer,
    quotes,
  };
}, CustomerQuotesInner);

export default CustomerQuotes;
