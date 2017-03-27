import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './app-body.html';
import './app-body.less';

Template.appBody.helpers({
  loggedIn: function loggedIn() {
    return Meteor.user();
  },
});

Template.appBody.events({
  'click #navbar-profile-button': function handleClickNavbarProfileButton(event) {
    FlowRouter.go(`/user-profile/${Meteor.userId()}`);
  }
});
