import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const ShipmentListItem = ({ quote, shipment }) => (
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
            <span className="label">GBFXT-INNSA</span><br />
            <span className="label">Departed</span>
          </div>
          <div className="col-4">
            <span className="label">17 Packages</span><br />
            <span className="label">12% Net Revenue</span>
          </div>
          <div className="col-4">
            <span className="label">CONFIRMED</span>
          </div>
        </div>
      </div>
    </div>
  </Link>
);

ShipmentListItem.propTypes = {
  shipment: PropTypes.shape({
    active: PropTypes.bool,
  }).isRequired,
};

export default ShipmentListItem;
