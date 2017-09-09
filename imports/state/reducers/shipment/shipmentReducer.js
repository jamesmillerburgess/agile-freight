import { concat, set } from 'lodash/fp';
import { cargo } from '../cargo/cargoReducers';
import { movement } from '../movement/movementReducers';
import { setPropAtId } from '../reducer-utils';

import * as ACTION_TYPES from '../../actions/actionTypes';

export const status = (state = '', action = { type: '' }) => {
  switch (action.type) {
    case ACTION_TYPES.LOAD_SHIPMENT:
      return action.status;
    default:
      return state;
  }
};

export const shipper = (state = '', action = { type: '' }) => {
  switch (action.type) {
    case ACTION_TYPES.LOAD_SHIPMENT:
      return action.shipment.shipper;
    case ACTION_TYPES.SET_SHIPPER:
      return action.shipper;
    default:
      return state;
  }
};

export const consignee = (state = '', action = { type: '' }) => {
  switch (action.type) {
    case ACTION_TYPES.LOAD_SHIPMENT:
      return action.shipment.consignee;
    case ACTION_TYPES.SET_CONSIGNEE:
      return action.consignee;
    default:
      return state;
  }
};

export const notifyParty = (state = '', action = { type: '' }) => {
  switch (action.type) {
    case ACTION_TYPES.LOAD_SHIPMENT:
      return action.shipment.notifyParty;
    case ACTION_TYPES.SET_NOTIFY_PARTY:
      return action.notifyParty;
    default:
      return state;
  }
};

export const shipperAddress = (state = '', action = { type: '' }) => {
  switch (action.type) {
    case ACTION_TYPES.LOAD_SHIPMENT:
      return action.shipment.shipperAddress;
    case ACTION_TYPES.SET_SHIPPER_ADDRESS:
      return action.shipperAddress;
    default:
      return state;
  }
};

export const consigneeAddress = (state = '', action = { type: '' }) => {
  switch (action.type) {
    case ACTION_TYPES.LOAD_SHIPMENT:
      return action.shipment.consigneeAddress;
    case ACTION_TYPES.SET_CONSIGNEE_ADDRESS:
      return action.consigneeAddress;
    default:
      return state;
  }
};

export const notifyPartyAddress = (state = '', action = { type: '' }) => {
  switch (action.type) {
    case ACTION_TYPES.LOAD_SHIPMENT:
      return action.shipment.notifyPartyAddress;
    case ACTION_TYPES.SET_NOTIFY_PARTY_ADDRESS:
      return action.notifyPartyAddress;
    default:
      return state;
  }
};

export const customerReference = (state = '', action = { type: '' }) => {
  switch (action.type) {
    case ACTION_TYPES.LOAD_SHIPMENT:
      return action.shipment.customerReference;
    case ACTION_TYPES.SET_CUSTOMER_REFERENCE:
      return action.customerReference;
    default:
      return state;
  }
};

export const blType = (state = '', action = { type: '' }) => {
  switch (action.type) {
    case ACTION_TYPES.LOAD_SHIPMENT:
      return action.shipment.blType;
    case ACTION_TYPES.SET_BL_TYPE:
      return action.blType;
    default:
      return state;
  }
};

export const charges = (state = [], action = { type: '' }) => {
  switch (action.type) {
    case ACTION_TYPES.ADD_CHARGE:
      return concat(action.charge, (state || []));
    case ACTION_TYPES.REMOVE_CHARGE:
      return state.filter(a => a.id !== action.id);
    case ACTION_TYPES.SET_CHARGE_NAME:
      return setPropAtId(state, 'name', action.id, action.name);
    case ACTION_TYPES.SET_CHARGE_CUSTOMER:
      return setPropAtId(state, 'customer', action.id, action.customer);
    case ACTION_TYPES.SET_CHARGE_REVENUE:
      return setPropAtId(state, 'revenue', action.id, action.revenue);
    case ACTION_TYPES.SET_CHARGE_REVENUE_CURRENCY:
      return setPropAtId(
        state,
        'revenueCurrency',
        action.id,
        action.revenueCurrency,
      );
    case ACTION_TYPES.SET_CHARGE_SUPPLIER:
      return setPropAtId(state, 'supplier', action.id, action.supplier);
    case ACTION_TYPES.SET_CHARGE_COST:
      return setPropAtId(state, 'cost', action.id, action.cost);
    case ACTION_TYPES.SET_CHARGE_COST_CURRENCY:
      return setPropAtId(state, 'costCurrency', action.id, action.costCurrency);
    default:
      return state;
  }
};

export const shipment = (state = {}, action = { type: '' }) => {
  switch (action.type) {
    case ACTION_TYPES.LOAD_SHIPMENT:
      return action.shipment;
    default:
      return {
        status: status(state.status, action),
        cargo: cargo(state.cargo || {}, action),
        movement: movement(state.movement || {}, action),
        shipper: shipper(state.shipper, action),
        consignee: consignee(state.consignee, action),
        notifyParty: notifyParty(state.notifyParty, action),
        shipperAddress: shipperAddress(state.shipperAddress, action),
        consigneeAddress: consigneeAddress(state.consigneeAddress, action),
        notifyPartyAddress: notifyPartyAddress(
          state.notifyPartyAddress,
          action,
        ),
        customerReference: customerReference(state.customerReference, action),
        blType: blType(state.blType, action),
        reference: state.reference || '',
        charges: charges(state.charges, action),
      };
  }
};
