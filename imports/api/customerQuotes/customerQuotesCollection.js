import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

export const CustomerQuotes = new Mongo.Collection('CustomerQuotes');

export const Schemas = {};

Schemas.CustomerQuote = new SimpleSchema({
  status: String,
  customerId: String,
  rateParameters: { type: Object, blackbox: true },
});

CustomerQuotes.attachSchema(Schemas.CustomerQuote);
