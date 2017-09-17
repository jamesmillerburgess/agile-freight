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
      wrapper = shallow(
        <EditShipment
          shipment={{ cargo: {}, movement: {} }}
          dispatchers={{}}
          toOperations=""
          toAccounting=""
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
