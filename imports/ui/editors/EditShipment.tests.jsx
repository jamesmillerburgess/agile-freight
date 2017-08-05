/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

import React from 'react';
import { Meteor } from 'meteor/meteor';
import { shallow } from 'enzyme';
import { chai } from 'meteor/practicalmeteor:chai';

import EditShipment, {
  ConfirmBookingButton,
  BillOfLadingButton,
  AirWaybillButton,
} from './EditShipment.jsx';

if (Meteor.isClient) {
  chai.should();
  describe('EditShipment Component', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<EditShipment shipment={{ movement: {} }} />);
    });
    afterEach(() => {
      wrapper.unmount();
    });
    it('renders a component', () => {
      wrapper.exists().should.equal(true);
    });
    it('renders only confirm booking button if status is draft', () => {
      wrapper.setProps({
        shipment: {
          status: 'Draft',
          movement: { mode: 'Sea' },
        },
      });
      wrapper.containsMatchingElement(<ConfirmBookingButton />)
             .should
             .equal(true);
      wrapper.containsMatchingElement(<BillOfLadingButton />)
             .should
             .equal(false);
      wrapper.containsMatchingElement(<AirWaybillButton />)
             .should
             .equal(false);
      wrapper.setProps({
        shipment: {
          status: 'Draft',
          movement: { mode: 'Air' },
        },
      });
      wrapper.containsMatchingElement(<ConfirmBookingButton />)
             .should
             .equal(true);
      wrapper.containsMatchingElement(<BillOfLadingButton />)
             .should
             .equal(false);
      wrapper.containsMatchingElement(<AirWaybillButton />)
             .should
             .equal(false);
    });
    it('renders only bill of lading button if status is confirmed and mode ' +
       'is sea', () => {
      wrapper.setProps({
        shipment: {
          status: 'Confirmed',
          movement: { mode: 'Sea' },
        },
      });
      wrapper.containsMatchingElement(<ConfirmBookingButton />)
             .should
             .equal(false);
      wrapper.containsMatchingElement(<BillOfLadingButton />)
             .should
             .equal(true);
      wrapper.containsMatchingElement(<AirWaybillButton />)
             .should
             .equal(false);
    });
    it('renders only air waybill button if status is confirmed and mode is ' +
       'air', () => {
      wrapper.setProps({
        shipment: {
          status: 'Confirmed',
          movement: { mode: 'Air' },
        },
      });
      wrapper.containsMatchingElement(<ConfirmBookingButton />)
             .should
             .equal(false);
      wrapper.containsMatchingElement(<BillOfLadingButton />)
             .should
             .equal(false);
      wrapper.containsMatchingElement(<AirWaybillButton />)
             .should
             .equal(true);
    });
  });
}
