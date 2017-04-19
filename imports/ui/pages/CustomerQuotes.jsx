import React from 'react';
import PropTypes from 'prop-types';
import { Route, NavLink, Redirect } from 'react-router-dom';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import moment from 'moment';

import { Quotes } from '../../api/quotes/quotes-collection';

import QuoteList from '../lists/QuoteList.jsx';
import QuoteEditor from '../editors/quote/QuoteEditor.jsx';

const CustomerQuotesInner = ({ customer, quotes, activeQuotes, history }) => {
  const newQuote = () =>
    Meteor.call(
      'quote.newDraft',
      customer._id,
      (err, result) => history.push(`/customer/${customer._id}/quotes/${result}/edit`),
    );

  return (
    <div className="customer-quotes">
      <div className="content-navbar">
        <NavLink to={`/customer/${customer._id}/quotes/active`}>
          Active <span className="item-count">{activeQuotes.length}</span>
        </NavLink>
        <NavLink to={`/customer/${customer._id}/quotes/all`}>
          All <span className="item-count">{quotes.length}</span>
        </NavLink>
        <NavLink to={`/customer/${customer._id}/quotes/charts`}>
          <i className="fa fa-fw fa-bar-chart" /> Charts
        </NavLink>
        <button
          onClick={newQuote}>
          <i className="fa fa-fw fa-plus" /> Quote
        </button>
      </div>
      <div className="content-body">
        <Route path={`/customer/${customer._id}/quotes`} exact>
          <Redirect to={`/customer/${customer._id}/quotes/active`} />
        </Route>
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
          path={`/customer/${customer._id}/quotes/:quoteId/edit`}
          render={props => <QuoteEditor {...props} />}
        />
      </div>
    </div>
  );
};

CustomerQuotesInner.propTypes = {
  customer: PropTypes.object.isRequired,
  quotes: PropTypes.array.isRequired,
  activeQuotes: PropTypes.array.isRequired,
};

const CustomerQuotes = createContainer((props) => {
  const { customer } = props;
  const quotes = Quotes
    .find({ _id: { $in: customer.quotes } })
    .fetch()
    .sort((a, b) => new Date(b.expiryDate) - new Date(a.expiryDate));
  const activeQuotes = quotes.filter(quote => !moment().isAfter(quote.expiryDate) && quote.status !== 'Canceled');
  return {
    customer,
    quotes,
    activeQuotes,
  };
}, CustomerQuotesInner);

export default CustomerQuotes;
