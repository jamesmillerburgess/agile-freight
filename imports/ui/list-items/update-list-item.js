import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './update-list-item.html';
import './update-list-item.less';

Template.updateListItem.helpers({
  isNote() {
    return this.type === 'Note';
  },
  userName() {
    const user = Meteor.users.findOne(this.source);
    console.log(Meteor.users.find({}).fetch());
    if (user.profile && user.profile.name) {
      return user.profile.name;
    }
    return 'unknown';
  },
});
