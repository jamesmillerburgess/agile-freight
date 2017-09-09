/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

import React from 'react';
import { Meteor } from 'meteor/meteor';
import { shallow } from 'enzyme';
import { chai } from 'meteor/practicalmeteor:chai';

import EditShipmentAccounting from './EditShipmentAccounting.jsx';

if (Meteor.isClient) {
  chai.should();
  describe('EditShipmentAccounting Component', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(
        <EditShipmentAccounting
          shipment={{
            cargo: {},
            movement: {},
            internalCharges: [],
            externalCharges: [],
          }}
          dispatchers={{}}
        />,
      );
    });
    afterEach(() => {
      wrapper.unmount();
    });
    it('renders a component', () => {
      wrapper.exists().should.equal(true);
    });
  });
}
