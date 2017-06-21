import { makeActionCreator } from './actionUtils';
import * as ACTION_TYPES from './actionTypes';

export const appSearch = makeActionCreator(ACTION_TYPES.APP_SEARCH, 'text');

// CARGO
export const setCargoType = makeActionCreator(
  ACTION_TYPES.SET_CARGO_TYPE,
  'cargoType',
);
export const toggleRatedQuote = makeActionCreator(
  ACTION_TYPES.TOGGLE_RATED_QUOTE);
export const addPackageLine = makeActionCreator(
  ACTION_TYPES.ADD_PACKAGE_LINE);
export const removePackageLine = makeActionCreator(
  ACTION_TYPES.REMOVE_PACKAGE_LINE,
  'index',
);
export const setPackageLinePackageType = makeActionCreator(
  ACTION_TYPES.SET_PACKAGE_LINE_PACKAGE_TYPE,
  'index',
  'packageType',
);
export const setPackageLineNumPackages = makeActionCreator(
  ACTION_TYPES.SET_PACKAGE_LINE_NUM_PACKAGES,
  'index',
  'numPackages',
);
export const setPackageLineLength = makeActionCreator(
  ACTION_TYPES.SET_PACKAGE_LINE_LENGTH,
  'index',
  'length',
);
export const setPackageLineWidth = makeActionCreator(
  ACTION_TYPES.SET_PACKAGE_LINE_WIDTH,
  'index',
  'width',
);
export const setPackageLineHeight = makeActionCreator(
  ACTION_TYPES.SET_PACKAGE_LINE_HEIGHT,
  'index',
  'height',
);
export const setPackageLineUnitVolumeUOM = makeActionCreator(
  ACTION_TYPES.SET_PACKAGE_LINE_UNIT_VOLUME_UOM,
  'index',
  'unitVolumeUOM',
);
export const setPackageLineWeight = makeActionCreator(
  ACTION_TYPES.SET_PACKAGE_LINE_WEIGHT,
  'index',
  'weight',
);
export const setPackageLineWeightUOM = makeActionCreator(
  ACTION_TYPES.SET_PACKAGE_LINE_WEIGHT_UOM,
  'index',
  'weightUOM',
);
export const addContainerLine = makeActionCreator(
  ACTION_TYPES.ADD_CONTAINER_LINE);
export const removeContainerLine = makeActionCreator(
  ACTION_TYPES.REMOVE_CONTAINER_LINE,
  'index',
);
export const setContainerLineNumContainers = makeActionCreator(
  ACTION_TYPES.SET_CONTAINER_LINE_NUM_CONTAINERS,
  'index',
  'numContainers',
);
export const setContainerLineContainerType = makeActionCreator(
  ACTION_TYPES.SET_CONTAINER_LINE_CONTAINER_TYPE,
  'index',
  'containerType',
);
export const toggleContainerLineTemperatureControlled = makeActionCreator(
  ACTION_TYPES.TOGGLE_CONTAINER_LINE_TEMPERATURE_CONTROLLED,
  'index',
);
export const toggleHazardous = makeActionCreator(
  ACTION_TYPES.TOGGLE_HAZARDOUS);
export const toggleTemperatureControlled = makeActionCreator(
  ACTION_TYPES.TOGGLE_TEMPERATURE_CONTROLLED);

// MOVEMENT
export const setMovementMode = makeActionCreator(
  ACTION_TYPES.SET_MOVEMENT_MODE,
  'mode',
);
export const setMovementCommercialParty = makeActionCreator(
  ACTION_TYPES.SET_MOVEMENT_COMMERCIAL_PARTY,
  'commercialParty',
);
export const setMovementTermsOfSale = makeActionCreator(
  ACTION_TYPES.SET_MOVEMENT_TERMS_OF_SALE,
  'termsOfSale',
);
export const setPickupLocationType = makeActionCreator(
  ACTION_TYPES.SET_PICKUP_LOCATION_TYPE,
  'locationType',
);
export const setPickupLocationName = makeActionCreator(
  ACTION_TYPES.SET_PICKUP_LOCATION_NAME,
  'locationName',
);
export const setPickupCountry = makeActionCreator(
  ACTION_TYPES.SET_PICKUP_COUNTRY,
  'country',
);
export const setPickupLocation = makeActionCreator(
  ACTION_TYPES.SET_PICKUP_LOCATION,
  'location',
);
export const setDeliveryLocationType = makeActionCreator(
  ACTION_TYPES.SET_DELIVERY_LOCATION_TYPE,
  'locationType',
);
export const setDeliveryLocationName = makeActionCreator(
  ACTION_TYPES.SET_DELIVERY_LOCATION_NAME,
  'locationName',
);
export const setDeliveryCountry = makeActionCreator(
  ACTION_TYPES.SET_DELIVERY_COUNTRY,
  'country',
);
export const setDeliveryLocation = makeActionCreator(
  ACTION_TYPES.SET_DELIVERY_LOCATION,
  'location',
);

// OTHER SERVICES
export const toggleInsurance = makeActionCreator(ACTION_TYPES.TOGGLE_INSURANCE);
export const toggleCustomsClearance = makeActionCreator(ACTION_TYPES.TOGGLE_CUSTOMS_CLEARANCE);

// CHARGES
export const addChargeLine = makeActionCreator(
  ACTION_TYPES.ADD_CHARGE_LINE,
  'chargeLine',
);
export const removeChargeLine = makeActionCreator(
  ACTION_TYPES.REMOVE_CHARGE_LINE,
  'id',
);
export const setChargeLineCode = makeActionCreator(
  ACTION_TYPES.SET_CHARGE_LINE_CODE,
  'id',
  'code',
);
export const setChargeLineName = makeActionCreator(
  ACTION_TYPES.SET_CHARGE_LINE_NAME,
  'id',
  'name',
);
export const setChargeLineRate = makeActionCreator(
  ACTION_TYPES.SET_CHARGE_LINE_RATE,
  'id',
  'rate',
);
export const setChargeLineUnits = makeActionCreator(
  ACTION_TYPES.SET_CHARGE_LINE_UNITS,
  'id',
  'units',
);
export const setChargeLineUnitPrice = makeActionCreator(
  ACTION_TYPES.SET_CHARGE_LINE_UNIT_PRICE,
  'id',
  'unitPrice',
);
export const setChargeLineUnitPriceCurrency = makeActionCreator(
  ACTION_TYPES.SET_CHARGE_LINE_UNIT_PRICE_CURRENCY,
  'id',
  'unitPriceCurrency',
);
export const setChargeNotes = makeActionCreator(
  ACTION_TYPES.SET_CHARGE_NOTES,
  'notes',
);
export const setFXConversionRate = makeActionCreator(
  ACTION_TYPES.SET_FX_CONVERSION_RATE,
  'currency',
  'rate',
);
export const setQuoteCurrency = makeActionCreator(
  ACTION_TYPES.SET_QUOTE_CURRENCY,
  'currency',
);

// LOAD QUOTE
export const loadQuote = makeActionCreator(ACTION_TYPES.LOAD_QUOTE, 'quote');
