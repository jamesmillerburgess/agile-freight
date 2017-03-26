import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import moment from 'moment';

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
  if (this.data.type === 'event') {
    this.$('.datetimepicker').datetimepicker({
      inline: true,
      format: 'DD-MMM-YYYY HH:mm',
      useCurrent: false,
      keepOpen: true,
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
    if (this.type === 'select') {
      return this.field.value;
    }
    if (this.type === 'reference') {
      return this.field.collection.findOne(this.field.id)[this.field.display];
    }
    if (this.type === 'event') {
      if (this.field.event.status === 'Not Planned') {
        return 'Not Planned';
      }
      return moment(this.field.event.date).format('DD-MMM-YYYY HH:mm');
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
});

Template.field.events({
  'show.bs.dropdown .dropdown': function showDropdown(event) {
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
    if (this.type === 'reference') {
      const input = $(event.target).find('.dropdown-filter')[0];
      input.value = $(event.target).find('.value')[0].innerText;
      input.select();
    }
    if (this.type === 'event') {
      const input = $(event.target).find('.datetimepicker');
      input[0].value = $(event.target).find('.value')[0].innerText;
      input.data('DateTimePicker').date(input[0].value);
      input[0].select();
    }
  },
  'blur .datetimepicker': function handleBlurDateTimePicker(event) {
    $(event.target).data('DateTimePicker').show();
  },
  'input .dropdown-filter': function inputDropdownFilterHandler(event) {
    if (this.type === 'reference') {
      this.search.set(event.target.value);
    }
  },
  'click .dropdown-menu a': function handleClickDropdownMenuA(event) {
    const display = $(event.target).parents('.a-container')[0].title || '';
    const updateValue = $(event.target).parents('.a-container')[0].id || '';
    $(event.target).parents('.dropdown').find('.value')[0].innerText = display;
    if (this.type === 'reference') {
      this.search.set(display);
    }
    Meteor.call(this.update.method, this.update.id, this.update.path, updateValue, () => {
      $(event.target).parents('.dropdown').find('.value')[0].innerText = '';
    });
  },
  'click .dropdown-menu': function dontCloseDropdown(event) {
    if (this.type === 'event') {
      event.stopPropagation();
    }
  },
  'click .set-expected': function handleClickSetExpected(event) {
    $(event.target).parents('.dropdown-menu').find('.set-expected').addClass('active');
    $(event.target).parents('.dropdown-menu').find('.set-actual').removeClass('active');
    // $('.event .set-expected').addClass('active');
    // $('.event .set-actual').removeClass('active');
  },
  'click .set-actual': function handleClickSetExpected(event) {
    $(event.target).parents('.dropdown-menu').find('.set-actual').addClass('active');
    $(event.target).parents('.dropdown-menu').find('.set-expected').removeClass('active');
    // $('.event .set-actual').addClass('active');
    // $('.event .set-expected').removeClass('active');
  },
  'click .update-event': function handleClickUpdateEvent(event) {
    const menu = $(event.target).parents('.dropdown-menu');
    const update = {};

    // Set the id
    update.id = this.field.event.id;

    // Set the type
    update.type = this.field.event.type;

    // Get the date and error check
    update.date = new Date(menu.find('.datetimepicker')[0].value);

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

    Meteor.call(this.update.method, this.update.id, update);

    // const dropdown = $(event.target).parents('.dropdown-menu').hide();
  },
});
