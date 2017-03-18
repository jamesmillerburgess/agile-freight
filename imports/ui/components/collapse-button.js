import { Template } from 'meteor/templating';

import './collapse-button.html';

Template.collapseButton.onRendered(function onRendered() {
  const icon = this.find('i');
  const collapsible = $(this.data.target);

  if (collapsible.hasClass('show')) {
    icon.classList.remove('fa-chevron-down');
    icon.classList.add('fa-chevron-up');
  } else {
    icon.classList.remove('fa-chevron-up');
    icon.classList.add('fa-chevron-down');
  }
});

Template.collapseButton.events({
  'click .collapse-button': function handleCollapseButtonClick(event) {
    if (event.target.classList.contains('fa-chevron-down')) {
      event.target.classList.remove('fa-chevron-down');
      event.target.classList.add('fa-chevron-up');
    } else {
      event.target.classList.remove('fa-chevron-up');
      event.target.classList.add('fa-chevron-down');
    }
  },
});
