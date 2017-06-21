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

      it('returns true when Seller, CIF, Door to', () => {
        const movement = {
          commercialParty: 'Seller',
          termsOfSale: 'CIF',
          pickup: { locationType: 'Door' },
        };
        hasCollection(movement).should.equal(true);
      });

      it('returns false when Seller, CIF, Seaport to', () => {
        const movement = {
          commercialParty: 'Seller',
          termsOfSale: 'CIF',
          pickup: { locationType: 'Seaport' },
        };
        hasCollection(movement).should.equal(false);
      });

      it('returns false when Seller, CIF, Airport to', () => {
        const movement = {
          commercialParty: 'Seller',
          termsOfSale: 'CIF',
          pickup: { locationType: 'Airport' },
        };
        hasCollection(movement).should.equal(false);
      });

      it('returns false when Seller, EXW, Door to', () => {
        const movement = {
          commercialParty: 'Seller',
          termsOfSale: 'EXW',
          pickup: { locationType: 'Door' },
        };
        hasCollection(movement).should.equal(false);
      });

      it('returns true when Buyer, EXW, Door to', () => {
        const movement = {
          commercialParty: 'Buyer',
          termsOfSale: 'EXW',
          pickup: { locationType: 'Door' },
        };
        hasCollection(movement).should.equal(true);
      });

      it('returns false when Buyer, EXW, Seaport to', () => {
        const movement = {
          commercialParty: 'Buyer',
          termsOfSale: 'EXW',
          pickup: { locationType: 'Seaport' },
        };
        hasCollection(movement).should.equal(false);
      });

      it('returns false when Buyer, EXW, Airport to', () => {
        const movement = {
          commercialParty: 'Buyer',
          termsOfSale: 'EXW',
          pickup: { locationType: 'Airport' },
        };
        hasCollection(movement).should.equal(false);
      });

      it('returns false when Buyer, CIF, Door to', () => {
        const movement = {
          commercialParty: 'Buyer',
          termsOfSale: 'CIF',
          pickup: { locationType: 'Door' },
        };
        hasCollection(movement).should.equal(false);
      });

      it('returns false when Brokerage', () => {
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

      it('returns true if Seller, DAP, to Door', () => {
        const movement = {
          commercialParty: 'Seller',
          termsOfSale: 'DAP',
          delivery: { locationType: 'Door' },
        };
        hasDelivery(movement).should.equal(true);
      });

      it('returns false if Seller, DAP, to Seaport', () => {
        const movement = {
          commercialParty: 'Seller',
          termsOfSale: 'DAP',
          delivery: { locationType: 'Seaport' },
        };
        hasDelivery(movement).should.equal(false);
      });

      it('returns false if Seller, DAP, to Airport', () => {
        const movement = {
          commercialParty: 'Seller',
          termsOfSale: 'DAP',
          delivery: { locationType: 'Airport' },
        };
        hasDelivery(movement).should.equal(false);
      });

      it('returns false if Seller, CFR, to Door', () => {
        const movement = {
          commercialParty: 'Seller',
          termsOfSale: 'CFR',
          delivery: { locationType: 'Door' },
        };
        hasDelivery(movement).should.equal(false);
      });

      it('returns true when Buyer, CFR, to Door', () => {
        const movement = {
          commercialParty: 'Buyer',
          termsOfSale: 'CFR',
          delivery: { locationType: 'Door' },
        };
        hasDelivery(movement).should.equal(true);
      });

      it('returns false when Buyer, CFR, to Seaport', () => {
        const movement = {
          commercialParty: 'Buyer',
          termsOfSale: 'CFR',
          delivery: { locationType: 'Seaport' },
        };
        hasDelivery(movement).should.equal(false);
      });

      it('returns false when Buyer, CFR, to Airport', () => {
        const movement = {
          commercialParty: 'Buyer',
          termsOfSale: 'CFR',
          delivery: { locationType: 'Airport' },
        };
        hasDelivery(movement).should.equal(false);
      });

      it('returns false when Buyer, DAP, to Door', () => {
        const movement = {
          commercialParty: 'Buyer',
          termsOfSale: 'DAP',
          delivery: { locationType: 'Door' },
        };
        hasDelivery(movement).should.equal(false);
      });
      
      it('returns false when Brokerage', () => {
        const movement = {
          mode: 'Brokerage',
          commercialParty: 'Buyer',
          termsOfSale: 'CFR',
          delivery: { locationType: 'Door' },
        };
        hasDelivery(movement).should.equal(false);
      });
    });

    describe('hasInternationalFreight function', () => {
      const { hasInternationalFreight } = chargeDefaultUtils;
      it('returns true when Seller, CFR', () => {
        const movement = {
          commercialParty: 'Seller',
          termsOfSale: 'CFR',
        };
        hasInternationalFreight(movement).should.equal(true);
      });

      it('returns false when Seller, EXW', () => {
        const movement = {
          commercialParty: 'Seller',
          termsOfSale: 'EXW',
        };
        hasInternationalFreight(movement).should.equal(false);
      });

      it('returns true when Buyer, EXW', () => {
        const movement = {
          commercialParty: 'Buyer',
          termsOfSale: 'EXW',
        };
        hasInternationalFreight(movement).should.equal(true);
      });

      it('returns false when Buyer, CFR', () => {
        const movement = {
          commercialParty: 'Buyer',
          termsOfSale: 'CFR',
        };
        hasInternationalFreight(movement).should.equal(false);
      });

      it('returns false when Brokerage', () => {
        const movement = {
          mode: 'Brokerage',
          commercialParty: 'Seller',
          termsOfSale: 'CFR',
        };
        hasInternationalFreight(movement).should.equal(false);
      });
    });
  });
}
