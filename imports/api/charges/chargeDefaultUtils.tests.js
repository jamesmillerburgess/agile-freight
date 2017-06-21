/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

import { chai } from 'meteor/practicalmeteor:chai';
import { Meteor } from 'meteor/meteor';

import * as chargeDefaultUtils from './chargeDefaultUtils';

chai.should();

if (Meteor.isClient) {
  describe('Charge Default Utilities', () => {
    describe('hasCollection function', () => {
      const { hasCollection } = chargeDefaultUtils;

      it('is true when Seller, CIF, Door to', () => {
        const movement = {
          commercialParty: 'Seller',
          termsOfSale: 'CIF',
          pickup: { locationType: 'Door' },
        };
        hasCollection(movement).should.equal(true);
      });

      it('is false when Seller, CIF, Seaport to', () => {
        const movement = {
          commercialParty: 'Seller',
          termsOfSale: 'CIF',
          pickup: { locationType: 'Seaport' },
        };
        hasCollection(movement).should.equal(false);
      });

      it('is false when Seller, CIF, Airport to', () => {
        const movement = {
          commercialParty: 'Seller',
          termsOfSale: 'CIF',
          pickup: { locationType: 'Airport' },
        };
        hasCollection(movement).should.equal(false);
      });

      it('is false when Seller, EXW, Door to', () => {
        const movement = {
          commercialParty: 'Seller',
          termsOfSale: 'EXW',
          pickup: { locationType: 'Door' },
        };
        hasCollection(movement).should.equal(false);
      });

      it('is true when Buyer, EXW, Door to', () => {
        const movement = {
          commercialParty: 'Buyer',
          termsOfSale: 'EXW',
          pickup: { locationType: 'Door' },
        };
        hasCollection(movement).should.equal(true);
      });

      it('is false when Buyer, EXW, Seaport to', () => {
        const movement = {
          commercialParty: 'Buyer',
          termsOfSale: 'EXW',
          pickup: { locationType: 'Seaport' },
        };
        hasCollection(movement).should.equal(false);
      });

      it('is false when Buyer, EXW, Airport to', () => {
        const movement = {
          commercialParty: 'Buyer',
          termsOfSale: 'EXW',
          pickup: { locationType: 'Airport' },
        };
        hasCollection(movement).should.equal(false);
      });

      it('is false when Buyer, CIF, Door to', () => {
        const movement = {
          commercialParty: 'Buyer',
          termsOfSale: 'CIF',
          pickup: { locationType: 'Door' },
        };
        hasCollection(movement).should.equal(false);
      });

      it('is false when Brokerage', () => {
        const movement = {
          mode: 'Brokerage',
          commercialParty: 'Seller',
          termsOfSale: 'CIF',
          pickup: { locationType: 'Door' },
        };
        hasCollection(movement).should.equal(false);
      });
    });

    describe('hasDelivery function', () => {
      const { hasDelivery } = chargeDefaultUtils;

      it('is true if Seller, DAP, to Door', () => {
        const movement = {
          commercialParty: 'Seller',
          termsOfSale: 'DAP',
          delivery: { locationType: 'Door' },
        };
        hasDelivery(movement).should.equal(true);
      });

      it('is false if Seller, DAP, to Seaport', () => {
        const movement = {
          commercialParty: 'Seller',
          termsOfSale: 'DAP',
          delivery: { locationType: 'Seaport' },
        };
        hasDelivery(movement).should.equal(false);
      });

      it('is false if Seller, DAP, to Airport', () => {
        const movement = {
          commercialParty: 'Seller',
          termsOfSale: 'DAP',
          delivery: { locationType: 'Airport' },
        };
        hasDelivery(movement).should.equal(false);
      });

      it('is false if Seller, CFR, to Door', () => {
        const movement = {
          commercialParty: 'Seller',
          termsOfSale: 'CFR',
          delivery: { locationType: 'Door' },
        };
        hasDelivery(movement).should.equal(false);
      });

      it('is true when Buyer, CFR, to Door', () => {
        const movement = {
          commercialParty: 'Buyer',
          termsOfSale: 'CFR',
          delivery: { locationType: 'Door' },
        };
        hasDelivery(movement).should.equal(true);
      });

      it('is false when Buyer, CFR, to Seaport', () => {
        const movement = {
          commercialParty: 'Buyer',
          termsOfSale: 'CFR',
          delivery: { locationType: 'Seaport' },
        };
        hasDelivery(movement).should.equal(false);
      });

      it('is false when Buyer, CFR, to Airport', () => {
        const movement = {
          commercialParty: 'Buyer',
          termsOfSale: 'CFR',
          delivery: { locationType: 'Airport' },
        };
        hasDelivery(movement).should.equal(false);
      });

      it('is false when Buyer, DAP, to Door', () => {
        const movement = {
          commercialParty: 'Buyer',
          termsOfSale: 'DAP',
          delivery: { locationType: 'Door' },
        };
        hasDelivery(movement).should.equal(false);
      });
    });
  });
}
