/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';
import { chai } from 'meteor/practicalmeteor:chai';

import { shipment } from './shipmentReducer';

if (Meteor.isClient) {
  describe('Shipment Reducers', () => {
    chai.should();
    it('defaults the various sections', () => {
      const newShipment = shipment();

      newShipment.should.have.property('cargo');
    });
  });
}
