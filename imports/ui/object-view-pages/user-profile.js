import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './user-profile.html';
import './user-profile.less';

Template.userProfile.helpers({
  name() {
    let value = '';
    if (this.user && this.user.profile && this.user.profile.name) {
      value = this.user.profile.name;
    }
    return {
      type: 'text',
      field: {
        label: 'Name',
        value,
      },
      update: {
        method: 'users.updateField',
        id: Meteor.userId(),
        path: 'profile.name',
      },
    };
  },
  email() {
    return {
      type: 'text',
      field: {
        label: 'Email',
        value: this.user.emails[0].address,
      },
      update: {
        method: 'user.updateField',
        id: Meteor.userId(),
        path: 'emails[0].address',
      },
    };
  },
});
