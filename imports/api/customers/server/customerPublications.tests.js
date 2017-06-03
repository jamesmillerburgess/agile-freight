/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

import { chai } from 'meteor/practicalmeteor:chai';
import { Meteor } from 'meteor/meteor';
import { PublicationCollector } from 'meteor/johanbrook:publication-collector';
import { Random } from 'meteor/random';

import './customerPublications';
import { Customers } from '../customers-collection';
import { Quotes } from '../../quotes/quotesCollection';
import { UNLocations } from '../../unlocations/unlocations-collection';

chai.should();

if (Meteor.isServer) {
  describe('Customer Publications', () => {
    describe('customers.deepCustomer', () => {
      const collector = new PublicationCollector({ userId: Random.id() });
      beforeEach(() => {
        Customers.remove({});
        Customers.insert({ _id: 'a', quotes: ['0', '1'] });
        Customers.insert({ _id: 'b', quotes: ['3'] });
        Quotes.remove({});
        Quotes.insert({
          _id: '0',
          customerId: 'a',
          movement: { pickup: { location: '0' }, delivery: { location: '1' } },
        });
        Quotes.insert({
          _id: '1',
          customerId: 'a',
          movement: { pickup: { location: '2' }, delivery: { location: '3' } },
        });
        Quotes.insert({
          _id: '2',
          customerId: 'b',
          movement: { pickup: { location: '4' }, delivery: { location: '5' } },
        });
        UNLocations.remove({});
        UNLocations.insert({ _id: '0' });
        UNLocations.insert({ _id: '1' });
        UNLocations.insert({ _id: '2' });
        UNLocations.insert({ _id: '3' });
        UNLocations.insert({ _id: '4' });
        UNLocations.insert({ _id: '5' });
      });

      it('registers as a publication', () => {
        Meteor.server.publish_handlers.should.have.property('customers.deepCustomer');
      });

      it('publishes only the specified customer', (done) => {
        collector.collect('customers.deepCustomer', 'a', (collections) => {
          collections.should.have.property('Customers');
          collections.Customers.length.should.equal(1);
          collections.Customers[0]._id.should.equal('a');
          done();
        });
      });

      it('publishes the quotes on the customer', (done) => {
        collector.collect('customers.deepCustomer', 'a', (collections) => {
          collections.should.have.property('Quotes');
          collections.Quotes.length.should.equal(2);
          collections.Quotes[0]._id.should.equal('0');
          collections.Quotes[1]._id.should.equal('1');
          done();
        });
      });

      it('publishes the locations on the customer', (done) => {
        collector.collect('customers.deepCustomer', 'a', (collections) => {
          collections.should.have.property('UNLocations');
          collections.UNLocations.length.should.equal(4);
          collections.UNLocations[0]._id.should.equal('0');
          collections.UNLocations[1]._id.should.equal('1');
          collections.UNLocations[2]._id.should.equal('2');
          collections.UNLocations[3]._id.should.equal('3');
          done();
        });
      });
    });
  });
}
