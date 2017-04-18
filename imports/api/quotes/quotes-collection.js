import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

import { Customers } from '../customers/customers';

import { cargoSchema } from '../cargo/cargo-utils';
import { chargesSchema } from '../charges/charges-utils';

export const Quotes = new Mongo.Collection('Quotes');

const Schemas = {};

const routeSchema = new SimpleSchema({
  from: { type: String, optional: true },
  to: { type: String, optional: true },
});

Schemas.Quote = new SimpleSchema({
  quoteCode: {
    type: String,
    optional: true,
    autoValue() {
      if (this.isInsert) {
        const count = Quotes.find().count();

        function pad(n, width, z) {
          const fill = z || '0';
          const num = `${n}`;
          return num.length >= width ? num : new Array((width - num.length) + 1).join(fill) + n;
        }

        return `Q${pad(count + 1, 8)}`;
      }
    },
  },
  direction: { type: String, optional: true },
  incoterm: { type: String, optional: true },
  status: { type: String, optional: true },
  customerId: { type: String, optional: false },
  shipments: {
    type: Array,
    optional: true,
    defaultValue: [],
  },
  'shipments.$': { type: String, optional: true },
  issuedOn: { type: String, optional: true },
  validThrough: { type: Date, optional: true },
  customerNameAddress: {
    type: String,
    optional: true,
    autoValue() {
      if (this.isInsert) {
        const customerId = this.field('customerId').value;
        const { name, address } = Customers.findOne(customerId);
        return `${name}
${address}`;
      }
    },
  },
  mode: { type: String, optional: true, defaultValue: '' },
  type: { type: String, optional: true },
  rateType: { type: String, optional: true },
  routes: { type: Array, optional: true, defaultValue: [{}] },
  'routes.$': routeSchema,
  service: { type: String, optional: true, defaultValue: '' },
  cargo: {
    type: cargoSchema,
    optional: true,
    defaultValue: { descriptionOfGoods: '', packageLines: [] },
  },
  charges: {
    type: chargesSchema,
    optional: true,
    defaultValue: { chargeLines: [] },
  },
  summary: {
    type: Object,
    optional: true,
    defaultValue: {},
  },
  agilityContact: {
    type: String,
    optional: true,
  },
  termsAndConditions: {
    type: String,
    optional: true,
  },
}, {
  clean: {
    removeEmptyStrings: false,
  },
});

Quotes.attachSchema(Schemas.Quote);
