import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Customers } from '../customers/customers';

export const Jobs = new Mongo.Collection('Jobs');

Jobs.schema = new SimpleSchema({
  jobCode: { type: String, optional: true, defaultValue: '' },
  shipper: {
    type: Customers.refSchema,
    optional: true,
    defaultValue: {
      id: '',
      name: '',
      address: '',
    },
  },
  consignee: {
    type: Customers.refSchema,
    optional: true,
    defaultValue: {
      id: '',
      name: '',
      address: '',
    },
  },
  // TODO: Schemas for the below items
  incoterm: { type: String, optional: true, defaultValue: '' },
  exportOffice: { type: String, optional: true },
  importOffice: { type: String, optional: true },
  cargo: { type: Object, optional: true },
  routing: { type: Object, optional: true },
  operations: { type: Object, optional: true },
  accounting: { type: Object, optional: true },
});
