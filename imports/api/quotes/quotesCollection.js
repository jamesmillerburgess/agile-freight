import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

export const Quotes = new Mongo.Collection('Quotes');

export const Schemas = {};

Schemas.Quote = new SimpleSchema({
  status: String,
  customerId: String,
  cargo: { type: Object, blackbox: true },
  movement: { type: Object, blackbox: true },
  otherServices: { type: Object, blackbox: true },
  charges: { type: Object, blackbox: true },
});

Quotes.attachSchema(Schemas.Quote);
