import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './field.html';
import './field.less';

Template.field.onCreated(function onCreated() {
  const field = this.data.field;
  if (this.data.type === 'select') {
    this.data.search = new ReactiveVar(field.value);
  }
  if (this.data.type === 'reference') {
    this.data.search = new ReactiveVar(field.collection.findOne(field.id)[field.display]);
  }
});

Template.field.onRendered(function onRendered() {
  $(this.find('.dropdown-button')).dropdown();
});

Template.field.helpers({
  isSelectField() {
    return this.type === 'select';
  },
  isReferenceField() {
    return this.type === 'reference';
  },
  value() {
    if (this.type === 'select') {
      return this.field.value;
    }
    if (this.type === 'reference') {
      return this.field.collection.findOne(this.field.id)[this.field.display];
    }
    return null;
  },
  results() {
    if (this.type === 'select') {
      return this.field.options;
    }
    if (this.type === 'reference') {
      if (!this.search) {
        this.search = new ReactiveVar(
          this.field.collection.findOne(this.field.id)[this.field.display],
        );
      }
      return this.field.collection.find(
        { search: { $regex: this.search.get(), $options: 'gi' } },
        { limit: 5 },
      );
    }
    return null;
  },
});

Template.field.events({
  'shown.bs.dropdown .dropdown': function updateInput(event) {
    if (this.type === 'reference') {
      const input = $(event.target).find('.dropdown-filter')[0];
      input.value = $(event.target).find('.value')[0].innerText;
      input.select();
    }
  },
  'input .dropdown-filter': function inputDropdownFilterHandler(event) {
    if (this.type === 'reference') {
      this.search.set(event.target.value);
    }
  },
  'click .dropdown-menu a': function handleClickDropdownMenuA(event) {
    const display = $(event.target).parents('a')[0].name || '';
    const updateValue = $(event.target).parents('a')[0].id || '';
    $(event.target).parents('.dropdown').find('.value')[0].innerText = display;
    if (this.type === 'reference') {
      this.search.set(display);
    }
    Meteor.call(this.update.method, this.update.id, this.update.path, updateValue);
  },
});
