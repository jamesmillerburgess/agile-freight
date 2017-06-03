import { Mongo } from 'meteor/mongo';
// import SimpleSchema from 'simpl-schema';

export const UNLocations = new Mongo.Collection('UNLocations');

// export const Schemas = {};
//
// Schemas.UNLocation = new SimpleSchema({
//   country: { type: String, optional: true },
//   locationCode: { type: String, optional: true },
//   name: { type: String, optional: true },
//   nameWoDiacritics: { type: String, optional: true },
//   subdivision: { type: String, optional: true },
//   IATA: { type: String, optional: true },
//   isUnknown: { type: Boolean, defaultValue: false },
//   isPort: { type: Boolean, defaultValue: false },
//   isRailTerminal: { type: Boolean, defaultValue: false },
//   isRoadTerminal: { type: Boolean, defaultValue: false },
//   isAirport: { type: Boolean, defaultValue: false },
//   isPostalExchange: { type: Boolean, defaultValue: false },
//   isMultimodal: { type: Boolean, defaultValue: false },
//   isFixedTransport: { type: Boolean, defaultValue: false },
//   isBorderCrossing: { type: Boolean, defaultValue: false },
//   latitude: { type: Number, optional: true },
//   longitude: { type: Number, optional: true },
// });
//
// UNLocations.attachSchema(Schemas.UNLocation);
