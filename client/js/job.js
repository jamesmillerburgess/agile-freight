$('.modal').on('shown.bs.modal', function () {
  console.log('resize!');
  $(this).find('.modal-dialog').css({
    width: '660px',
    height: '400px',
    'max-height': '100%',
  });
});

$('.dropdown-input').on('keydown', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    var newValue = event.target.value;
    event.target.parentNode.parentNode.childNodes[1].innerText = newValue;
    $(event.target.parentNode.parentNode.childNodes[1]).dropdown('toggle');
  }
});

$('.dropdown').on('click', function(event) {
  event.preventDefault();
  // TODO: Set focus on the dropdown
  // event.target.parentNode.childNodes[3].childNodes[1].focus();
});

$('.field-dropdown a').on('click', function(event) {
  event.preventDefault();
  event.target.parentNode.parentNode.childNodes[1].innerText = event.target.name;
  console.log(event);
});

$('').on('hide.bs.dropdown', (event) => {
  console.log('hello');
});
