import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './mention.html';

Template.mention.onRendered(function onRendered() {
  const elem = this.find('textarea');
  elem.style.height = '1px';
  elem.style.height = `${elem.scrollHeight}px`;
});

Template.mention.events({
  'input textarea': function inputTextareaHandler(event) {
    const textarea = event.target;
    textarea.style.height = '1px';
    textarea.style.height = `${textarea.scrollHeight}px`;
  },
  'keydown textarea': function keydownTextareaHandler(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      const update = {
        type: 'Note',
        source: Meteor.userId(),
        message: 'left a note :',
        note: event.target.value,
      };
      Meteor.call(this.method, this.id, update);
      const textarea = event.target;
      textarea.value = '';
      textarea.style.height = '1px';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  },
  'click #mention-button a': function clickMentionLinkHandler(event) {
    event.preventDefault();
    const input = $('.latest-updates-input');
    input[0].value = `@${event.target.name} ${input[0].value}`;
    input.focus();
  },
});
