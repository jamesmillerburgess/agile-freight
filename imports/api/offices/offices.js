import { Mongo } from 'meteor/mongo';

export const Offices = new Mongo.Collection('Offices');

Offices.refSchema = new SimpleSchema({
  id: { type: String, optional: true, defaultValue: '' },
  name: {
    type: String,
    optional: true,
    autoValue: function autoValue() {
      if (!this.field('id').value) {
        return undefined;
      }
      return Offices.findOne(this.field('id').value).name || '';
    },
  },
  address: {
    type: String,
    optional: true,
    autoValue: function autoValue() {
      if (!this.field('id').value) {
        return '';
      }
      return Offices.findOne(this.field('id').value).address || '';
    },
  },
});
