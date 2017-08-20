import React from 'react';

import Shipment from '../shipmentUtils';

const ShipmentListItemHeader = ({ shipment }) => (
  <div className="list-item-header">
    <div className={`title ${Shipment.isInactive(shipment) ? 'inactive' : ''}`}>
      {shipment.reference || ''}
    </div>
    <div className="list-item-status">
      {Shipment.displayStatus(shipment)}
    </div>
    <div className="movement-event">
      <div className="movement-event-label">Cargo</div>
      {Shipment.cargoString(shipment)}
    </div>
    <div className="movement-event">
      <div className="movement-event-label">
        {Shipment.displayDateLabel(shipment)}
      </div>
      <div className="movement-event-value">
        {Shipment.displayDate(shipment) || <span>&nbsp;</span>}
      </div>
    </div>
  </div>
);

export default ShipmentListItemHeader;
