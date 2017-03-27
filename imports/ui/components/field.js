import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import moment from 'moment';

import { UIGlobals } from '../ui-globals';

import './field.html';
import './field.less';

Template.field.onCreated(function onCreated() {
  // Set the starting search
  let search = '';
  const field = this.data.field;
  if (this.data.type === 'reference') {
    if (field.collection.findOne({ _id: field.id })) {
      search = field.collection.findOne(field.id)[field.display];
    }
  }
  this.data.search = new ReactiveVar(search);
});

Template.field.onRendered(function onRendered() {
  // Set the dropdown button to listen
  $(this.find('.dropdown-button')).dropdown();

  // Set up the datetimepicker
  if (this.data.type === 'event') {
    this.$('.datetimepicker').datetimepicker({
      inline: true,                   // No collapsing
      format: UIGlobals.dateFormat,   // Standard date format
      useCurrent: false,              // Don't default in today's date and time
    });
  }
});

Template.field.helpers({
  isSelectField() {
    return this.type === 'select';
  },
  isReferenceField() {
    return this.type === 'reference';
  },
  isEventField() {
    return this.type === 'event';
  },
  value() {
    // Select fields can directly read a value
    if (this.type === 'select') {
      return this.field.value;
    }

    // Reference fields have a value in their object...
    if (this.type === 'reference') {
      if (this.field.collection.findOne({ _id: this.field.id })) {
        return this.field.collection.findOne(this.field.id)[this.field.display];
      }

      // ...or display blank if the field is empty
      return '';
    }

    // Event fields can either be not planned or displaying a date
    if (this.type === 'event') {
      if (this.field.event.status === 'Not Planned') {
        return 'Not Planned';
      }
      return moment(this.field.event.date).format(UIGlobals.dateFormat);
    }
    return null;
  },
  results() {
    // Select fields have pre-set options
    if (this.type === 'select') {
      return this.field.options;
    }

    // Reference fields search their collections for options
    if (this.type === 'reference') {

      // Sometimes the search gets removes, so we need to re-initialize
      if (!this.search) {
        if (this.field.collection.findOne({ _id: this.field.id })) {
          this.search = new ReactiveVar(
            this.field.collection.findOne(this.field.id)[this.field.display],
          );
        } else {
          this.search = new ReactiveVar('');
        }
      }
      return this.field.collection.find(
        { search: { $regex: this.search.get(), $options: 'gi' } },
        { limit: 5 },
      );
    }
    return null;
  },
  eventStatusClasses() {
    if (this.field.event.status === 'Not Planned') {
      return 'fa-question';
    }
    if (this.field.event.status === 'Expected') {
      return 'fa-clock-o';
    }
    if (this.field.event.status === 'Actual') {
      return 'fa-check';
    }
    return '';
  },
  dropdownMenuClasses() {
    if (this.type === 'event') {
      return 'event';
    }
    return '';
  },
  overdueClass() {
    if (this.type === 'event' &&
      this.field.event.status === 'Expected' &&
      moment().isAfter(this.field.event.date)) {
      return 'overdue';
    }
    return '';
  },
});

Template.field.events({
  'show.bs.dropdown .dropdown': function showDropdown(event) {
    // Re-initialize the dropdown UI in case it was edited
    if (this.type === 'event') {
      if (this.field.event.status === 'Expected') {
        $(event.target).find('.set-expected').addClass('active');
        $(event.target).find('.set-actual').removeClass('active');
      }
      if (this.field.event.status === 'Actual') {
        $(event.target).find('.set-actual').addClass('active');
        $(event.target).find('.set-expected').removeClass('active');
      }
      if (this.field.event.status === 'Not Planned') {
        $(event.target).find('.set-expected').removeClass('active');
        $(event.target).find('.set-actual').removeClass('active');
      }
    }
  },
  'shown.bs.dropdown .dropdown': function updateInput(event) {
    // Set the input value and select the text
    if (this.type === 'reference') {
      const input = $(event.target).find('.dropdown-filter')[0];
      input.value = $(event.target).find('.value')[0].innerText;
      input.select();
    }
    if (this.type === 'event') {
      const input = $(event.target).find('.datetimepicker');
      input[0].value = $(event.target).find('.value')[0].innerText;

      // And set the datetimepicker value
      input.data('DateTimePicker').date(input[0].value);
      input[0].select();
    }
  },
  'input .dropdown-filter': function inputDropdownFilterHandler(event) {
    // Update the search as we type
    if (this.type === 'reference') {
      this.search.set(event.target.value);
    }
  },
  'click .dropdown-menu a': function handleClickDropdownMenuA(event) {
    // Prevent redirect on Internet Explorer
    event.preventDefault();

    // Grab the correct value/id
    const updateValue = $(event.target).parents('.a-container')[0].id || '';
    const display = $(event.target).parents('.a-container')[0].title || '';

    // Update the UI now
    $(event.target).parents('.dropdown').find('.value')[0].innerText = display;

    // Check if we should update the collection
    let needUpdate = true;
    if (this.type === 'select') {
      if (updateValue === this.field.value) {
        needUpdate = false;
      }
    }
    if (this.type === 'reference') {
      this.search.set(display);
      if (updateValue === this.field.id) {
        needUpdate = false;
      }
    }

    // Update if needed and reset the UI because it displays the value twice otherwise
    if (needUpdate) {
      Meteor.call(this.update.method, this.update.id, this.update.path, updateValue);
    }
  },
  'click .dropdown-menu': function dontCloseDropdown(event) {
    // Don't close the menu when we click inside it
    if (this.type === 'event') {
      event.stopPropagation();
    }
  },
  'click .set-expected': function handleClickSetExpected(event) {
    $(event.target).parents('.dropdown-menu').find('.set-expected').addClass('active');
    $(event.target).parents('.dropdown-menu').find('.set-actual').removeClass('active');
  },
  'click .set-actual': function handleClickSetExpected(event) {
    $(event.target).parents('.dropdown-menu').find('.set-actual').addClass('active');
    $(event.target).parents('.dropdown-menu').find('.set-expected').removeClass('active');
  },
  'click .update-event': function handleClickUpdateEvent(event) {
    const menu = $(event.target).parents('.dropdown-menu');
    const update = {};

    // Set the id
    update.id = this.field.event.id;

    // Set the type
    update.type = this.field.event.type;

    // Get the date and error check
    // update.date = new Date(menu.find('.datetimepicker')[0].value);
    update.date = new Date(menu.find('.datetimepicker').data('DateTimePicker').date());
    // Get the status and error check
    update.status = '';
    if (menu.find('.set-expected').hasClass('active')) {
      update.status = 'Expected';
    }
    if (menu.find('.set-actual').hasClass('active')) {
      update.status = 'Actual';
    }

    // Get the remarks
    update.remarks = menu.find('.event-update-remarks')[0].value;

    // Update
    Meteor.call(this.update.method, this.update.id, update);
  },
});
