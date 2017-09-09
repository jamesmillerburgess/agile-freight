import React from 'react';
import Select from 'react-select';

import EditCargo from './EditCargo.jsx';
import EditMovement from './EditMovement.jsx';
import Shipment from '../shipmentUtils';

import { BillOfLading } from '../../documents/billOfLading';
import { AirWaybill } from '../../documents/airWaybill';
import { APIGlobals } from '../../api/api-globals';

export const ConfirmBookingButton = ({ match, shipment, dispatchers }) =>
  <button
    className="button-submit"
    onClick={() =>
      Shipment.confirm(match.params.shipmentId, shipment, confirmedShipment =>
        dispatchers.loadShipment(confirmedShipment),
      )}
  >
    CONFIRM BOOKING
  </button>;

export const BillOfLadingButton = ({ shipment }) =>
  <button
    className="button-submit"
    onClick={() =>
      BillOfLading(shipment, url => {
        const open = window.open(url);
        if (open === null || typeof open === 'undefined') {
          // TODO: Create themed alert
          window.alert(`This URL has been blocked by your browser:\n${url}`);
        }
      })}
  >
    BILL OF LADING
  </button>;

export const AirWaybillButton = ({ shipment }) =>
  <button
    className="button-submit"
    onClick={() =>
      AirWaybill(shipment, url => {
        const open = window.open(url);
        if (open === null || typeof open === 'undefined') {
          // TODO: Create themed javascript alert
          window.alert(`This URL has been blocked by your browser:\n${url}`);
        }
      })}
  >
    AIR WAYBILL
  </button>;

const EditShipmentOperations = ({ shipment, dispatchers, match }) =>
  <div className="panel container form-section">
    <div className="title">
      <div className="cargo-row-icon" />
      PARTIES
    </div>
    <div className="pickup-delivery-wrapper">
      <div className="cargo-row-icon" />
      <div className="field select-country">
        <div className="label">SHIPPER</div>
        <input
          value={shipment.shipper || ''}
          onChange={e => dispatchers.onChangeShipper(e.target.value)}
        />
      </div>
      <div className="field select-country">
        <div className="label">CONSIGNEE</div>
        <input
          value={shipment.consignee || ''}
          onChange={e => dispatchers.onChangeConsignee(e.target.value)}
        />
      </div>
      <div className="field select-country">
        <div className="label">NOTIFY PARTY</div>
        <input
          value={shipment.notifyParty || ''}
          onChange={e => dispatchers.onChangeNotifyParty(e.target.value)}
        />
      </div>
      <div className="field select-country">
        <div className="label">TERMS OF SALE</div>
        <Select
          value={shipment.movement.termsOfSale}
          options={APIGlobals.incotermOptions}
          onChange={selectedValue =>
            dispatchers.onChangeMovementTermsOfSale(selectedValue.value)}
          disabled={shipment.movement.mode === 'Brokerage'}
        />
      </div>
    </div>
    <div className="pickup-delivery-wrapper">
      <div className="cargo-row-icon" />
      <div className="field select-country">
        <textarea
          className="address"
          value={shipment.shipperAddress || ''}
          onChange={e => dispatchers.onChangeShipperAddress(e.target.value)}
        />
      </div>
      <div className="field select-country">
        <textarea
          className="address"
          value={shipment.consigneeAddress || ''}
          onChange={e => dispatchers.onChangeConsigneeAddress(e.target.value)}
        />
      </div>
      <div className="field select-country">
        <textarea
          className="address"
          value={shipment.notifyPartyAddress || ''}
          onChange={e => dispatchers.onChangeNotifyPartyAddress(e.target.value)}
        />
      </div>
    </div>
    <div className="pickup-delivery-wrapper">
      <div className="cargo-row-icon" />
      <div className="field select-country">
        <div className="label">CUSTOMER REFERENCE</div>
        <input
          value={shipment.customerReference || ''}
          onChange={e => dispatchers.onChangeCustomerReference(e.target.value)}
        />
      </div>
      <div className="field select-country">
        <div className="label">B/L TYPE</div>
        <Select
          value={shipment.blType || ''}
          options={[
            { value: 'Waybill', label: 'Waybill' },
            { value: 'Original', label: 'Original' },
          ]}
          onChange={opt => dispatchers.onChangeBLType(opt.value)}
        />
      </div>
    </div>
    <div className="title">
      <div className="cargo-row-icon" />
      CARGO
    </div>
    <EditCargo
      cargo={shipment.cargo}
      dispatchers={dispatchers}
      useContainers={shipment.movement.mode === 'Sea'}
      splitCargoTypes={false}
      useDescription
    />
    <div className="title">
      <div className="cargo-row-icon" />
      MOVEMENT
    </div>
    <EditMovement
      movement={shipment.movement}
      dispatchers={dispatchers}
      useDates
      useShipperConsignee
    />
    <div className="form-button-group">
      <button
        className="delete-button"
        onClick={() =>
          Shipment.archive(match.params.shipmentId, archivedShipment =>
            dispatchers.loadShipment(archivedShipment),
          )}
      >
        ARCHIVE
      </button>
      <button
        className="save-button"
        onClick={() => Shipment.save(match.params.shipmentId, shipment)}
      >
        SAVE
      </button>
      {shipment.status === 'Unconfirmed'
        ? <ConfirmBookingButton
         shipment={shipment}
         match={match}
         dispatchers={dispatchers}
       />
        : null}
      {shipment.status === 'Confirmed' && shipment.movement.mode === 'Sea'
        ? <BillOfLadingButton shipment={shipment} />
        : null}
      {shipment.status === 'Confirmed' && shipment.movement.mode === 'Air'
        ? <AirWaybillButton shipment={shipment} />
        : null}
    </div>
  </div>;

export default EditShipmentOperations;
