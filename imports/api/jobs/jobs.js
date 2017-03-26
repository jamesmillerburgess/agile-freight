import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

import { Customers } from '../customers/customers';
import { Offices } from '../offices/offices';
import { APIGlobals } from '../api-globals';

export const Jobs = new Mongo.Collection('Jobs');

const Schemas = {};

// Schemas.CustomerRef = new SimpleSchema({
//   id: { type: String, optional: true, defaultValue: '' },
//   name: {
//     type: String,
//     optional: true,
//     autoValue: function autoValue() {
//       console.log('Updating name...');
//       if (!this.field('id').value) {
//         return undefined;
//       }
//       return Customers.findOne(this.field('id').value).name || '';
//     },
//   },
//   address: {
//     type: String,
//     optional: true,
//     autoValue: function autoValue() {
//       console.log('Updating address...');
//       if (!this.field('id').value) {
//         return '';
//       }
//       return Customers.findOne(this.field('id').value).address || '';
//     },
//   },
// });

Schemas.Job = new SimpleSchema({
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
  shipper: { type: String, optional: true, defaultValue: '' },
  consignee: { type: String, optional: true, defaultValue: '' },
  incoterm: {
    type: String,
    optional: true,
    defaultValue: '',
    allowedValues: APIGlobals.incotermOptions,
  },
  exportOffice: { type: String, optional: true, defaultValue: '' },
  importOffice: { type: String, optional: true, defaultValue: '' },
  cargo: { type: Object, optional: true, defaultValue: {} },
  routing: { type: Object, optional: true, defaultValue: {} },
  operations: { type: Object, optional: true, defaultValue: {} },
  accounting: { type: Object, optional: true, defaultValue: {} },
  latestUpdates: { type: Object, optional: true, defaultValue: {} },
});

Jobs.attachSchema(Schemas.Job);
