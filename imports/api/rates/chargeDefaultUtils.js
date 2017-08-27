import { APIGlobals } from '../api-globals';

/**
 * Determines if a given movement object includes collection or not.
 * @param movement
 * @returns {boolean}
 */
export const hasCollection = (movement) => {
  if (movement.mode !== 'Brokerage') {
    if (movement.commercialParty === 'Seller') {
      if (movement.receipt && movement.receipt._id) {
        if (movement.termsOfSale !== 'EXW') {
          return true;
        }
      }
    }
    if (movement.commercialParty === 'Buyer') {
      if (movement.receipt && movement.receipt._id) {
        if (movement.termsOfSale === 'EXW') {
          return true;
        }
      }
    }
  }
  return false;
};

/**
 * Determines if a given movement object includes delivery or not.
 * @param movement
 * @returns {boolean}
 */
export const hasDelivery = (movement) => {
  if (movement.mode !== 'Brokerage') {
    if (movement.commercialParty === 'Seller') {
      if (movement.delivery._id) {
        if (
          [
            'DAF',
            'DAP',
            'DAT',
            'DDP',
            'DDU',
          ].indexOf(movement.termsOfSale) !== -1
        ) {
          return true;
        }
      }
    }
    if (movement.commercialParty === 'Buyer') {
      if (movement.delivery._id) {
        if (
          [
            'DAF',
            'DAP',
            'DAT',
            'DDP',
            'DDU',
          ].indexOf(movement.termsOfSale) === -1
        ) {
          return true;
        }
      }
    }
  }
  return false;
};

/**
 * Determines if a given movement object includes international freight or not.
 * @param movement
 * @returns {boolean}
 */
export const hasInternationalFreight = (movement) => {
  if (movement.mode !== 'Brokerage') {
    if (movement.commercialParty === 'Seller') {
      if (
        [
          'CFR',
          'CIF',
          'CIP',
          'CPT',
          'DAF',
          'DAP',
          'DAT',
          'DDP',
          'DDU',
        ].indexOf(movement.termsOfSale) !== -1
      ) {
        return true;
      }
    }
    if (movement.commercialParty === 'Buyer') {
      if (
        [
          'CFR',
          'CIF',
          'CIP',
          'CPT',
          'DAF',
          'DAP',
          'DAT',
          'DDP',
          'DDU',
        ].indexOf(movement.termsOfSale) === -1
      ) {
        return true;
      }
    }
  }
  return false;
};

/**
 * Gets all default charges which are determined by the movement.
 * @param movement
 * @returns {Array}
 */
export const getDefaultMovementCharges = (movement) => {
  const charges = [];
  if (hasCollection(movement)) {
    charges.push(...APIGlobals.defaultCollectionCharges);
  }
  if (hasInternationalFreight(movement)) {
    charges.push(...APIGlobals.defaultInternationalFreightCharges);
  }
  if (hasDelivery(movement)) {
    charges.push(...APIGlobals.defaultDeliveryCharges);
  }
  return charges;
};

export const getDefaultOtherServicesCharges = (otherServices) => {
  const charges = [];
  if (otherServices.exportCustomsClearance) {
    charges.push(...APIGlobals.defaultExportClearanceCharges);
  }
  if (otherServices.importCustomsClearance) {
    charges.push(...APIGlobals.defaultImportClearanceCharges);
  }
  return charges;
};

/**
 * Checks that all route components are present in the movement object.
 * @param route
 * @param movement
 * @returns {boolean}
 */
export const hasApplicableRoute = (route = [], movement = {}) => {
  let res = true;
  route.forEach((component) => {
    if (!movement[component]) {
      res = false;
    }
  });
  return res;
};

/**
 * Compiles carrier+location-level route and checks for an applicable rate.
 * @param route
 * @param carrierSellRates
 * @param movement
 * @returns {*}
 */
export const getcarrierLevelRate = (
  route = [],
  carrierSellRates = {},
  movement = {},
) => {
  const carrierRoute = movement.carrier +
                        route.reduce(
                          (acc, component) => acc + movement[component], '',
                        );
  if (carrierSellRates[carrierRoute]) {
    return carrierSellRates[carrierRoute];
  }
  return null;
};

/**
 * Compiles the location-level route and checks for an applicable rate.
 * @param route
 * @param locationSellRates
 * @param movement
 * @returns {*}
 */
export const getLocationLevelRate = (
  route = [],
  locationSellRates = {},
  movement = {},
) => {
  const locationRoute = route.reduce(
    (acc, component) => acc + movement[component], '',
  );
  if (locationSellRates[locationRoute]) {
    return locationSellRates[locationRoute];
  }
  return null;
};

/**
 * Compiles the country-level route and checks for an applicable rate.
 * @param route
 * @param countrySellRates
 * @param movement
 * @returns {*}
 */
export const getCountryLevelRate = (
  route = [],
  countrySellRates = {},
  movement = {},
) => {
  const countryRoute = route.reduce(
    (acc, component) => acc + movement[component].slice(0, 2), '',
  );
  if (countrySellRates[countryRoute]) {
    return countrySellRates[countryRoute];
  }
  return null;
};

/**
 * Given a charge, a set of sell rates, and the movement of the quote, return a
 * list of applicable sell rates, along with a suggested rate.
 * @param charge
 * @param sellRates
 * @param movement
 * @returns {*}
 */
export const getApplicableSellRates = (charge = {}, sellRates, movement) => {
  const applicableSellRates = {};
  if (charge.chargeCode && sellRates && sellRates[charge.chargeCode]) {
    const chargeCodeRates = sellRates[charge.chargeCode];
    // Does the movement have the route required for the charge applicability?
    if (hasApplicableRoute(charge.route, movement)) {
      // Is there a rate for the carrier+location-level route?
      const carrierLevelRate = getcarrierLevelRate(
        charge.route,
        chargeCodeRates.carrier,
        movement,
      );
      if (carrierLevelRate) {
        applicableSellRates.carrier = carrierLevelRate;
        if (!applicableSellRates.suggested) {
          applicableSellRates.suggested = 'carrier';
        }
      }

      // Is there a rate for the location-level route?
      const locationLevelRate = getLocationLevelRate(
        charge.route,
        chargeCodeRates.location,
        movement,
      );
      if (locationLevelRate) {
        applicableSellRates.location = locationLevelRate;
        if (!applicableSellRates.suggested) {
          applicableSellRates.suggested = 'location';
        }
      }

      // Is there a rate for the country-level route?
      const countryLevelRate = getCountryLevelRate(
        charge.route,
        chargeCodeRates.country,
        movement,
      );
      if (countryLevelRate) {
        applicableSellRates.country = countryLevelRate;
        if (!applicableSellRates.suggested) {
          applicableSellRates.suggested = 'country';
        }
      }
    }

    // Does the global rate exist?
    const globalLevelRate = sellRates[charge.chargeCode].global;
    if (globalLevelRate) {
      applicableSellRates.global = globalLevelRate;
      if (!applicableSellRates.suggested) {
        applicableSellRates.suggested = 'global';
      }
    }
  }

  return applicableSellRates;
};
