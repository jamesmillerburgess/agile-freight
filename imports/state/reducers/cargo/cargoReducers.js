import { concat } from 'lodash/fp';
import { setPropAtIndex, removeAtIndex } from '../reducer-utils';
import * as ACTION_TYPES from '../../actions/actionTypes';

export const cargoType = (state = 'loose', action = { type: '' }) => {
  switch (action.type) {
    case ACTION_TYPES.SET_CARGO_TYPE:
      return action.cargoType;
    default:
      return state;
  }
};

export const ratedQuote = (state = false, action = { type: '' }) => {
  switch (action.type) {
    case ACTION_TYPES.TOGGLE_RATED_QUOTE:
      return !state;
    default:
      return state;
  }
};

const defaultPackageLinesState = [
  {
    packageType: 'Packages',
    numPackages: 1,
    length: '',
    width: '',
    height: '',
    unitVolumeUOM: 'cm',
    volume: 0,
    volumeUOM: 'cbm',
    weight: '',
    weightUOM: 'kg',
    totalWeight: 0,
  },
];

const updateBasePackageLines = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.ADD_PACKAGE_LINE:
      return concat(defaultPackageLinesState[0], state);
    case ACTION_TYPES.REMOVE_PACKAGE_LINE:
      return removeAtIndex(state, action.index);
    case ACTION_TYPES.SET_PACKAGE_LINE_PACKAGE_TYPE:
      return setPropAtIndex(state, 'packageType', action.index, action.packageType);
    case ACTION_TYPES.SET_PACKAGE_LINE_NUM_PACKAGES:
      return setPropAtIndex(state, 'numPackages', action.index, action.numPackages);
    case ACTION_TYPES.SET_PACKAGE_LINE_LENGTH:
      return setPropAtIndex(state, 'length', action.index, action.length);
    case ACTION_TYPES.SET_PACKAGE_LINE_WIDTH:
      return setPropAtIndex(state, 'width', action.index, action.width);
    case ACTION_TYPES.SET_PACKAGE_LINE_HEIGHT:
      return setPropAtIndex(state, 'height', action.index, action.height);
    case ACTION_TYPES.SET_PACKAGE_LINE_UNIT_VOLUME_UOM:
      return setPropAtIndex(state, 'unitVolumeUOM', action.index, action.unitVolumeUOM);
    case ACTION_TYPES.SET_PACKAGE_LINE_WEIGHT:
      return setPropAtIndex(state, 'weight', action.index, action.weight);
    case ACTION_TYPES.SET_PACKAGE_LINE_WEIGHT_UOM:
      return setPropAtIndex(state, 'weightUOM', action.index, action.weightUOM);
    default:
      return state;
  }
};

const packageLineTotals = state => ({
  totalWeight: (state.numPackages || 0) * (state.weight || 0),
  volume: (state.numPackages || 0) * (state.unitVolumeUOM === 'cm' ?
    ((state.length || 0) / 100) * ((state.width || 0) / 100) * ((state.height || 0) / 100) :
    ((state.length || 0) / 12) * ((state.width || 0) / 12) * ((state.height || 0) / 12)),
  volumeUOM: state.unitVolumeUOM === 'cm' ? 'cbm' : 'cft',
});

export const packageLines = (state = defaultPackageLinesState, action = { type: '' }) => {
  const newBaseState = updateBasePackageLines(state, action);
  return newBaseState.map(packageLine => ({
    ...packageLine,
    ...packageLineTotals(packageLine),
  }));
};

const addWeight = (weights) => {
  const { weightUOM } = weights[0];
  return weights.reduce((acc, val) => {
    let newWeight;
    if (val.weightUOM === 'lb' && weightUOM === 'kg') {
      newWeight = (val.weight * 0.45359237);
    } else if (val.weightUOM === 'kg' && weightUOM === 'lb') {
      newWeight = (val.weight * 2.2046226218487757);
    } else {
      newWeight = val.weight;
    }
    return acc + (newWeight || 0);
  }, 0);
};

const addVolume = (volumes) => {
  const { volumeUOM } = volumes[0];
  return volumes.reduce((acc, val) => {
    let newVolume;
    if (val.volumeUOM === 'cft' && volumeUOM === 'cbm') {
      newVolume = (val.volume * 0.028316846711706135);
    } else if (val.volumeUOM === 'cbm' && volumeUOM === 'cft') {
      newVolume = (val.volume * 35.3146665722);
    } else {
      newVolume = val.volume;
    }
    return acc + (newVolume || 0);
  }, 0);
};

