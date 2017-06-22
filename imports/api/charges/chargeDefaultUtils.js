import { APIGlobals } from '../api-globals';

/**
 * Determines if a given movement object includes collection or not.
 * @param movement
 * @returns {boolean}
 */
export const hasCollection = (movement) => {
  if (movement.mode !== 'Brokerage') {
    if (movement.commercialParty === 'Seller') {
      if (movement.pickup.locationType === 'Door') {
        if (movement.termsOfSale !== 'EXW') {
          return true;
        }
      }
    }
    if (movement.commercialParty === 'Buyer') {
      if (movement.pickup.locationType === 'Door') {
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
      if (movement.delivery.locationType === 'Door') {
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
      if (movement.delivery.locationType === 'Door') {
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
 * Compiles supplier+location-level route and checks for an applicable rate.
 * @param route
 * @param supplierSellRates
 * @param movement
 * @returns {*}
 */
export const getSupplierLevelRate = (
  route = [],
  supplierSellRates = {},
  movement = {},
) => {
  const supplierRoute = movement.supplier +
                        route.reduce(
                          (acc, component) => acc + movement[component], '',
                        );
  if (supplierSellRates[supplierRoute]) {
    return supplierSellRates[supplierRoute];
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
      // Is there a rate for the supplier+location-level route?
      const supplierLevelRate = getSupplierLevelRate(
        charge.route,
        chargeCodeRates.supplier,
        movement,
      );
      if (supplierLevelRate) {
        applicableSellRates.supplier = supplierLevelRate;
        if (!applicableSellRates.suggested) {
          applicableSellRates.suggested = 'supplier';
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
