import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import ShipmentListItemHeader from './ShipmentListItemHeader.jsx';
import MovementChart from './MovementChart.jsx';

const ShipmentListItem = ({ quote, shipment }) =>
  <Link
    to={`/customers/view/${quote.customerId}/shipments/${shipment._id}/operations`}
    className="panel list-item"
  >
    <ShipmentListItemHeader shipment={shipment} />
    <div className="list-item-body">
      <MovementChart shipment={shipment} />
    </div>
  </Link>;

ShipmentListItem.propTypes = {
  shipment: PropTypes.shape({
    active: PropTypes.bool,
  }).isRequired,
  quote: PropTypes.object,
};

export default ShipmentListItem;
