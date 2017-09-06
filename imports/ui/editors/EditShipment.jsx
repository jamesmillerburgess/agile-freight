import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { Route, Link } from 'react-router-dom';

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

export const EditShipmentOperations = ({ shipment, dispatchers, match }) =>
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

const EditShipmentAccounting = ({ shipment, dispatchers }) =>
  <div className="panel container form-section">
    <div className="invoicing-buttons">
      <div className="invoice-button-group">
        <div className="title">Sales Invoices</div>
        <button className="button-primary">
          <span className="fa fa-fw fa-check-circle" />
          Pyrotek Engineering Materials Ltd
        </button>
        <button className="button-disabled">
          <span className="fa fa-fw fa-ban" />ABC Widgets
        </button>
      </div>
      <div className="invoice-button-group">
        <div className="title">Purchase Invoices</div>
        <button className="button-primary">
          <span className="fa fa-fw fa-ellipsis-h" />
          British Airways
        </button>
        <button className="button-primary">
          <span className="fa fa-fw fa-ellipsis-h" />ABC Truckers
        </button>
      </div>
    </div>
    <div className="charges-editor">
      <div className="header-row">
        <div className="revenue-side">
          <button className="cargo-row-icon">
            <span className="fa fa-fw fa-plus-square" />
          </button>
          <div className="title charge-name">External Charges</div>
          <div className="title">Revenue</div>
        </div>
        <div className="cost-side">
          <div className="title">Cost</div>
        </div>
      </div>
      <div className="header-row">
        <div className="revenue-side">
          <button className="cargo-row-icon">
            <span className="fa fa-fw fa-minus-square" />
          </button>
          <input className="charge-name" value="International Freight" />
          <input className="charge-name" value="Pyrotek Engineering Materials Ltd" />
          <input className="" value="200" />
          <input className="currency-field" value="USD" />
        </div>
        <div className="cost-side">
          <input className="charge-name" value="British Airways" />
          <input className="" value="150" />
          <input className="currency-field" value="USD" />
        </div>
      </div>
      <div className="header-row">
        <div className="revenue-side">
          <button className="cargo-row-icon">
            <span className="fa fa-fw fa-minus-square" />
          </button>
          <input className="charge-name" value="Destination Transport" />
          <input className="charge-name" value="Pyrotek Engineering Materials Ltd" />
          <input className="" value="200" />
          <input className="currency-field" value="USD" />
        </div>
        <div className="cost-side">
          <input className="charge-name" value="ABC Truckers" />
          <input className="" value="150" />
          <input className="currency-field" value="USD" />
        </div>
      </div>
    </div>
    <div className="charges-editor">
      <div className="header-row">
        <div className="revenue-side">
          <button className="cargo-row-icon">
            <span className="fa fa-fw fa-plus-square" />
          </button>
          <div className="title charge-name">Internal Charges</div>
          <div className="title">Bill To</div>
        </div>
        <div className="cost-side">
          <div className="title">Bill From</div>
        </div>
      </div>
      <div className="header-row">
        <div className="revenue-side">
          <button className="cargo-row-icon">
            <span className="fa fa-fw fa-minus-square" />
          </button>
          <input className="charge-name" value="Destination Transport" />
          <input className="charge-name" value="Basel" />
          <input className="" value="200" />
          <input className="currency-field" value="USD" />
        </div>
        <div className="cost-side">
          <input className="charge-name" value="Miami" />
          <input className="" value="200" />
          <input className="currency-field" value="USD" />
        </div>
      </div>
    </div>
  </div>;

const EditShipment = ({ shipment, dispatchers, history, match, location }) =>
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
          to={`/customers/view/${match.params.customerId}/shipments/${match
            .params.shipmentId}/operations`}
        >
          operations
        </Link>
        <span className="backslash"> / </span>
        <Link
          to={`/customers/view/${match.params.customerId}/shipments/${match
            .params.shipmentId}/accounting`}
        >
          accounting
        </Link>
      </div>
    </div>
    <Route
      path="/customers/view/:customerId/shipments/:shipmentId/operations"
      render={props =>
        <EditShipmentOperations
          shipment={shipment}
          dispatchers={dispatchers}
          match={match}
          {...props}
        />}
    />
    <Route
      path="/customers/view/:customerId/shipments/:shipmentId/accounting"
      render={props =>
        <EditShipmentAccounting
          shipment={shipment}
          dispatchers={dispatchers}
        />}
    />
  </div>;

EditShipment.propTypes = {
  shipment: PropTypes.object.isRequired,
  dispatchers: PropTypes.objectOf(PropTypes.func).isRequired,
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};

export default EditShipment;
