import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Shipment from '../shipmentUtils';
import { weightFormat } from '../formatters/numberFormatters';

const ShipmentListItem = ({ quote, shipment }) => {
  const cargo = shipment.cargo || {};
  return (
    <Link to={`/customers/view/${quote.customerId}/shipments/${shipment._id}`}>
      <div
        className={`panel shipment-list-item ${shipment.active ?
                                               '' :
                                               'inactive'}`}
      >
        <div className="icon-column">
          <span className="fa fa-fw fa-clone" />
        </div>
        <div className="container panel-body">
          <div className="row no-gutters">
            <div className="col-4">
              <span className="label">{Shipment.route(shipment)}</span><br />
              <span className="label">{Shipment.movementStatus(shipment)}</span>
            </div>
            <div className="col-4">
              <span className="label">
                {cargo.totalPackages} {cargo.totalPackages ? 'pkgs' : ''}&nbsp;
                {cargo.totalWeight ? weightFormat(cargo.totalWeight) : ''} {cargo.weightUOM}&nbsp;
                {cargo.totalVolume ? weightFormat(cargo.totalVolume) : ''} {cargo.volumeUOM}
              </span>
              <br />
            </div>
            <div className="col-4">
              <span className="label">{shipment.status}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

ShipmentListItem.propTypes = {
  shipment: PropTypes.shape({
    active: PropTypes.bool,
  }).isRequired,
  quote: PropTypes.object,
};

export default ShipmentListItem;
