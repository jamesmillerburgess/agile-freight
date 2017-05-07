import { Mongo } from 'meteor/mongo';
// import SimpleSchema from 'simpl-schema';

export const Customers = new Mongo.Collection('Customers');

// const Schemas = {};
//
// Schemas.Customer = new SimpleSchema({
//   id: { type: String, optional: true, defaultValue: '' },
//   name: {
//     type: String,
//     optional: true,
//     autoValue: function autoValue() {
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
//       if (!this.field('id').value) {
//         return '';
//       }
//       return Customers.findOne(this.field('id').value).address || '';
//     },
//   },
// });
//
// Customers.attachSchema(Schemas.Customer);
