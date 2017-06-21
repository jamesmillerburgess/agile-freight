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
