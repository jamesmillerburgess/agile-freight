import { Mongo } from 'meteor/mongo';
// import SimpleSchema from 'simpl-schema';

export const Countries = new Mongo.Collection('Countries');

// export const Schemas = {};
//
// Schemas.Country = new SimpleSchema({
//   countryCode: { type: String, optional: true },
//   countryCode3: { type: String, optional: true },
//   countryName: String,
//   regionCode: { type: Number, optional: true },
//   regionName: { type: String, optional: true },
//   subregionCode: { type: Number, optional: true },
//   subregionName: { type: String, optional: true },
//   intermediateRegionCode: { type: Number, optional: true },
//   intermediateRegionName: { type: String, optional: true },
// });
//
// Countries.attachSchema(Schemas.Country);
