import React from 'react';
import PropTypes from 'prop-types';
import { Route, Link } from 'react-router-dom';
import { createContainer } from 'meteor/react-meteor-data';

import CustomerListItem from '../list-items/CustomerListItem.jsx';
import QuoteListItem from '../list-items/QuoteListItem.jsx';


import { Customers } from '../../api/customers/customers-collection';
import NewQuoteConnect from '../editors/NewQuoteConnect.jsx';
import EditQuoteConnect from '../editors/EditQuoteConnect';
import EditQuoteEmailConnect from '../editors/EditQuoteEmailConnect';

const CustomerInner = ({ customer, history }) => {
  return (
    <div className="">
      <div className="content customer">
        <CustomerListItem customer={customer} history={history} header />
        <Route
          path="/customers/:customerId/overview"
          render={
            props => (
              <div>
                {customer.quotes.map(quoteId => (
                  <Link
                    key={quoteId}
                    className="list-item"
                    to={`/customers/${customer._id}/quotes/${quoteId}/header`}
                  >
                    <QuoteListItem {...props} quoteId={quoteId} />
                  </Link>
                ))}
              </div>
            )
          }
        />
        <Route
          path="/customers/:customerId/quotes/:quoteId/header"
          render={props => <NewQuoteConnect {...props} />}
        />
        <Route
          path="/customers/:customerId/quotes/:quoteId/charges"
          render={props => <EditQuoteConnect {...props} />}
        />
        <Route
          path="/customers/:customerId/quotes/:quoteId/email"
          render={props => <EditQuoteEmailConnect {...props} />}
        />
      </div>

      <div className="content-footer-accent customers-footer-accent" />
    </div>
  );
};

CustomerInner.propTypes = {
  customer: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

const Customer = createContainer((props) => {
  const customerId = props.match.params.id;
  const customer   = Customers.findOne(customerId);
  return {
    customer,
  };
}, CustomerInner);


export default Customer;
