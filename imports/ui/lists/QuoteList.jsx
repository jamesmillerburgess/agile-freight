import React from 'react';
import PropTypes from 'prop-types';

import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import moment from 'moment';

import { UIGlobals } from '../ui-globals';

const QuoteListInner = ({ quotes, history }) => {

  const openQuote = (quote) => {
    history.push(`/customer/${quote.customerId}/quotes/${quote._id}/edit`);
  };

  return (
    <div className="table-container">
      <table className="table table-hover">
        <thead>
          <tr className="list-header">
            <th />
            <th>Mode</th>
            <th>Routes</th>
            <th>Total Rates</th>
            <th>Expiry</th>
            <th>Quoted By</th>
          </tr>
        </thead>
        <tbody>
          {
            quotes.map(quote =>
              <tr
                key={quote._id}
                className={
                  moment()
                    .isAfter(quote.expiryDate) || quote.status === 'Canceled' ?
                    'inactive' :
                    ''
                }
                onClick={() => openQuote(quote)}
              >
                <th>
                  {quote.quoteCode}<br />
                  {quote.status}
                </th>
                <td>
                  {quote.mode} {quote.service}<br />
                  {quote.direction} {quote.incoterm}
                </td>
                <td>
                  {
                    quote.routes ? quote.routes.map((route, index) =>
                      <div key={index}>
                        {route.from} - {route.to}
                      </div>,
                    ) : <div />
                  }
                </td>
                <td>
                  {
                    quote.rates ? quote.rates.map((rate, index) =>
                      <div key={index}>
                        {rate.type} - {rate.rate} {rate.currency}
                      </div>,
                    ) : <div />
                  }
                </td>
                <td>
                  {moment(quote.validThrough).format(UIGlobals.dateFormat)}
                </td>
                <td>{quote.issuedBy ? Meteor.users.findOne(quote.issuedBy).profile.name : null}</td>
              </tr>,
            )
          }
        </tbody>
      </table>
    </div>
  );
};

QuoteListInner.propTypes = {
  quotes: PropTypes.array,
  history: PropTypes.object,
};

const QuoteList = createContainer((props) => {
  const { quotes } = props;
  return {
    quotes,
  };
}, QuoteListInner);

export default QuoteList;
