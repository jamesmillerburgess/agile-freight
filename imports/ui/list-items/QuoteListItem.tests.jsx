/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

import React from 'react';
import { Meteor } from 'meteor/meteor';
import { shallow } from 'enzyme';
import { chai } from 'meteor/practicalmeteor:chai';
import StubCollections from 'meteor/hwillson:stub-collections';
import { Mongo } from 'meteor/mongo';

import { QuoteListItemInner } from './QuoteListItem.jsx';

import { Quotes } from '../../api/quotes/quotesCollection';
import { Customers } from '../../api/customers/customersCollection';
import { UNLocations } from '../../api/unlocations/unlocationsCollection';

if (Meteor.isClient) {
  describe('QuoteListItem Component', () => {
    chai.should();

    let wrapper;
    beforeEach(() => {
      StubCollections.stub([Quotes, Customers, UNLocations]);
      Quotes.insert({
        _id: 'a',
        customerId: 'b',
        cargo: {
          cargoType: '',
          totalContainers: 0,
          totalTEU: 0,
        },
      });
      Customers.insert({ _id: 'b', quotes: ['a'] });
      UNLocations.insert({
        _id: new Mongo.ObjectID('aaaaaaaaaaaaaaaaaaaaaaaa'),
        name: 'Location1',
      });
      UNLocations.insert({
        _id: new Mongo.ObjectID('bbbbbbbbbbbbbbbbbbbbbbbb'),
        name: 'Location2',
      });
      wrapper = shallow(<QuoteListItemInner quote={Quotes.findOne('a')} />);
    });

    afterEach(() => {
      StubCollections.restore();
    });

    it('should render a component', () => {
      wrapper.exists().should.equal(true);
    });
  });
}
