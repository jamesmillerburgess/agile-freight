import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './update-list-item.html';
import './update-list-item.less';

Template.updateListItem.helpers({
  isNote() {
    return this.type === 'Note';
  },
  user() {
    return Meteor.users.findOne(this.source).emails[0].address;
  },
});
