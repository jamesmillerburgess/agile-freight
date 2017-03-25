import { Template } from 'meteor/templating';

import './mention.html';

Template.mention.onRendered(function onRendered() {
  const elem = this.find('textarea');
  elem.style.height = '1px';
  elem.style.height = `${elem.scrollHeight}px`;
});

Template.mention.events({
  'input textarea': function inputTextareaHandler(event) {
    const textarea = event.target;
    textarea.style.height = '1px';
    textarea.style.height = `${textarea.scrollHeight}px`;
  },
  'keydown textarea': function keydownTextareaHandler(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      const note = event.target.value;
      if (note.trim()) {
        const listItem = `<div class="latest-update-list-item">
                            <div class="list-item-profile-pic">
                              <a class="user-id" href="#">
                                <img class="profile-pic" src="/lib/jburgess%20profile%20pic.png">
                              </a>
                            </div>
                            <div class="list-item-content">
                              <a class="user-id" href=""> jburgess</a>left a note : <div class="quote">${note}</div>
                            </div>
                          </div>`;
        $('.latest-update-list').prepend(listItem);
      }
      const textarea = event.target;
      textarea.value = '';
      textarea.style.height = '1px';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  },
  'click #mention-button a': function clickMentionLinkHandler(event) {
    event.preventDefault();
    const input = $('.latest-updates-input');
    input[0].value = `@${event.target.name} ${input[0].value}`;
    input.focus();
  },
});
