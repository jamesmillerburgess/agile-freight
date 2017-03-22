import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './stakeholder.html';
import './stakeholder.less';

Template.stakeholder.onCreated(function onCreated() {
  this.data.options = [
    {
      address: 'Alstom Power Boilers Limited<br/>Jubilee Hills<br/>Hyderabad, Telangana, 500033<br/>India',
      properties: '<br/>Customer – Existing<br/>Primary Address<br/>INHYD',
    },
  ];
  this.data.search = new ReactiveVar(this.data.value);
});

Template.stakeholder.onRendered(function onRendered() {
  $(this.find('.dropdown-button')).dropdown();
  $(this.find('.value'))[0].innerText = this.data.value;
  $(this.find('.dropdown-filter'))[0].value = this.data.value;
});

Template.stakeholder.helpers({
  getSearch() {
    if (this.search) {
      return this.search.get();
    }
    return '';
  },
  addressQuery() {
    return {
      context: this.options[0].address,
      search: this.search.get(),
    };
  },
  propertiesQuery() {
    return {
      context: this.options[0].properties,
      search: this.search.get(),
    };
  },
});

Template.stakeholder.events({
  'shown.bs.dropdown .dropdown': function updateInput(event) {
    const input = $(event.target).find('.dropdown-filter')[0];
    input.value = $(event.target).find('.value')[0].innerText;
    input.select();
  },
  'input .dropdown-filter': function inputDropdownFilterHandler(event) {
    this.search.set(event.target.value);
  },
});
