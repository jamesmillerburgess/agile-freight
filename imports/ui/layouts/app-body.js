import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './app-body.html';
import './app-body.less';

Template.appBody.helpers({
  loggedIn: function loggedIn() {
    return Meteor.user();
  },
});
