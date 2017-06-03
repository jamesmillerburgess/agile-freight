/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

import React from 'react';
import { Meteor } from 'meteor/meteor';
import { shallow } from 'enzyme';
import { chai } from 'meteor/practicalmeteor:chai';
import StubCollections from 'meteor/hwillson:stub-collections';
import { Mongo } from 'meteor/mongo';

import QuoteListItem, { QuoteListItemInner } from './QuoteListItem.jsx';

import { Quotes } from '../../api/quotes/quotesCollection';
import { Customers } from '../../api/customers/customers-collection';
import { UNLocations } from '../../api/unlocations/unlocations-collection';

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

    describe('Icons', () => {
      it('renders a copy icon', () => {
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
        wrapper.setProps({ quote: Quotes.findOne('a') });
        wrapper.contains(<span className="label">1 UNIT, 2 TEU</span>).should.equal(true);

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
        wrapper.setProps({ quote: Quotes.findOne('a') });
        wrapper.contains(<span className="label">2 UNITS, 2 TEU</span>).should.equal(true);
      });

      it('renders a string in place of cargo totals for rated, containerized quotes', () => {
        Quotes.update(
          { _id: 'a' },
          { $set: { cargo: { ratedQuote: true, cargoType: 'Containerized' } } },
        );
        wrapper.setProps({ quote: Quotes.findOne('a') });

        wrapper.contains((
          <span className="label">RATED, CONTAINERIZED</span>
        )).should.equal(true);
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
        wrapper.setProps({ quote: Quotes.findOne('a') });

        wrapper.contains((
          <span className="label">1 PKG, 3 CBM, 2 KG</span>
        )).should.equal(true);

        Quotes.update({ _id: 'a' }, { $set: { 'cargo.totalPackages': 2 } });
        wrapper.setProps({ quote: Quotes.findOne('a') });
        wrapper.contains((
          <span className="label">2 PKGS, 3 CBM, 2 KG</span>
        )).should.equal(true);
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
        wrapper.setProps({ quote: Quotes.findOne('a') });

        wrapper.contains(
          <span className="label">1 PKG, 0.111 CBM, 0.222 KG</span>,
        ).should.equal(true);
      });

      it('renders a string in place of cargo totals for rated, loose quotes', () => {
        Quotes.update({ _id: 'a' }, { $set: { cargo: { ratedQuote: true, cargoType: 'Loose' } } });
        wrapper.setProps({ quote: Quotes.findOne('a') });

        wrapper.contains(<span className="label">RATED, LOOSE</span>).should.equal(true);
      });

      it('renders a message if no cargo has been saved', () => {
        Quotes.update({ _id: 'a' }, { $set: { cargo: {} } });
        wrapper.setProps({ quote: Quotes.findOne('a') });

        wrapper.contains(<span className="label">NO CARGO ENTERED</span>).should.equal(true);
      });
    });

    describe('Movement', () => {
      it('renders the route if there is one', () => {
        Quotes.update({ _id: 'a' }, {
          $set: {
            movement: {
              pickup: { location: 'aaaaaaaaaaaaaaaaaaaaaaaa', locationName: 'LOCATION1' },
              delivery: { location: 'bbbbbbbbbbbbbbbbbbbbbbbb', locationName: 'LOCATION2' },
            },
          },
        });
        wrapper.setProps({ quote: Quotes.findOne('a') });

        wrapper.contains(<span className="label">LOCATION1 – LOCATION2</span>).should.equal(true);
      });

      it('renders a message if the route is missing', () => {
        Quotes.update({ _id: 'a' }, { $set: { movement: {} } });
        wrapper.setProps({ quote: Quotes.findOne('a') });

        wrapper.contains(<span className="label">NO ROUTING ENTERED</span>).should.equal(true);
      });

      it('renders the name that was stored on the quote, rather than the one that is in the database', () => {
        Quotes.update({ _id: 'a' }, {
          $set: {
            movement: {
              pickup: { location: 'aaaaaaaaaaaaaaaaaaaaaaaa', locationName: 'LOCATION3' },
              delivery: { location: 'bbbbbbbbbbbbbbbbbbbbbbbb', locationName: 'LOCATION4' },
            },
          },
        });
        wrapper.setProps({ quote: Quotes.findOne('a') });

        wrapper.contains(<span className="label">LOCATION3 – LOCATION4</span>).should.equal(true);
      });
    });

    describe('Other Services', () => {
      it('renders both other services if present', () => {
        Quotes.update({ _id: 'a' }, {
          $set: {
            otherServices: {
              insurance: true,
              customsClearance: true,
            },
          },
        });
        wrapper.setProps({ quote: Quotes.findOne('a') });

        wrapper.contains((
          <span className="label">INSURANCE, CUSTOMS CLEARANCE</span>
        )).should.equal(true);
      });

      it('renders insurance if it is the only other service present', () => {
        Quotes.update({ _id: 'a' }, { $set: { otherServices: { insurance: true } } });
        wrapper.setProps({ quote: Quotes.findOne('a') });

        wrapper.contains(<span className="label">INSURANCE</span>).should.equal(true);
      });

      it('renders customs clearance if it is the only other service present', () => {
        Quotes.update({ _id: 'a' }, { $set: { otherServices: { customsClearance: true } } });
        wrapper.setProps({ quote: Quotes.findOne('a') });

        wrapper.contains(<span className="label">CUSTOMS CLEARANCE</span>).should.equal(true);
      });

      it('renders no other services if none are present', () => {
        Quotes.update({ _id: 'a' }, {
          $set: {
            otherServices: {
              insurance: false,
              customsClearance: false,
            },
          },
        });
        wrapper.setProps({ quote: Quotes.findOne('a') });

        wrapper.contains(<span className="label">NO OTHER SERVICES</span>).should.equal(true);

        Quotes.update({ _id: 'a' }, { $set: { otherServices: null } });
        wrapper.setProps({ quote: Quotes.findOne('a') });

        wrapper.contains(<span className="label">NO OTHER SERVICES</span>).should.equal(true);
      });
    });

    describe('Total Price', () => {
      it('renders the total price if present', () => {
        Quotes.update({ _id: 'a' }, { $set: { charges: { totalCharges: 1, currency: 'USD' } } });
        wrapper.setProps({ quote: Quotes.findOne('a') });

        wrapper.contains(<span className="label">USD 1.00</span>).should.equal(true);
      });

      it('renders a message if no total price is present', () => {
        Quotes.update({ _id: 'a' }, { $set: { charges: {} } });
        wrapper.setProps({ quote: Quotes.findOne('a') });

        wrapper.contains(<span className="label">NO CHARGES ENTERED</span>).should.equal(true);
      });
    });

    describe('Quote Status', () => {
      it('renders the status if it is \'Draft\'', () => {
        Quotes.update({ _id: 'a' }, { $set: { status: 'Draft' } });
        wrapper.setProps({ quote: Quotes.findOne('a') });

        wrapper.contains(<span className="label">DRAFT</span>).should.equal(true);
      });

      it('renders the status if it is \'Archived\'', () => {
        Quotes.update({ _id: 'a' }, { $set: { status: 'Archived' } });
        wrapper.setProps({ quote: Quotes.findOne('a') });

        wrapper.contains(<span className="label">ARCHIVED</span>).should.equal(true);
      });

      it('renders the status if it is \'Expired\'', () => {
        Quotes.update({ _id: 'a' }, { $set: { status: 'Expired' } });
        wrapper.setProps({ quote: Quotes.findOne('a') });

        wrapper.contains(<span className="label">EXPIRED</span>).should.equal(true);
      });

      it('renders the expiry date if the status is Submitted', () => {
        Quotes.update({ _id: 'a' }, {
          $set: {
            status: 'Submitted',
            expiryDate: new Date('Jan 1, 2017'),
          },
        });
        wrapper.setProps({ quote: Quotes.findOne('a') });

        wrapper.contains(<span className="label">EXPIRES 01 JAN 2017</span>).should.equal(true);
      });

      it('doesn\'t render if the status is invalid', () => {
        Quotes.update({ _id: 'a' }, { $set: { status: 'Invalid' } });
        wrapper.setProps({ quote: Quotes.findOne('a') });

        wrapper.contains(<span className="label">INVALID</span>).should.equal(false);
      });

      it('doesn\'t render if the status is Active but there is no expiry date', () => {
        Quotes.update({ _id: 'a' }, { $set: { status: 'Active' } });
        wrapper.setProps({ quote: Quotes.findOne('a') });

        wrapper.contains(<span className="label">ACTIVE </span>).should.equal(false);
      });
    });
  });
}
