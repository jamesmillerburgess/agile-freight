import React from 'react';

import Shipment from '../shipmentUtils';

const modeIcon = mode => {
  switch (mode) {
    case 'Air':
      return 'fa-plane';
    case 'Sea':
      return 'fa-ship';
    default:
      return 'fa-question';
  }
};

const MovementChart = ({ shipment }) =>
  <div className="movement-chart">
    <div className="movement-node">
      <div className="movement-node-icons">
        <span
          className={`movement-node-circle fa fa-fw fa-circle-thin ${Shipment.isReceived(
            shipment,
          )
            ? 'complete'
            : ''}`}
        />
        <span
          className={`movement-node-check fa fa-fw fa-check ${Shipment.isReceived(
            shipment,
          )
            ? 'complete'
            : ''}`}
        />
        <div
          className={`movement-node-connector-left ${Shipment.isReceived(
            shipment,
          )
            ? 'complete'
            : ''}`}
        />
        <span
          className={`movement-node-connector-icon fa fa-fw fa-truck fa-flip-horizontal ${Shipment.isReceived(
            shipment,
          )
            ? 'complete'
            : ''}`}
        />
        <div
          className={`movement-node-connector-right ${Shipment.isDeparted(
            shipment,
          )
            ? 'complete'
            : ''}`}
        />
      </div>
      <div className="movement-location">
        {Shipment.displayReceiptLocation(shipment)}
      </div>
      <div className="movement-event">
        <div className="movement-event-label">
          {Shipment.displayCargoReadyStatus(shipment)}
        </div>
        <div className="movement-event-value">
          {Shipment.displayCargoReadyDate(shipment)}
        </div>
      </div>
      <div className="movement-event">
        <div className="movement-event-label">
          {Shipment.displayReceiptStatus(shipment)}
        </div>
        <div className="movement-event-value">
          {Shipment.displayReceiptDate(shipment)}
        </div>
      </div>
    </div>
    <div className="movement-node">
      <div className="movement-node-icons">
        <span
          className={`movement-node-circle fa fa-fw fa-circle-thin ${Shipment.isDeparted(
            shipment,
          )
            ? 'complete'
            : ''}`}
        />
        <span
          className={`movement-node-check fa fa-fw fa-check ${Shipment.isDeparted(
            shipment,
          )
            ? 'complete'
            : ''}`}
        />
        <div
          className={`movement-node-connector-left ${Shipment.isDeparted(
            shipment,
          )
            ? 'complete'
            : ''}`}
        />
        <span
          className={`movement-node-connector-icon fa fa-fw ${modeIcon(
            Shipment.mode(shipment),
          )} ${Shipment.isDeparted(shipment) ? 'complete' : ''}`}
        />
        <div
          className={`movement-node-connector-right ${Shipment.isArrived(
            shipment,
          )
            ? 'complete'
            : ''}`}
        />
      </div>
      <div className="movement-location">
        {Shipment.displayDeparture(shipment)}
      </div>
      <div className="movement-event">
        <div className="movement-event-label">
          {Shipment.displayDeliveryAtPortStatus(shipment)}
        </div>
        <div className="movement-event-value">
          {Shipment.displayDeliveryAtPortDate(shipment)}
        </div>
      </div>
      <div className="movement-event">
        <div className="movement-event-label">
          {Shipment.displayDepartureStatus(shipment)}
        </div>
        <div className="movement-event-value">
          {Shipment.displayDepartureDate(shipment)}
        </div>
      </div>
    </div>
    <div className="movement-node">
      <div className="movement-node-icons">
        <span
          className={`movement-node-circle fa fa-fw fa-circle-thin ${Shipment.isArrived(
            shipment,
          )
            ? 'complete'
            : ''}`}
        />
        <span
          className={`movement-node-check fa fa-fw fa-check ${Shipment.isArrived(
            shipment,
          )
            ? 'complete'
            : ''}`}
        />
        <div
          className={`movement-node-connector-left ${Shipment.isArrived(
            shipment,
          )
            ? 'complete'
            : ''}`}
        />
        <span
          className={`movement-node-connector-icon fa fa-fw fa-truck fa-flip-horizontal ${Shipment.isArrived(
            shipment,
          )
            ? 'complete'
            : ''}`}
        />
        <div
          className={`movement-node-connector-right ${Shipment.isDelivered(
            shipment,
          )
            ? 'complete'
            : ''}`}
        />
      </div>
      <div className="movement-location">
        {Shipment.displayArrival(shipment)}
      </div>
      <div className="movement-event">
        <div className="movement-event-label">
          {Shipment.displayArrivalStatus(shipment)}
        </div>
        <div className="movement-event-value">
          {Shipment.displayArrivalDate(shipment)}
        </div>
      </div>
      <div className="movement-event">
        <div className="movement-event-label">
          {Shipment.displayPickupAtPortStatus(shipment)}
        </div>
        <div className="movement-event-value">
          {Shipment.displayPickupAtPortDate(shipment)}
        </div>
      </div>
    </div>
    <div className="movement-node">
      <div className="movement-node-icons">
        <span
          className={`movement-node-circle fa fa-fw fa-circle-thin ${Shipment.isDelivered(
            shipment,
          )
            ? 'complete'
            : ''}`}
        />
        <span
          className={`movement-node-check fa fa-fw fa-check ${Shipment.isDelivered(
            shipment,
          )
            ? 'complete'
            : ''}`}
        />
        <div className="movement-node-connector-left invis" />
        <span className="movement-node-connector-icon  fa fa-fw fa-truck fa-flip-horizontal invis" />
        <div className="movement-node-connector-right invis" />
      </div>
      <div className="movement-location">
        {Shipment.displayDelivery(shipment)}
      </div>
      <div className="movement-event">
        <div className="movement-event-label">
          {Shipment.displayDeliveryStatus(shipment)}
        </div>
        <div className="movement-event-value">
          {Shipment.displayDeliveryDate(shipment)}
        </div>
      </div>
    </div>
  </div>;

export default MovementChart;
