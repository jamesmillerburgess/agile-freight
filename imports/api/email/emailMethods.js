import { Meteor } from 'meteor/meteor';
import { Email } from 'meteor/email';

Meteor.methods({
  'email.send': function emailSend(options) {
    Email.send(options);
  },
});
