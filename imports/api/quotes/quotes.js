import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

import { Customers } from '../customers/customers';

export const Quotes = new Mongo.Collection('Quotes');

const Schemas = {};

const packageLineSchema = new SimpleSchema({
  num: { type: Number, optional: true },
  type: { type: String, optional: true },
  grossWeight: { type: Number, optional: true },
  volume: { type: Number, optional: true },
});

const cargoSchema = new SimpleSchema({
  descriptionOfGoods: { type: String, optional: true },
  packageLines: Array,
  'packageLines.$': packageLineSchema,
  totalPackages: { type: Number, optional: true },
  totalPackageType: { type: String, optional: true },
  totalGrossWeight: { type: Number, optional: true },
  totalVolume: { type: Number, optional: true },
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
  customerId: { type: String, optional: false },
  issuedOn: { type: String, optional: true },
  validThrough: {
    type: Date,
    optional: true,
    autoValue() {
      if (this.isInsert) {
        const date = new Date();
        date.setDate(date.getDate() + 30);
        return date;
      }
    },
  },
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
  service: { type: String, optional: true, defaultValue: '' },
  cargo: {
    type: cargoSchema,
    optional: true,
    defaultValue: { descriptionOfGoods: '', packageLines: [] },
  },
  charges: {
    type: Array,
    optional: true,
    defaultValue: [],
  },
  summary: {
    type: Object,
    optional: true,
    defaultValue: {},
  },
  agilityContact: {
    type: String,
    optional: true,
    autoValue() {

    },
  },
  termsAndConditions: {
    type: String,
    optional: true,
    autoValue() {

    },
  },
});

Quotes.attachSchema(Schemas.Quote);
