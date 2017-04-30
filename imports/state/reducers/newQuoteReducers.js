import { combineReducers } from 'redux';

import { changeProp, changePropAtIndex, removeAtIndex, addToEnd } from './reducer-utils';

export const cargoType = (state = 'loose', action = { type: '' }) => {
  switch (action.type) {
    case 'SET_CARGO_TYPE':
      return action.cargoType;
    default:
      return state;
  }
};

export const packageLines = (state = [], action = { type: '' }) => {
  switch (action.type) {
    case 'ADD_PACKAGE_LINE':
      return addToEnd(state, {});
    case 'REMOVE_PACKAGE_LINE':
      return removeAtIndex(state, action.index);
    case 'CHANGE_PACKAGE_TYPE':
      return changePropAtIndex(state, 'packageType', action.index, action.packageType);
    case 'CHANGE_NUM_PACKAGES':
      return changePropAtIndex(state, 'numPackages', action.index, action.numPackages);
    case 'CHANGE_LENGTH':
      return changePropAtIndex(state, 'length', action.index, action.length);
    case 'CHANGE_WIDTH':
      return changePropAtIndex(state, 'width', action.index, action.width);
    case 'CHANGE_HEIGHT':
      return changePropAtIndex(state, 'height', action.index, action.height);
    case 'CHANGE_VOLUME':
      return changePropAtIndex(state, 'volume', action.index, action.volume);
    case 'CHANGE_VOLUME_UOM':
      return changePropAtIndex(state, 'volumeUOM', action.index, action.volumeUOM);
    case 'CHANGE_WEIGHT':
      return changePropAtIndex(state, 'weight', action.index, action.weight);
    case 'CHANGE_WEIGHT_UOM':
      return changePropAtIndex(state, 'weightUOM', action.index, action.weightUOM);
    default:
      return state;
  }
};

export const weightUOM = (state = 'kg', action = { type: '' }) => {
  switch (action.type) {
    case 'SET_WEIGHT_UOM':
      return action.weightUOM;
    default:
      return state;
  }
};

export const unitVolumeUOM = (state = 'cm', action = { type: '' }) => {
  switch (action.type) {
    case 'SET_UNIT_VOLUME_UOM':
      return action.unitVolumeUOM;
    default:
      return state;
  }
};

export const cargoTotals = (state = { packageLines: [] }) => {
  let totals = {
    totalPackages: 0,
    packageType: 'packages',
    totalWeight: 0,
    totalVolume: 0,
  };
  if (state.packageLines.length > 0) {
    totals = state.packageLines.reduce(
      (acc, val, index, arr) => {
        let packageType = acc.packageType;
        if (val.packageType) {
          if (acc.packageType === '' || acc.packageType === val.packageType) {
            packageType = val.packageType;
          } else {
            packageType = 'packages';
          }
        }
        if (index === arr.length - 1 && packageType === '') {
          packageType = 'packages';
        }
        return {
          totalPackages: acc.totalPackages + (val.numPackages || 0),
          totalWeight: acc.totalWeight + (val.weight || 0),
          totalVolume: acc.totalVolume + (val.volume || 0),
          packageType,
        };
      },
      { totalPackages: 0, packageType: '', totalWeight: 0, totalVolume: 0 });
  }
  return {
    ...totals,
    volumeUOM: state.unitVolumeUOM === 'in' ? 'cft' : 'cbm',
  };
};

export const cargo = (state = { cargoType: 'loose', packageLines: [] }, action = { type: '' }) => {
  const baseReducer = combineReducers({
    cargoType,
    packageLines,
    weightUOM,
    unitVolumeUOM,
  });
  const newBaseState = baseReducer(state, action);
  return {
    ...newBaseState,
    ...cargoTotals(newBaseState),
  };
};

export const movement = (state = { pickup: {}, delivery: {} }, action = { type: '' }) => {
  switch (action.type) {
    case 'SET_PICKUP_LOCATION_TYPE':
      return changeProp(state, 'pickup', changeProp(state.pickup, 'locationType', action.locationType));
    case 'SET_PICKUP_COUNTRY':
      return changeProp(state, 'pickup', changeProp(state.pickup, 'country', action.country));
    case 'SET_PICKUP_POSTAL_CODE':
      return changeProp(state, 'pickup', changeProp(state.pickup, 'postalCode', action.postalCode));
    case 'SET_PICKUP_PORT_CODE':
      return changeProp(state, 'pickup', changeProp(state.pickup, 'portCode', action.portCode));
    case 'SET_DELIVERY_LOCATION_TYPE':
      return changeProp(state, 'delivery', changeProp(state.delivery, 'locationType', action.locationType));
    case 'SET_DELIVERY_COUNTRY':
      return changeProp(state, 'delivery', changeProp(state.delivery, 'country', action.country));
    case 'SET_DELIVERY_POSTAL_CODE':
      return changeProp(state, 'delivery', changeProp(state.delivery, 'postalCode', action.postalCode));
    case 'SET_DELIVERY_PORT_CODE':
      return changeProp(state, 'delivery', changeProp(state.delivery, 'portCode', action.portCode));
    default:
      return state;
  }
};

export const otherServices = (state = { insurance: false, customsClearance: false }, action = { type: '' }) => {
  switch (action.type) {
    case 'TOGGLE_INSURANCE':
      return changeProp(state, 'insurance', !state.insurance);
    case 'TOGGLE_CUSTOMS_CLEARANCE':
      return changeProp(state, 'customsClearance', !state.customsClearance);
    default:
      return state;
  }
};

export const newQuote = combineReducers({ cargo, movement, otherServices });
