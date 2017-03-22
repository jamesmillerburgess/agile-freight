import { Template } from 'meteor/templating';

import './mention.html';

Template.mention.onRendered(function onRendered() {
  const elem = this.find('textarea');
  elem.style.height = '1px';
  elem.style.height = `${elem.scrollHeight} px`;
  $(elem).data({
    latestValue: elem.value,
    idSearch: {
      isSearching: false,
      query: '',
      startPosition: $(elem).getCursorPosition(),
    },
  });
});

Template.mention.events({
  'input textarea': function inputTextareaHandler(event) {
    const textarea = event.target;
    event.target.style.height = '1px';
    event.target.style.height = `${event.target.scrollHeight}px`;
    // handleInput(event, $(event.target));
  },
  'keydown textarea': function keydownTextareaHandler(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      const note = event.target.value;
      if (note.trim()) {
        // TODO: Regex to bold/hyperlink any mentions
        // TODO: Strip out or display HTML tags
        // TODO: Include whitespace

        const listItem = `<div class="latest-update-list-item"><div class="list-item-profile-pic"><a class="user-id" href="#"><img class="profile-pic" src="./lib/jburgess%20profile%20pic.png"></a></div><div class="list-item-content"><a class="user-id" href=""> jburgess</a> left a note : <div class="quote">${note}</div></div></div>`;
        $('.latest-update-list').prepend(listItem);
      }
      event.target.value = '';
      event.target.style.height = '1px';
      event.target.style.height = event.target.scrollHeight + 'px';
    }
  },
  'click #mention-button a'(event) {
    event.preventDefault();
    $('.latest-updates-input')[0].value = '@'+event.target.name+' '+$('.latest-updates-input')[0].value;
    $('.latest-updates-input').focus();
  },
});

var users = [
  { name: 'James Burgess', id: 'jburgess' },
  { name: 'Ashwath Kulkarni', id: 'akulkarni' },
  { name: 'Praveen Arya Kumar', id: 'pnkumar' },
  { name: 'Malte Katt', id: 'mkatt' },
  { name: 'Janaki Botlaguduru', id: 'jbotlaguduru' },
  { name: 'Rushabh Shah', id: 'rshah' },
  { name: 'Tapan Shah', id: 'tashah' },
  { name: 'Phanikumar Sripada', id: 'psripada' },
  { name: 'Rexsebastian Chandru', id: 'rchandru' },
  { name: 'Siva Kumar', id: 'skumar' },
];

var completeMention = function (target) {
  // Replace query with the first result
  var newVal = target.val().slice(0, target.data().idSearch.startPosition)
    + target.data().idSearch.results[0].id + " "
    + target.val().slice(target.data().idSearch.startPosition + target.data().idSearch.query.length);
  target.val(newVal);
  target.data().idSearch.isSearching = false;

  //TODO: Set cursor position
};

var handleKeydown = function (event, target) {

  // Detect the shift button
  if (event.which == 16)
    shifted = true;

  // Tab should complete selection
  if (event.which == 9) {
    if (target.data().idSearch.isSearching && target.data().idSearch.results.length != 0) {
      completeMention(target);
      turnDropdownOff(target);
      event.preventDefault();
    }
  }

  // Space should make the query stop
  if (event.which == 32)
    target.data().idSearch.isSearching = false;

  // '@' should start a query
  if (event.which == 50 && shifted)
    startNewQuery(target, null, target.getCursorPosition() + 1);
};

var startNewQuery = function (target, query, startPosition) {
  target.data().idSearch = {
    isSearching: true,
    query: query,
    startPosition: startPosition,
    results: []
  }
};

var handleKeyup = function (event, target) {
  if (event.which == 16)
    shifted = false;
};

