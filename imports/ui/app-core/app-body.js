import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

import './app-body.html';
import './app-body.less';

Template.appBody.helpers({
  loggedIn: function loggedIn() {
    return Meteor.user();
  },
});

Template.appBody.events({
  'click #edit-profile-link': function handleClickNavbarProfileButton(event) {
    FlowRouter.go(`/user-profile/${Meteor.userId()}`);
  },
  'click #sign-out-link': function handleClickNavbarProfileButton(event) {
    Meteor.logout();
  },
});
