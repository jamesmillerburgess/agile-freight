import { makeActionCreator } from './action-utils';
import * as ACTION_TYPES from './actionTypes';

export const appSearch = makeActionCreator(ACTION_TYPES.APP_SEARCH, 'text');

// CARGO
export const setCargoType                             = makeActionCreator(ACTION_TYPES.SET_CARGO_TYPE, 'cargoType');
export const toggleRatedQuote                         = makeActionCreator(ACTION_TYPES.TOGGLE_RATED_QUOTE);
export const addPackageLine                           = makeActionCreator(ACTION_TYPES.ADD_PACKAGE_LINE);
export const removePackageLine                        = makeActionCreator(ACTION_TYPES.REMOVE_PACKAGE_LINE, 'index');
export const setPackageLinePackageType                = makeActionCreator(ACTION_TYPES.SET_PACKAGE_LINE_PACKAGE_TYPE, 'index', 'packageType');
export const setPackageLineNumPackages                = makeActionCreator(ACTION_TYPES.SET_PACKAGE_LINE_NUM_PACKAGES, 'index', 'numPackages');
export const setPackageLineLength                     = makeActionCreator(ACTION_TYPES.SET_PACKAGE_LINE_LENGTH, 'index', 'length');
export const setPackageLineWidth                      = makeActionCreator(ACTION_TYPES.SET_PACKAGE_LINE_WIDTH, 'index', 'width');
export const setPackageLineHeight                     = makeActionCreator(ACTION_TYPES.SET_PACKAGE_LINE_HEIGHT, 'index', 'height');
export const setPackageLineUnitVolumeUOM              = makeActionCreator(ACTION_TYPES.SET_PACKAGE_LINE_UNIT_VOLUME_UOM, 'index', 'unitVolumeUOM');
export const setPackageLineWeight                     = makeActionCreator(ACTION_TYPES.SET_PACKAGE_LINE_WEIGHT, 'index', 'weight');
export const setPackageLineWeightUOM                  = makeActionCreator(ACTION_TYPES.SET_PACKAGE_LINE_WEIGHT_UOM, 'index', 'weightUOM');
export const addContainerLine                         = makeActionCreator(ACTION_TYPES.ADD_CONTAINER_LINE);
export const removeContainerLine                      = makeActionCreator(ACTION_TYPES.REMOVE_CONTAINER_LINE, 'index');
export const setContainerLineNumContainers            = makeActionCreator(ACTION_TYPES.SET_CONTAINER_LINE_NUM_CONTAINERS, 'index', 'numContainers');
export const setContainerLineContainerType            = makeActionCreator(ACTION_TYPES.SET_CONTAINER_LINE_CONTAINER_TYPE, 'index', 'containerType');
export const toggleContainerLineTemperatureControlled = makeActionCreator(ACTION_TYPES.TOGGLE_CONTAINER_LINE_TEMPERATURE_CONTROLLED, 'index');
export const toggleHazardous                          = makeActionCreator(ACTION_TYPES.TOGGLE_HAZARDOUS);
export const toggleTemperatureControlled              = makeActionCreator(ACTION_TYPES.TOGGLE_TEMPERATURE_CONTROLLED);

// MOVEMENT
export const setPickupLocationType   = makeActionCreator(ACTION_TYPES.SET_PICKUP_LOCATION_TYPE, 'locationType');
export const setPickupCountry        = makeActionCreator(ACTION_TYPES.SET_PICKUP_COUNTRY, 'country');
export const setPickupPostalCode     = makeActionCreator(ACTION_TYPES.SET_PICKUP_POSTAL_CODE, 'postalCode');
export const setPickupPortCode       = makeActionCreator(ACTION_TYPES.SET_PICKUP_PORT_CODE, 'portCode');
export const setDeliveryLocationType = makeActionCreator(ACTION_TYPES.SET_DELIVERY_LOCATION_TYPE, 'locationType');
export const setDeliveryCountry      = makeActionCreator(ACTION_TYPES.SET_DELIVERY_COUNTRY, 'country');
export const setDeliveryPostalCode   = makeActionCreator(ACTION_TYPES.SET_DELIVERY_POSTAL_CODE, 'postalCode');
export const setDeliveryPortCode     = makeActionCreator(ACTION_TYPES.SET_DELIVERY_PORT_CODE, 'portCode');

// OTHER SERVICES
export const toggleInsurance        = makeActionCreator(ACTION_TYPES.TOGGLE_INSURANCE);
export const toggleCustomsClearance = makeActionCreator(ACTION_TYPES.TOGGLE_CUSTOMS_CLEARANCE);
