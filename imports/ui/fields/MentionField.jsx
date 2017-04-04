import React from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Meteor } from 'meteor/meteor';

class MentionField extends React.Component {

  constructor(props) {
    super(props);
    MentionField.handleTextareaInput = MentionField.handleTextareaInput.bind(this);
    this.handleTextareaKeydown = this.handleTextareaKeydown.bind(this);
  }

  componentDidMount() {
    this.adjustTextareaHeight();
  }

  adjustTextareaHeight() {
    const elem = $(this.node).find('textarea');
    elem.style.height = '1px';
    elem.style.height = `${elem.scrollHeight}px`;
  }

  handleTextareaKeydown(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      const update = {
        type: 'Note',
        source: Meteor.userId(),
        message: 'left a note :',
        note: event.target.value,
      };
      Meteor.call(this.method, this.id, update);
      event.target.value = '';
      this.adjustTextareaHeight();
    }
  }

  render() {
    return (
      <div
        ref={node => this.node = node}
        className="mentionable"
        data-toggle="dropdown"
      >
        <textarea
          className="latest-updates-input"
          placeholder="Leave a note..."
          onKeyDown={this.handleTextareaKeydown}
          onInput={this.adjustTextareaHeight}
        />
        <ul className="dropdown-menu">
          <li/>
        </ul>
      </div>
    );
  }
}

MentionField.propTypes = {

  valueUpdateCallback: React.PropTypes.func.isRequired,
};

const MentionFieldContainer = createContainer((props) => {
  const branch = Meteor.subscribe('branch.active');
  const loading = !branch.ready();
  const users = Meteor.users.find({}).fetch();
  return {
    loading,
    users,
  };
}, MentionField);

export default MentionFieldContainer;
