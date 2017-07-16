import { set } from 'lodash/fp';
import * as ACTION_TYPES from '../../actions/actionTypes';

const emailDefaultState = {
  isOpen: false,
  to: '',
  cc: '',
  subject: '',
  message: '',
};

export const email = (state = emailDefaultState, action = { type: '' }) => {
  switch (action.type) {
    case ACTION_TYPES.LOAD_QUOTE:
      return action.quote.email || emailDefaultState;
    case ACTION_TYPES.LOAD_EMAIL:
      return action.email;
    case ACTION_TYPES.SET_EMAIL_IS_OPEN:
      return set('isOpen', action.isOpen, state);
    case ACTION_TYPES.SET_EMAIL_TO:
      return set('to', action.to, state);
    case ACTION_TYPES.SET_EMAIL_CC:
      return set('cc', action.cc, state);
    case ACTION_TYPES.SET_EMAIL_SUBJECT:
      return set('subject', action.subject, state);
    case ACTION_TYPES.SET_EMAIL_MESSAGE:
      return set('message', action.message, state);
    default:
      return state;
  }
};
