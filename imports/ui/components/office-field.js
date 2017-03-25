import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import { Offices } from '../../api/offices/offices';

import './office-field.html';
import './office-field.less';

Template.officeField.onCreated(function onCreated() {
  this.data.search = new ReactiveVar(this.data.value);
});

Template.officeField.onRendered(function onRendered() {
  $(this.find('.dropdown-button')).dropdown();
});

Template.officeField.helpers({
  results() {
    return Offices.find(
      { search: { $regex: this.search.get() || '', $options: 'gi' } },
      { limit: 5 },
    );
  },
});

Template.officeField.events({
  'shown.bs.dropdown .dropdown': function updateInput(event) {
    const input = $(event.target).find('.dropdown-filter')[0];
    input.value = $(event.target).find('.value')[0].innerText;
    input.select();
  },
  'input .dropdown-filter': function inputDropdownFilterHandler(event) {
    this.search.set(event.target.value);
  },
  'click .dropdown-menu a': function handleClickDropdownMenuA(event) {
    const newValue = $(event.target).parents('a')[0].name || '';
    $(event.target).parents('.dropdown').find('.value')[0].innerText = newValue;
    this.search.set(newValue);
  },
});
