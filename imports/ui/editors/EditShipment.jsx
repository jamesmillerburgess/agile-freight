import React from 'react';
import PropTypes from 'prop-types';
import { Route, Link } from 'react-router-dom';

import EditShipmentOperations from './EditShipmentOperations.jsx';
import EditShipmentAccounting from './EditShipmentAccounting.jsx';

const EditShipment = ({ shipment, dispatchers, match, location }) =>
  <div className="new-quote">
    <div className="document-header">
      <div className="title">
        <span className="reference">
          {shipment.reference}
        </span>
        <span className="backslash"> / </span>
        <span className="page">
          {location.pathname.indexOf('operations') !== -1
            ? 'OPERATIONS'
            : 'ACCOUNTING'}
        </span>
      </div>
      <div className="tabs">
        <Link
          to={{
            pathname: `/customers/view/${match.params
              .customerId}/shipments/${match.params.shipmentId}/operations`,
            state: { prevParams: match.params },
          }}
        >
          operations
        </Link>
        <span className="backslash"> / </span>
        <Link
          to={{
            pathname: `/customers/view/${match.params
              .customerId}/shipments/${match.params.shipmentId}/accounting`,
            state: { prevParams: match.params },
          }}
        >
          accounting
        </Link>
      </div>
    </div>
    <Route
      path="/customers/view/:customerId/shipments/:shipmentId/operations"
      render={props =>
        <EditShipmentOperations
          {...props}
          shipment={shipment}
          dispatchers={dispatchers}
          match={match}
        />}
    />
    <Route
      path="/customers/view/:customerId/shipments/:shipmentId/accounting"
      render={props =>
        <EditShipmentAccounting
          {...props}
          shipment={shipment}
          dispatchers={dispatchers}
        />}
    />
  </div>;

EditShipment.propTypes = {
  shipment: PropTypes.object.isRequired,
  dispatchers: PropTypes.objectOf(PropTypes.func).isRequired,
  match: PropTypes.object.isRequired,
};

export default EditShipment;
