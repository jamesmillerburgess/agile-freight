import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { Customers } from '../customers/customers';
import { Offices } from '../offices/offices';
import { APIGlobals } from '../api-globals';

export const Jobs = new Mongo.Collection('Jobs');

Jobs.schema = new SimpleSchema({
  jobCode: {
    type: String,
    optional: true,
    autoValue: function autoValue() {
      const count = Jobs.find().count();
      function pad(n, width, z) {
        const fill = z || '0';
        const num = `${n}`;
        return num.length >= width ? num : new Array((width - num.length) + 1).join(fill) + n;
      }
      return `J${pad(count + 1, 8)}`;
    },
  },
  product: {
    type: String,
    optional: true,
    defaultValue: '',
    // TODO: Read this from another file
    allowedValues: ['Air', 'Ocean', 'Road', ''],
  },
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
  incoterm: {
    type: String,
    optional: true,
    defaultValue: '',
    allowedValues: APIGlobals.incotermOptions,
  },
  exportOffice: {
    type: Offices.refSchema,
    optional: true,
    defaultValue: {
      id: '',
      name: '',
      address: '',
    },
  },
  importOffice: {
    type: Customers.refSchema,
    optional: true,
    defaultValue: {
      id: '',
      name: '',
      address: '',
    },
  },
  cargo: { type: Object, optional: true, defaultValue: {} },
  routing: { type: Object, optional: true, defaultValue: {} },
  operations: { type: Object, optional: true, defaultValue: {} },
  accounting: { type: Object, optional: true, defaultValue: {} },
  latestUpdates: { type: Object, optional: true, defaultValue: {} },
});
