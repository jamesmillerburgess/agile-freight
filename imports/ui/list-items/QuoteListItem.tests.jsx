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
import { UNLocations } from '../../api/unlocations/unlocations-collection';

if (Meteor.isClient) {
  describe('QuoteListItem Component', () => {
    chai.should();

    const props = { quoteId: 'a' };

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
      UNLocations.insert({ _id: 'a', name: 'Location1' });
      UNLocations.insert({ _id: 'b', name: 'Location2' });
    });

    afterEach(() => {
      StubCollections.restore();
    });

    it('should render a component', () => {
      const quoteListItem = mount(<QuoteListItem {...props} />);

      quoteListItem.exists().should.equal(true);
      quoteListItem.unmount();
    });

    describe('Icons', () => {
      it('renders a copy icon', () => {
        const wrapper = mount(<QuoteListItem {...props} />);

        wrapper.find('.fa-clone').length.should.equal(1);
      });
    });

    describe('Cargo Totals', () => {
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

        quoteListItem1.contains(<span className="label">1 UNIT, 2 TEU</span>).should.equal(true);
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

        quoteListItem2.contains(<span className="label">2 UNITS, 2 TEU</span>).should.equal(true);
        quoteListItem2.unmount();
      });

      it('renders a string in place of cargo totals for rated, containerized quotes', () => {
        Quotes.update(
          { _id: 'a' },
          { $set: { cargo: { ratedQuote: true, cargoType: 'Containerized' } } },
        );
        const quoteListItem = mount(<QuoteListItem {...props} />);

        quoteListItem.contains(<span className="label">RATED, CONTAINERIZED</span>).should.equal(true);
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

        quoteListItem1.contains(<span className="label">1 PKG, 3 CBM, 2 KG</span>).should.equal(true);
        quoteListItem1.unmount();

        Quotes.update({ _id: 'a' }, { $set: { 'cargo.totalPackages': 2 } });
        const quoteListItem2 = mount(<QuoteListItem {...props} />);
        quoteListItem2.contains(<span className="label">2 PKGS, 3 CBM, 2 KG</span>).should.equal(true);
        quoteListItem2.unmount();
      });

      it('rounds the values for the volume and gross weight', () => {
        Quotes.update(
          { _id: 'a' },
          {
            $set: {
              cargo: {
                ratedQuote: false,
                cargoType: 'Loose',
                totalPackages: 1,
                totalVolume: 0.111111111,
                volumeUOM: 'cbm',
                totalWeight: 0.222222222,
                weightUOM: 'kg',
              },
            },
          });
        const wrapper = mount(<QuoteListItem {...props} />);

        wrapper.contains(<span className="label">1 PKG, 0.111 CBM, 0.222 KG</span>).should.equal(true);
        wrapper.unmount();
      });

      it('renders a string in place of cargo totals for rated, loose quotes', () => {
        Quotes.update({ _id: 'a' }, { $set: { cargo: { ratedQuote: true, cargoType: 'Loose' } } });
        const quoteListItem = mount(<QuoteListItem {...props} />);

        quoteListItem.contains(<span className="label">RATED, LOOSE</span>).should.equal(true);
        quoteListItem.unmount();
      });
    });

    describe('Movement', () => {
      it('renders the route if there is one', () => {
        Quotes.update({ _id: 'a' }, { $set: { movement: { pickup: { location: 'a' }, delivery: { location: 'b' } } } });
        const wrapper = mount(<QuoteListItem {...props} />);

        wrapper.contains(<span className="label">LOCATION1 – LOCATION2</span>).should.equal(true);
        wrapper.unmount();
      });

      it('doesn\'t render the route if it is missing', () => {
        Quotes.update({ _id: 'a' }, { $set: { movement: {} } });
        const wrapper = mount(<QuoteListItem {...props} />);

        wrapper.contains(<span className="label"> – </span>).should.equal(false);
        wrapper.unmount();
      });
    });

    describe('Other Services', () => {
      it('renders both other services if present', () => {
        Quotes.update({ _id: 'a' }, { $set: { otherServices: { insurance: true, customsClearance: true } } });
        const wrapper = mount(<QuoteListItem {...props} />);

        wrapper.contains(<span className="label">INSURANCE, CUSTOMS CLEARANCE</span>).should.equal(true);
        wrapper.unmount();
      });

      it('renders insurance if it is the only other service present', () => {
        Quotes.update({ _id: 'a' }, { $set: { otherServices: { insurance: true } } });
        const wrapper = mount(<QuoteListItem {...props} />);

        wrapper.contains(<span className="label">INSURANCE</span>).should.equal(true);
        wrapper.unmount();
      });

      it('renders customs clearance if it is the only other service present', () => {
        Quotes.update({ _id: 'a' }, { $set: { otherServices: { customsClearance: true } } });
        const wrapper = mount(<QuoteListItem {...props} />);

        wrapper.contains(<span className="label">CUSTOMS CLEARANCE</span>).should.equal(true);
        wrapper.unmount();
      });

      it('renders no other services if none are present', () => {
        Quotes.update({ _id: 'a' }, { $set: { otherServices: { insurance: false, customsClearance: false } } });
        let wrapper = mount(<QuoteListItem {...props} />);

        wrapper.contains(<span className="label">NO OTHER SERVICES</span>).should.equal(true);
        wrapper.unmount();

        Quotes.update({ _id: 'a' }, { $set: { otherServices: null } });
        wrapper = mount(<QuoteListItem {...props} />);

        wrapper.contains(<span className="label">NO OTHER SERVICES</span>).should.equal(true);
        wrapper.unmount();
      });
    });

    describe('Total Price', () => {
      it('renders the total price if present', () => {
        Quotes.update({ _id: 'a' }, { $set: { charges: { totalCharges: 1, currency: 'USD' } } });
        const wrapper = mount(<QuoteListItem {...props} />);

        wrapper.contains(<span className="label">USD 1.00</span>).should.equal(true);
        wrapper.unmount();
      });
    });

    describe('Quote Status', () => {
      it('renders the status if it is Draft', () => {
        Quotes.update({ _id: 'a' }, { $set: { status: 'Draft' } });
        const wrapper = mount(<QuoteListItem {...props} />);

        wrapper.contains(<span className="label">DRAFT</span>).should.equal(true);
        wrapper.unmount();
      });

      it('renders the status if it is Expired', () => {
        Quotes.update({ _id: 'a' }, { $set: { status: 'Expired' } });
        const wrapper = mount(<QuoteListItem {...props} />);

        wrapper.contains(<span className="label">EXPIRED</span>).should.equal(true);
        wrapper.unmount();
      });

      it('renders the expiry date if the status is Active', () => {
        Quotes.update({ _id: 'a' }, { $set: { status: 'Active', expiryDate: new Date('Jan 1, 2017') } });
        const wrapper = mount(<QuoteListItem {...props} />);

        wrapper.contains(<span className="label">EXPIRES 01 JAN 2017</span>).should.equal(true);
        wrapper.unmount();
      });

      it('doesn\'t render if the status is invalid', () => {
        Quotes.update({ _id: 'a' }, { $set: { status: 'Invalid' } });
        const wrapper = mount(<QuoteListItem {...props} />);

        wrapper.contains(<span className="label">INVALID</span>).should.equal(false);
        wrapper.unmount();
      });

      it('doesn\'t render if the status is Active but there is no expiry date', () => {
        Quotes.update({ _id: 'a' }, { $set: { status: 'Active' } });
        const wrapper = mount(<QuoteListItem {...props} />);

        wrapper.contains(<span className="label">ACTIVE </span>).should.equal(false);
        wrapper.unmount();
      });
    });
  });
}
