import React from 'react';
import PropTypes from 'prop-types';
import { Route, Link } from 'react-router-dom';

import EditShipmentOperations from './EditShipmentOperations.jsx';
import EditShipmentAccounting from './EditShipmentAccounting.jsx';

const EditShipment = ({
  shipment,
  dispatchers,
  activeTab,
  toOperations,
  toAccounting,
}) =>
  <div className="new-quote">
    <div className="document-header">
      <div className="title">
        <span className="reference">
          {shipment.reference}
        </span>
        <span className="backslash"> / </span>
        <span className="page">
          {activeTab}
        </span>
      </div>
      <div className="tabs">
        <Link to={toOperations}>operations</Link>
        <span className="backslash"> / </span>
        <Link to={toAccounting}>accounting</Link>
      </div>
    </div>
    <Route
      path="/customers/view/:customerId/shipments/:shipmentId/operations"
      render={props =>
        <EditShipmentOperations
          {...props}
          shipment={shipment}
          dispatchers={dispatchers}
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
};

export default EditShipment;
