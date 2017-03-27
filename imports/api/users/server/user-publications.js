import { Meteor } from 'meteor/meteor';

Meteor.publish('userData', function publishUserData() {
  if (this.userId) {
    return Meteor.users.find({},
      { fields: { profile: 1, emails: 1 } });
  }
  this.ready();
  return null;
});