export const cargoTotals = (state = { packageLines: null }) => {
  let totals = {
    totalPackages: 0,
    packageType: 'Packages',
    totalVolume: 0,
    volumeUOM: 'cbm',
    totalWeight: 0,
    weightUOM: 'kg',
  };
  if (state.packageLines && state.packageLines.length > 0) {
    const volumeUOM  = state.packageLines[0].volumeUOM;
    const weightUOM  = state.packageLines[0].weightUOM;
    totals           = state.packageLines.reduce(
      (acc, val, index, arr) => {
        let packageType = acc.packageType;
        if (val.packageType) {
          if (acc.packageType === '' || acc.packageType === val.packageType) {
            packageType = val.packageType;
          } else {
            packageType = 'Packages';
          }
        }
        if (index === arr.length - 1 && packageType === '') {
          packageType = 'Packages';
        }
        return {
          totalPackages: acc.totalPackages + (val.numPackages || 0),
          totalWeight: addWeight([
            { weight: acc.totalWeight, weightUOM },
            { weight: val.totalWeight, weightUOM: val.weightUOM },
          ]),
          totalVolume: addVolume([
            { volume: acc.totalVolume, volumeUOM },
            { volume: val.volume, volumeUOM: val.volumeUOM },
          ]),
          packageType,
        };
      },
      { totalPackages: 0, packageType: '', totalWeight: 0, totalVolume: 0 });
    totals.volumeUOM = volumeUOM;
    totals.weightUOM = weightUOM;
  }
  if (state.containerLines && state.containerLines.length > 0) {
    totals.totalContainers = state.containerLines.reduce((acc, val) => acc + val.numContainers, 0);
    totals.totalTEU        = state.containerLines.reduce((acc, val) => acc + (val.numContainers * (val.containerType === '20\'' ? 1 : 2)), 0);
  }
  return {
    ...totals,
  };
};

const defaultContainerLinesState = [{
  numContainers: 1,
  containerType: '20\'',
  temperatureControlled: false,
}];

export const containerLines = (state = defaultContainerLinesState, action = { type: '' }) => {
  switch (action.type) {
    case ACTION_TYPES.ADD_CONTAINER_LINE:
      return concat(defaultContainerLinesState[0], state);
    case ACTION_TYPES.REMOVE_CONTAINER_LINE:
      return removeAtIndex(state, action.index);
    case ACTION_TYPES.SET_CONTAINER_LINE_NUM_CONTAINERS:
      return setPropAtIndex(state, 'numContainers', action.index, action.numContainers);
    case ACTION_TYPES.SET_CONTAINER_LINE_CONTAINER_TYPE:
      return setPropAtIndex(state, 'containerType', action.index, action.containerType);
    case ACTION_TYPES.TOGGLE_CONTAINER_LINE_TEMPERATURE_CONTROLLED:
      return setPropAtIndex(state, 'temperatureControlled', action.index, !state[action.index].temperatureControlled);
    default:
      return state;
  }
};

export const densityRatio = (state = 1000, action = { type: '' }) => {
  switch (action.type) {
    case ACTION_TYPES.SET_DENSITY_RATIO:
      return action.densityRatio;
    default:
      return state;
  }
};

export const hazardous = (state = false, action = { type: '' }) => {
  switch (action.type) {
    case ACTION_TYPES.TOGGLE_HAZARDOUS:
      return !state;
    default:
      return state;
  }
};

export const temperatureControlled = (state = false, action = { type: '' }) => {
  switch (action.type) {
    case ACTION_TYPES.TOGGLE_TEMPERATURE_CONTROLLED:
      return !state;
    default:
      return state;
  }
};

const cargoDefaultState = {
  ratedQuote: false,
  cargoType: 'Loose',
  packageLines: defaultPackageLinesState,
  containerLines: defaultContainerLinesState,
  hazardous: false,
  temperatureControlled: false,
};

export const cargo = (state = {}, action = { type: '' }) => {
  let newBaseState = {};
  switch (action.type) {
    case ACTION_TYPES.LOAD_QUOTE:
      newBaseState = action.quote.cargo || cargoDefaultState;
      break;
    default:
      newBaseState = {
        cargoType: cargoType(state.cargoType, action),
        ratedQuote: ratedQuote(state.ratedQuote, action),
        packageLines: packageLines(state.packageLines, action),
        containerLines: containerLines(state.containerLines, action),
        densityRatio: densityRatio(state.densityRatio, action),
        hazardous: hazardous(state.hazardous, action),
        temperatureControlled: temperatureControlled(state.temperatureControlled, action),
      };
  }
  return {
    ...newBaseState,
    ...cargoTotals(newBaseState),
  };
};
