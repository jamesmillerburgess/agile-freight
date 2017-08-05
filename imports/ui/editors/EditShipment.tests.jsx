/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

import React from 'react';
import { Meteor } from 'meteor/meteor';
import { shallow } from 'enzyme';
import { chai } from 'meteor/practicalmeteor:chai';

import EditShipment from './EditShipment.jsx';

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
    it('renders bill of lading button if mode is sea', () => {
      wrapper.setProps({ shipment: { movement: { mode: 'Sea' } } });
      wrapper.containsMatchingElement(<button>BILL OF LADING</button>)
             .should
             .equal(true);
    });
    it('renders air waybill button if mode is air', () => {
      wrapper.setProps({ shipment: { movement: { mode: 'Air' } } });
      wrapper.containsMatchingElement(<button>AIR WAYBILL</button>)
             .should
             .equal(true);
    });
  });
}
