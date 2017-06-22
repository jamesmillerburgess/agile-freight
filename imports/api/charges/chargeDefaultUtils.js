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

export const blankRate = { rate: 'Shipment', units: 1 };

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

export const getSellRate = (charge = {}, sellRates, movement) => {
  if (charge.chargeCode && sellRates && sellRates[charge.chargeCode]) {
    const chargeCodeRates = sellRates[charge.chargeCode];
    // Does the movement have the route required for the charge applicability?
    if (hasApplicableRoute(charge.route, movement)) {
      // Is there a rate for the first country in the route?
      const firstCountry = movement[charge.route[0]].slice(0, 2);
      if (chargeCodeRates.country && chargeCodeRates.country[firstCountry]) {
        return chargeCodeRates.country[firstCountry];
      }
    }

    // Does the global rate exist?
    if (sellRates[charge.chargeCode].global) {
      return sellRates[charge.chargeCode].global;
    }
  }
  return blankRate;
};
