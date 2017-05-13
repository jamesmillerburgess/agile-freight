import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

export const CustomerQuotes = new Mongo.Collection('CustomerQuotes');

export const Schemas = {};

Schemas.CustomerQuote = new SimpleSchema({
  status: String,
  customerId: String,
  cargo: { type: Object, blackbox: true },
  movement: { type: Object, blackbox: true },
  otherServices: { type: Object, blackbox: true },
  charges: { type: Object, blackbox: true },
});

CustomerQuotes.attachSchema(Schemas.CustomerQuote);
