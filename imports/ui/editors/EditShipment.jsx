import React from 'react';
import PropTypes from 'prop-types';

import EditCargo from './EditCargo.jsx';
import Shipment from '../shipmentUtils';

const EditShipment = ({ shipment, dispatchers, history, match }) => (
  <div className="new-quote">
    <div className="process-header">
      <div className="title">NEW SHIPMENT</div>
      <div className="breadcrumbs">
        <div className="breadcrumb active customer">HEADER</div>
        <div className="breadcrumb-end active customer" />
      </div>
      <button
        className="button-primary"
        onClick={() => history.push(`/customers/view/${match.params.customerId}/overview`)}
      >
        BACK TO CUSTOMER
      </button>
    </div>
    <div className="panel container form-section">
      <div className="title">
        <div className="cargo-row-icon" />
        CARGO
      </div>
      <EditCargo
        cargo={shipment.cargo}
        dispatchers={dispatchers}
        useContainers
        splitCargoTypes={false}
        useDescription
      />
      <div className="form-button-group">
        <button className="delete-button" onClick={() => Shipment.archive(match.params.shipmentId)}>ARCHIVE</button>
        <button className="save-button" onClick={() => Shipment.save(match.params.shipmentId, shipment)}>SAVE</button>
      </div>
    </div>
  </div>
);

EditShipment.propTypes = {
  shipment: PropTypes.object.isRequired,
  dispatchers: PropTypes.objectOf(PropTypes.func).isRequired,
  history: PropTypes.object.isRequired, // eslint-disable-line
  // react/forbid-prop-types
  match: PropTypes.object.isRequired, // eslint-disable-line
                                      // react/forbid-prop-types
};

export default EditShipment;
