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
export const setCargoDescription = makeActionCreator(
  ACTION_TYPES.SET_CARGO_DESCRIPTION,
  'description',
);
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
export const setDensityRatio = makeActionCreator(
  ACTION_TYPES.SET_DENSITY_RATIO,
  'densityRatio',
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
export const setCarrier = makeActionCreator(
  ACTION_TYPES.SET_CARRIER,
  'carrier',
);
export const setReceipt = makeActionCreator(
  ACTION_TYPES.SET_RECEIPT,
  'receipt',
);
export const setDeparture = makeActionCreator(
  ACTION_TYPES.SET_DEPARTURE,
  'departure',
);
export const setArrival = makeActionCreator(
  ACTION_TYPES.SET_ARRIVAL,
  'arrival',
);
export const setDelivery = makeActionCreator(
  ACTION_TYPES.SET_DELIVERY,
  'delivery',
);
export const setReceiptDate = makeActionCreator(
  ACTION_TYPES.SET_RECEIPT_DATE,
  'receiptDate',
);
export const setDepartureDate = makeActionCreator(
  ACTION_TYPES.SET_DEPARTURE_DATE,
  'departureDate',
);
export const setArrivalDate = makeActionCreator(
  ACTION_TYPES.SET_ARRIVAL_DATE,
  'arrivalDate',
);
export const setDeliveryDate = makeActionCreator(
  ACTION_TYPES.SET_DELIVERY_DATE,
  'deliveryDate',
);
export const toggleReceiptStatus = makeActionCreator(
  ACTION_TYPES.TOGGLE_RECEIPT_STATUS,
);
export const toggleDepartureStatus = makeActionCreator(
  ACTION_TYPES.TOGGLE_DEPARTURE_STATUS,
);
export const toggleArrivalStatus = makeActionCreator(
  ACTION_TYPES.TOGGLE_ARRIVAL_STATUS,
);
export const toggleDeliveryStatus = makeActionCreator(
  ACTION_TYPES.TOGGLE_DELIVERY_STATUS,
);

// OTHER SERVICES
export const toggleExportCustomsClearance =
  makeActionCreator(ACTION_TYPES.TOGGLE_EXPORT_CUSTOMS_CLEARANCE);
export const toggleImportCustomsClearance =
  makeActionCreator(ACTION_TYPES.TOGGLE_IMPORT_CUSTOMS_CLEARANCE);
export const toggleInsurance = makeActionCreator(ACTION_TYPES.TOGGLE_INSURANCE);

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
export const setChargeLineSelectedRate = makeActionCreator(
  ACTION_TYPES.SET_CHARGE_LINE_SELECTED_RATE,
  'id',
  'selectedRate',
);
export const setChargeLineBasis = makeActionCreator(
  ACTION_TYPES.SET_CHARGE_LINE_BASIS,
  'id',
  'basis',
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
export const setChargeLineCurrency = makeActionCreator(
  ACTION_TYPES.SET_CHARGE_LINE_CURRENCY,
  'id',
  'currency',
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

// LOAD SHIPMENT
export const loadShipment = makeActionCreator(
  ACTION_TYPES.LOAD_SHIPMENT,
  'shipment',
);
export const setShipper = makeActionCreator(
  ACTION_TYPES.SET_SHIPPER,
  'shipper',
);
export const setConsignee = makeActionCreator(
  ACTION_TYPES.SET_CONSIGNEE,
  'consignee',
);
export const setNotifyParty = makeActionCreator(
  ACTION_TYPES.SET_NOTIFY_PARTY,
  'notifyParty',
);
export const setShipperAddress = makeActionCreator(
  ACTION_TYPES.SET_SHIPPER_ADDRESS,
  'shipperAddress',
);
export const setConsigneeAddress = makeActionCreator(
  ACTION_TYPES.SET_CONSIGNEE_ADDRESS,
  'consigneeAddress',
);
export const setNotifyPartyAddress = makeActionCreator(
  ACTION_TYPES.SET_NOTIFY_PARTY_ADDRESS,
  'notifyPartyAddress',
);
export const setPreCarriageBy = makeActionCreator(
  ACTION_TYPES.SET_PRE_CARRIAGE_BY,
  'preCarriageBy',
);
export const setVessel = makeActionCreator(ACTION_TYPES.SET_VESSEL, 'vessel');
export const setCustomerReference = makeActionCreator(
  ACTION_TYPES.SET_CUSTOMER_REFERENCE,
  'customerReference',
);
export const setBLType = makeActionCreator(ACTION_TYPES.SET_BL_TYPE, 'blType');
