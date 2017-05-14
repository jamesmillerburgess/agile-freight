import { makeActionCreator } from './action-utils';
import * as ACTION_TYPES from './actionTypes';

// CARGO
export const loadEmail       = makeActionCreator(ACTION_TYPES.LOAD_EMAIL, 'email');
export const setEmailTo      = makeActionCreator(ACTION_TYPES.SET_EMAIL_TO, 'to');
export const setEmailCC      = makeActionCreator(ACTION_TYPES.SET_EMAIL_CC, 'cc');
export const setEmailSubject = makeActionCreator(ACTION_TYPES.SET_EMAIL_SUBJECT, 'subject');
export const setEmailMessage = makeActionCreator(ACTION_TYPES.SET_EMAIL_MESSAGE, 'message');
