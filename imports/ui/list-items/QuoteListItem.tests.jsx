/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

import React from 'react';
import { Meteor } from 'meteor/meteor';
import { mount } from 'enzyme';
import { chai } from 'meteor/practicalmeteor:chai';
import StubCollections from 'meteor/hwillson:stub-collections';

import QuoteListItem from './QuoteListItem.jsx';

import { Quotes } from '../../api/quotes/quotesCollection';
import { Customers } from '../../api/customers/customers-collection';

// Stub the method that is used in the component
if (Meteor.isServer) {
  Meteor.default_server.method_handlers['quote.copy'] = () => null;
}

if (Meteor.isClient) {
  describe('QuoteListItem Component', () => {
    chai.should();

    const props = { quoteId: 'a' };

    beforeEach(() => {
      StubCollections.stub([Quotes, Customers]);
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
    });

    afterEach(() => {
      StubCollections.restore();
    });

    it('should render a component', () => {
      const quoteListItem = mount(<QuoteListItem {...props} />);

      quoteListItem.exists().should.equal(true);
      quoteListItem.unmount();
    });

    it('renders the cargo totals for containerized cargo on an itemized quote', () => {
      Quotes.update(
        { _id: 'a' },
        {
          $set: {
            cargo: {
              ratedQuote: false,
              cargoType: 'Containerized',
              totalContainers: 1,
              totalTEU: 2,
            },
          },
        });
      const quoteListItem1 = mount(<QuoteListItem {...props} />);

      quoteListItem1.find('.label').get(0).innerHTML.should.equal('1 UNIT, 2 TEU');
      quoteListItem1.unmount();

      Quotes.update(
        { _id: 'a' },
        {
          $set: {
            cargo: {
              cargoType: 'Containerized',
              totalContainers: 2,
              totalTEU: 2,
            },
          },
        });
      const quoteListItem2 = mount(<QuoteListItem {...props} />);
      quoteListItem2.find('.label').get(0).innerHTML.should.equal('2 UNITS, 2 TEU');
      quoteListItem2.unmount();
    });

    it('renders a string in place of cargo totals for rated, containerized quotes', () => {
      Quotes.update(
        { _id: 'a' },
        {
          $set: {
            cargo: { ratedQuote: true, cargoType: 'Containerized' },
          },
        },
      );
      const quoteListItem = mount(<QuoteListItem {...props} />);

      quoteListItem.find('.label').get(0).innerHTML.should.equal('RATED, CONTAINERIZED');
      quoteListItem.unmount();
    });

    it('renders the cargo totals for loose cargo on an itemized quote', () => {
      Quotes.update(
        { _id: 'a' },
        {
          $set: {
            cargo: {
              ratedQuote: false,
              cargoType: 'Loose',
              totalPackages: 1,
              totalVolume: 3,
              volumeUOM: 'cbm',
              totalWeight: 2,
              weightUOM: 'kg',
            },
          },
        });
      const quoteListItem1 = mount(<QuoteListItem {...props} />);

      quoteListItem1.find('.label').get(0).innerHTML.should.equal('1 PKG, 3 CBM, 2 KG');
      quoteListItem1.unmount();

      Quotes.update({ _id: 'a' }, { $set: { 'cargo.totalPackages': 2 } });
      const quoteListItem2 = mount(<QuoteListItem {...props} />);
      quoteListItem2.find('.label').get(0).innerHTML.should.equal('2 PKGS, 3 CBM, 2 KG');
      quoteListItem2.unmount();
    });

    it('renders a string in place of cargo totals for rated, loose quotes', () => {
      Quotes.update({ _id: 'a' }, { $set: { cargo: { ratedQuote: true, cargoType: 'Loose' } } });
      const quoteListItem = mount(<QuoteListItem {...props} />);

      quoteListItem.find('.label').get(0).innerHTML.should.equal('RATED, LOOSE');
      quoteListItem.unmount();
    });
  });
}
