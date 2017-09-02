import React from 'react';
import PropTypes from 'prop-types';
import { Route, Link } from 'react-router-dom';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

import QuoteListItem from '../list-items/QuoteListItem.jsx';

import { Customers } from '../../api/customers/customersCollection';
import { Quotes } from '../../api/quotes/quotesCollection';

import Shipment from '../shipmentUtils';

import ToggleButton from '../fields/ToggleButton.jsx';
import EditShipmentConnect from '../editors/EditShipmentConnect.jsx';
import EditQuoteHeaderConnect from '../editors/EditQuoteHeaderConnect.jsx';
import EditQuoteChargesConnect from '../editors/EditQuoteChargesConnect';
import EditQuoteEmailConnect from '../editors/EditQuoteEmailConnect';
import ViewQuote from '../objects/ViewQuote.jsx';

export const CustomerInner = ({
  customer,
  loading,
  history,
  filters,
  dispatchers,
}) => {
  const newQuote = e => {
    e.preventDefault();
    Meteor.call('quote.new', customer._id, (err, quoteId) =>
      history.push(`/customers/view/${customer._id}/quotes/${quoteId}/header`),
    );
  };

  return (
    <div className="">
      <div className="content customer">
        <div className="process-header">
          <div className="title">
            {customer.name}
            <Link to={`/customers/edit/${customer._id}`}>
              <span className="edit-icon fa fa-pencil" />
            </Link>
          </div>
          <Link to="/customers">
            <button className="button-primary">BACK TO CUSTOMER LIST</button>
          </Link>
        </div>
        <Route
          path="/customers/view/:customerId/overview"
          render={props =>
            <div>
              <div className="list-button-bar">
                <button className="button-submit" onClick={newQuote}>
                  NEW QUOTE
                </button>
                <div className="list-filters">
                  <div className="filter-group">
                    <ToggleButton
                      label="Active"
                      active={filters.showActive}
                      onClick={dispatchers.toggleActive}
                    />
                    <ToggleButton
                      label="Inactive"
                      active={filters.showInactive}
                      onClick={dispatchers.toggleInactive}
                    />
                  </div>
                  <div className="filter-group">
                    <ToggleButton
                      label="Air"
                      active={filters.showAir}
                      onClick={dispatchers.toggleAir}
                    />
                    <ToggleButton
                      label="Sea"
                      active={filters.showSea}
                      onClick={dispatchers.toggleSea}
                    />
                    <ToggleButton
                      label="Road"
                      active={filters.showRoad}
                      onClick={dispatchers.toggleRoad}
                    />
                    <ToggleButton
                      label="Brokerage"
                      active={filters.showBrokerage}
                      onClick={dispatchers.toggleBrokerage}
                    />
                  </div>
                </div>
              </div>
              {loading
                ? null
                : Quotes.find({ _id: { $in: customer.quotes } })
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
                    .filter(shipment => Shipment.filter(shipment, filters))
                    .map(quote =>
                      <QuoteListItem
                        key={quote._id}
                        {...props}
                        quoteId={quote._id}
                        filters={filters}
                      />,
                    )}
            </div>}
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
          render={props => {
            dispatchers.loadShipment(props.match.params.shipmentId);
            return <EditShipmentConnect {...props} />;
          }}
        />
      </div>
      <div className="content-footer-accent customers-footer-accent" />
    </div>
  );
};

CustomerInner.propTypes = {
  customer: PropTypes.object.isRequired,
  loading: PropTypes.bool,
  history: PropTypes.object.isRequired,
  filters: PropTypes.shape({
    showActive: PropTypes.bool,
    showInactive: PropTypes.bool,
    showAir: PropTypes.bool,
    showSea: PropTypes.bool,
    showRoad: PropTypes.bool,
    showBrokerage: PropTypes.bool,
  }),
};

CustomerInner.defaultProps = {
  loading: false,
  filters: {
    showActive: true,
    showInactive: false,
    showAir: true,
    showSea: true,
    showRoad: true,
    showBrokerage: true,
  },
};

const Customer = createContainer(props => {
  const customerId = props.match.params.customerId;
  const customer = Customers.findOne(customerId);
  return {
    customer,
    loading: false,
  };
}, CustomerInner);

export default Customer;
