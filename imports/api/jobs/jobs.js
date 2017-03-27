import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';

import { APIGlobals } from '../api-globals';

export const Jobs = new Mongo.Collection('Jobs');

const Schemas = {};

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
  status: {
    type: String,
    optional: true,
    defaultValue: 'Initiated',
    allowedValues: ['Initiated', 'Received', 'Departed', 'Arrived', 'Delivered', ''],
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
  events: {
    type: Array,
    optional: true,
    defaultValue: [
      {
        id: new Meteor.Collection.ObjectID().toHexString(),
        type: 'Physical Receipt of Goods',
        status: 'Not Planned',
        date: null,
        history: [],
      },
      {
        id: new Meteor.Collection.ObjectID().toHexString(),
        type: 'International Departure',
        status: 'Not Planned',
        date: null,
        history: [],
      },
      {
        id: new Meteor.Collection.ObjectID().toHexString(),
        type: 'International Arrival',
        status: 'Not Planned',
        date: null,
        history: [],
      },
      {
        id: new Meteor.Collection.ObjectID().toHexString(),
        type: 'Proof of Delivery',
        status: 'Not Planned',
        date: null,
        history: [],
      },
    ],
  },
  'events.$': Object,
  'events.$.id': String,
  'events.$.type': String,
  'events.$.status': String,
  'events.$.date': { type: Date, optional: true },
  'events.$.history': Array,
  'events.$.history.$': Object,
  'events.$.history.$.date': Date,
  'events.$.history.$.status': String,
  'events.$.history.$.remarks': String,
  'events.$.history.$.timestamp': Date,
  'events.$.history.$.user': String,
  cargo: { type: Object, optional: true, defaultValue: {} },
  routing: { type: Object, optional: true, defaultValue: {} },
  operations: { type: Object, optional: true, defaultValue: {} },
  accounting: { type: Object, optional: true, defaultValue: {} },
  updates: { type: Array, optional: true, defaultValue: [] },
  'updates.$': Object,
  'updates.$.type': String,
  'updates.$.source': String,
  'updates.$.message': String,
  'updates.$.note': { type: String, optional: true },
});

Jobs.attachSchema(Schemas.Job);
