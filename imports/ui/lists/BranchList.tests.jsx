/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

import React from 'react';
import { Meteor } from 'meteor/meteor';
import { shallow } from 'enzyme';
import { chai } from 'meteor/practicalmeteor:chai';

import BranchList, { BranchListInner } from './BranchList.jsx';

if (Meteor.isClient) {
  chai.should();
  describe('CustomerListInner Component', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<BranchListInner />);
    });
    afterEach(() => {
      wrapper.unmount();
    });

  });
}
