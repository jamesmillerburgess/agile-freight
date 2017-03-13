import { Template } from 'meteor/templating';

import './free-text-field.html';
import './free-text-field.less';


Template.FreeTextField.onRendered(function onRendered() {
  $(this.find('.dropdown-button')).dropdown();
  $(this.find('.value'))[0].innerText = this.data.value;
});

Template.FreeTextField.events({
  'click .dropdown-button' (event) {
    if (!$(event.target.parentNode.parentNode).hasClass('show')) {
      $(event.target).dropdown('toggle');
    }
  },
  'shown.bs.dropdown .free-text-dropdown': function updateInput(event) {
    const input = event.target.childNodes[3].childNodes[1];
    input.value = $(event.target).find('.value')[0].innerText;
    input.select();
  },
  'keydown input'(event) {
    if (event.key === 'Enter') {
      $(event.target.parentNode.parentNode).dropdown('toggle');
    }
  },
  'hide.bs.dropdown .free-text-dropdown': function updateValue(event) {
    $(event.target).find('.value')[0].innerText = event.target.childNodes[3].childNodes[1].value;
  },
});
