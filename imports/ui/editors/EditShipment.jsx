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
  shipmentOperationsPath,
  shipmentAccountingPath,
}) =>
  <div className="new-quote">
    <div className="document-header">
      <div className="title">
        <span className="reference">{shipment.reference}</span>
        <span className="backslash"> / </span>
        <span className="page">{activeTab}</span>
      </div>
      <div className="tabs">
        <Link to={toOperations}>operations</Link>
        <span className="backslash"> / </span>
        <Link to={toAccounting}>accounting</Link>
      </div>
    </div>
    <Route
      path={shipmentOperationsPath}
      render={() => <EditShipmentOperations {...{ shipment, dispatchers }} />}
    />
    <Route
      path={shipmentAccountingPath}
      render={() => <EditShipmentAccounting {...{ shipment, dispatchers }} />}
    />
  </div>;

EditShipment.propTypes = {
  shipment: PropTypes.object.isRequired,
  dispatchers: PropTypes.objectOf(PropTypes.func).isRequired,
};

export default EditShipment;
