import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { autoheight } from '../formatters/autoheight';

class MentionField extends React.Component {

  constructor(props) {
    super(props);
    this.handleMentionInput = this.handleMentionInput.bind(this);
    this.handleTextareaKeydown = this.handleTextareaKeydown.bind(this);
  }

  componentDidMount() {
    autoheight(this.textareaNode);
  }

  handleMentionInput() {
    autoheight(this.textareaNode);
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
      this.props.valueUpdateCallback(update);
      event.target.value = '';
      autoheight(this.textareaNode);
    }
  }

  render() {
    return (
      <div
        className="mentionable"
        data-toggle="dropdown"
      >
        <textarea
          ref={node => this.textareaNode = node}
          className="latest-updates-input"
          placeholder="Leave a note..."
          onKeyDown={this.handleTextareaKeydown}
          onInput={this.handleMentionInput}
        />
        <ul className="dropdown-menu">
          <li />
        </ul>
      </div>
    );
  }
}

MentionField.propTypes = {
  valueUpdateCallback: PropTypes.func.isRequired,
};

const MentionFieldContainer = createContainer((props) => {
  const { valueUpdateCallback } = props;
  const branch = Meteor.subscribe('branch.active');
  const loading = !branch.ready();
  const users = Meteor.users.find({}).fetch();
  return {
    loading,
    users,
    valueUpdateCallback,
  };
}, MentionField);

export default MentionFieldContainer;
