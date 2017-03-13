import './dropdown.html';

Template.Dropdown.onRendered(function onRendered() {
  $(this.find('.value'))[0].innerText = this.data.value;
});

Template.Dropdown.events({
  'click .dropdown-menu a'(event) {
    $(event.target).parents('.dropdown').find('.value')[0].innerText = event.target.innerText || '';
  },
});