var updateQuery = function (event, target) {
  var startPosition = target.data().idSearch.startPosition,
    query = target.data().idSearch.query,
    idSearch = target.data().idSearch,
    isSearching = target.data().idSearch.isSearching,
    latestValue = target.data().latestValue,
    newValue = target.val(),
    lengthDiff = newValue.length - latestValue.length;

  // TODO: Handle arrow keys
  // TODO: Handle letter entered after existing @
  if (!isSearching) {
    var cursorPosition = target.getCursorPosition();
    if (cursorPosition == 1) {
      if (newValue.slice(cursorPosition - lengthDiff - 1, cursorPosition - lengthDiff) !== '@') {
        idSearch.isSearching = false;
        return;
      }
      startNewQuery(target, "", target.getCursorPosition() - lengthDiff);
    }

    if (cursorPosition > 1) {
      if (newValue.slice(cursorPosition - lengthDiff - 2, cursorPosition - lengthDiff) !== ' @') {
        idSearch.isSearching = false;
        return;
      }
      startNewQuery(target, "", target.getCursorPosition() - lengthDiff);
    }
  } else {
    if (startPosition == 1) {
      if (newValue.slice(startPosition - 1, startPosition) !== '@') {
        idSearch.isSearching = false;
        return;
      }
    }

    if (startPosition > 1) {
      if (newValue.slice(startPosition - 2, startPosition) !== ' @') {
        idSearch.isSearching = false;
        return;
      }
    }
  }

  if (query === null) {
    idSearch.query = "";
    return;
  }

  if (target.getCursorPosition() != startPosition + query.length + lengthDiff) {
    idSearch.isSearching = false;
    return;
  }

  var newQuery = newValue.slice(startPosition, startPosition + query.length + lengthDiff);
  if (newQuery.search(' ') != -1) {
    idSearch.isSearching = false;
    return;
  }

  idSearch.query = newQuery;
};

var getMentionResults = function (target, callback) {

  var results = users.slice();
  target.data().idSearch.results = results.reduce(function (previous, current) {
    if (current.name.toLowerCase().search(target.data().idSearch.query) != -1
      || current.id.toLowerCase().search(target.data().idSearch.query) != -1)
      previous.push(current);
    return previous;
  }, []);
  callback(target);
};

var updateMentionResults = function (target) {
  var results = target.data().idSearch.results;
  target.parent().children('ul').empty();
  target.parent().children('ul').append(
    $('<li>').append(
      $('<a>').append('Mention')
    )
  );
  target.parent().children('ul').append($('<li role="separator" class="divider">'));
  for (var i = 0; i < results.length; i++)
    target.parent().children('ul').append(
      $('<li>').append(
        $('<a>').attr('href', '#').append(results[i].name + " - " + results[i].id)
      )
    );
  if (results.length != 0)
    turnDropdownOn(target);
  else turnDropdownOff(target);
};

var turnDropdownOn = function (target) {
  console.log('turning on');
  if (!target.parent().hasClass('open'))
    target.parent().toggleClass('open');
};

var turnDropdownOff = function (target) {
  if (target.parent().hasClass('open'))
    target.parent().toggleClass('open');
};


var handleInput = function (event, target) {

  // Check if there is a valid query in the text input
  updateQuery(event, target);

  // Get search results based on the updated query
  if (target.data().idSearch.isSearching) {
    getMentionResults(target, updateMentionResults);
  }

  if (!target.data().idSearch.isSearching)
    turnDropdownOff(target);
  target.data("latestValue", target.val());
};

var handleClick = function (event, target) {
  turnDropdownOff(target.children('ul'));
  event.preventDefault();
};

$.fn.getCursorPosition = function () {
  var el = $(this).get(0);
  var pos = 0;
  if ('selectionStart' in el) {
    pos = el.selectionStart;
  } else if ('selection' in document) {
    el.focus();
    var Sel = document.selection.createRange();
    var SelLength = document.selection.createRange().text.length;
    Sel.moveStart('character', -el.value.length);
    pos = Sel.text.length - SelLength;
  }
  return pos;
};