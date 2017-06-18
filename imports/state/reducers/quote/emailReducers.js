import * as ACTION_TYPES from '../../actions/actionTypes';
import { changeProp } from '../reducer-utils';

const emailDefaultState = {
  isOpen: false,
  to: '',
  cc: '',
  subject: '',
  message: '',
};

export const email = (state = emailDefaultState, action = { type: '' }) => {
  let newState = {};
  switch (action.type) {
    case ACTION_TYPES.LOAD_QUOTE:
      newState = action.quote.email || emailDefaultState;
      break;
    case ACTION_TYPES.LOAD_EMAIL:
      newState = action.email;
      break;
    case ACTION_TYPES.SET_EMAIL_IS_OPEN:
      newState = changeProp(state, 'isOpen', action.isOpen);
      break;
    case ACTION_TYPES.SET_EMAIL_TO:
      newState = changeProp(state, 'to', action.to);
      break;
    case ACTION_TYPES.SET_EMAIL_CC:
      newState = changeProp(state, 'cc', action.cc);
      break;
    case ACTION_TYPES.SET_EMAIL_SUBJECT:
      newState = changeProp(state, 'subject', action.subject);
      break;
    case ACTION_TYPES.SET_EMAIL_MESSAGE:
      newState = changeProp(state, 'message', action.message);
      break;
    default:
      newState = state;
  }
  return newState;
};
