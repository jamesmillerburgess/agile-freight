import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

export const Quotes = new Mongo.Collection('Quotes');

export const Schemas = {};

Schemas.Quote = new SimpleSchema({
  status: { type: String, defaultValue: 'Draft' },
  expiryDate: { type: Date, optional: true },
  customerId: String,
  cargo: { type: Object, blackbox: true, optional: true },
  movement: { type: Object, blackbox: true, optional: true },
  otherServices: { type: Object, blackbox: true, optional: true },
  charges: { type: Object, blackbox: true, optional: true },
});

Quotes.attachSchema(Schemas.Quote);
