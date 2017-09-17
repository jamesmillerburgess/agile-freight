/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

import { chai } from 'meteor/practicalmeteor:chai';
import { Meteor } from 'meteor/meteor';

import { Suppliers } from './supplierCollection';
import { newSupplier, saveSupplier } from './supplierMethods';

chai.should();

if (Meteor.isServer) {
  describe('Supplier Methods', () => {
    beforeEach(() => {
      Suppliers.remove({});
    });
    describe('supplier.new', () => {
      it('insert a new supplier into the collection', () => {
        Suppliers.find({}).count().should.equal(0);
        newSupplier({});
        Suppliers.find({}).count().should.equal(1);
      });
      it('returns the id of the new supplier', () => {
        const id = newSupplier({});
        Suppliers.findOne(id)._id.should.equal(id);
      });
    });
    describe('supplier.save', () => {
      let supplierId;
      beforeEach(() => {
        supplierId = Suppliers.insert({
          name: 'b',
          address: 'c',
          emailAddress: 'd',
          currency: 'e',
        });
      });
      it('saves changes to the supplier', () => {
        saveSupplier(supplierId, { name: '1' });
        Suppliers.findOne(supplierId).name.should.equal('1');
        saveSupplier(supplierId, { address: '1' });
        Suppliers.findOne(supplierId).address.should.equal('1');
        saveSupplier(supplierId, { emailAddress: '1' });
        Suppliers.findOne(supplierId).emailAddress.should.equal('1');
        saveSupplier(supplierId, { currency: '1' });
        Suppliers.findOne(supplierId).currency.should.equal('1');
      });
      it('throws an error if other properties are passed', () => {
        (() => saveSupplier(supplierId, { _id: 'x' })).should.throw();
      });
    });
  });
}
