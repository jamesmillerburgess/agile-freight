import { cargo } from '../cargo/cargoReducers';
import { movement } from '../movement/movementReducers';

import * as ACTION_TYPES from '../../actions/actionTypes';

export const shipper = (state = '', action = { type: '' }) => {
  switch (action.type) {
    case ACTION_TYPES.SET_SHIPPER:
      return action.shipper;
    default:
      return state;
  }
};

export const consignee = (state = '', action = { type: '' }) => {
  switch (action.type) {
    case ACTION_TYPES.SET_CONSIGNEE:
      return action.consignee;
    default:
      return state;
  }
};

export const notifyParty = (state = '', action = { type: '' }) => {
  switch (action.type) {
    case ACTION_TYPES.SET_NOTIFY_PARTY:
      return action.notifyParty;
    default:
      return state;
  }
};

export const shipperAddress = (state = '', action = { type: '' }) => {
  switch (action.type) {
    case ACTION_TYPES.SET_SHIPPER_ADDRESS:
      return action.shipperAddress;
    default:
      return state;
  }
};

export const consigneeAddress = (state = '', action = { type: '' }) => {
  switch (action.type) {
    case ACTION_TYPES.SET_CONSIGNEE_ADDRESS:
      return action.consigneeAddress;
    default:
      return state;
  }
};

export const notifyPartyAddress = (state = '', action = { type: '' }) => {
  switch (action.type) {
    case ACTION_TYPES.SET_NOTIFY_PARTY_ADDRESS:
      return action.notifyPartyAddress;
    default:
      return state;
  }
};

export const customerReference = (state = '', action = { type: '' }) => {
  switch (action.type) {
    case ACTION_TYPES.SET_CUSTOMER_REFERENCE:
      return action.customerReference;
    default:
      return state;
  }
};

export const blType = (state = '', action = { type: '' }) => {
  switch (action.type) {
    case ACTION_TYPES.SET_BL_TYPE:
      return action.blType;
    default:
      return state;
  }
};

export const shipment = (state = {}, action) => ({
  cargo: cargo(state.cargo || {}, action),
  movement: movement(state.movement || {}, action),
  shipper: shipper(state.shipper, action),
  consignee: consignee(state.consignee, action),
  notifyParty: notifyParty(state.notifyParty, action),
  shipperAddress: shipperAddress(state.shipperAddress, action),
  consigneeAddress: consigneeAddress(state.consigneeAddress, action),
  notifyPartyAddress: notifyPartyAddress(state.notifyPartyAddress, action),
  customerReference: customerReference(state.customerReference, action),
  blType: blType(state.blType, action),
});
