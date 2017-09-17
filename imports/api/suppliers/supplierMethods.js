import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import { Suppliers } from './supplierCollection';

export const newSupplier = (supplier) => {
  check(supplier, Object);
  return Suppliers.insert(supplier);
};

export const saveSupplier = (id, supplier) => {
  Suppliers.update(id, supplier);
};

Meteor.methods({
  'supplier.new': newSupplier,
  'supplier.save': saveSupplier,
});
