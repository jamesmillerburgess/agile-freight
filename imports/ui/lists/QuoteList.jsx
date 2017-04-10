import React from 'react';
import PropTypes from 'prop-types';

import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import moment from 'moment';

import { UIGlobals } from '../ui-globals';

class QuoteListInner extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
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
            this.props.quotes.map(quote =>
              <tr
                key={quote._id}
                className={
                  moment()
                    .isAfter(quote.expiryDate) || quote.status === 'Canceled' ?
                    'inactive' :
                    ''
                }
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
                    quote.routes.map((route, index) =>
                      <div key={index}>
                        {route}
                      </div>
                    )
                  }
                </td>
                <td>
                  {
                    quote.rates.map((rate, index) =>
                      <div key={index}>
                        {rate.type} - {rate.rate} {rate.currency}
                      </div>
                    )
                  }
                </td>
                <td>
                  {moment(quote.expiryDate).format(UIGlobals.dateFormat)}
                </td>
                <td>{Meteor.users.findOne(quote.issuedBy).profile.name}</td>
              </tr>,
            )
          }
        </tbody>
      </table>
    );
  }
}

QuoteListInner.propTypes = {
  quotes: PropTypes.array,
};

const QuoteList = createContainer((props) => {
  const { quotes } = props;
  return {
    quotes,
  };
}, QuoteListInner);

export default QuoteList;
