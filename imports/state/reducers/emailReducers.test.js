/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';
import { chai } from 'meteor/practicalmeteor:chai';
import deepFreeze from 'deep-freeze';

import * as emailReducers from './emailReducers';
import * as ACTION_TYPES from '../actions/actionTypes';

if (Meteor.isClient) {
  describe('Email Reducers', () => {
    chai.should();
    const { email } = emailReducers;

    it('defaults initial values', () => {
      const stateAfter = email();

      stateAfter.isOpen.should.equal(false);
      stateAfter.to.should.equal('');
      stateAfter.cc.should.equal('');
      stateAfter.subject.should.equal('');
      stateAfter.message.should.equal('');
    });

    it('loads the email portion of a quote', () => {
      const action = {
        type: ACTION_TYPES.LOAD_QUOTE,
        quote: {
          email: {
            isOpen: true,
            to: 'a',
            cc: 'b',
            subject: 'c',
            message: 'd',
          },
        },
      };
      const stateAfter = email({}, action);

      stateAfter.isOpen.should.equal(true);
      stateAfter.to.should.equal('a');
      stateAfter.cc.should.equal('b');
      stateAfter.subject.should.equal('c');
      stateAfter.message.should.equal('d');
    });

    it('loads an email object', () => {
      const action     = {
        type: ACTION_TYPES.LOAD_EMAIL,
        email: {
          isOpen: true,
          to: 'a',
          cc: 'b',
          subject: 'c',
          message: 'd',
        },
      };
      const stateAfter = email({}, action);

      stateAfter.isOpen.should.equal(true);
      stateAfter.to.should.equal('a');
      stateAfter.cc.should.equal('b');
      stateAfter.subject.should.equal('c');
      stateAfter.message.should.equal('d');
    });

    it('sets open', () => {
      const stateBefore = { isOpen: false };
      const action      = { type: ACTION_TYPES.SET_EMAIL_IS_OPEN, isOpen: true };
      deepFreeze(stateBefore);
      const stateAfter = email(stateBefore, action);

      stateAfter.isOpen.should.equal(true);
    });

    it('sets to', () => {
      const stateBefore = { to: 'a' };
      const action      = { type: ACTION_TYPES.SET_EMAIL_TO, to: 'b' };
      deepFreeze(stateBefore);
      const stateAfter = email(stateBefore, action);

      stateAfter.to.should.equal('b');
    });

    it('sets cc', () => {
      const stateBefore = { cc: 'a' };
      const action      = { type: ACTION_TYPES.SET_EMAIL_CC, cc: 'b' };
      deepFreeze(stateBefore);
      const stateAfter = email(stateBefore, action);

      stateAfter.cc.should.equal('b');
    });

    it('sets subject', () => {
      const stateBefore = { subject: 'a' };
      const action      = { type: ACTION_TYPES.SET_EMAIL_SUBJECT, subject: 'b' };
      deepFreeze(stateBefore);
      const stateAfter = email(stateBefore, action);

      stateAfter.subject.should.equal('b');
    });

    it('sets message', () => {
      const stateBefore = { message: 'a' };
      const action      = { type: ACTION_TYPES.SET_EMAIL_MESSAGE, message: 'b' };
      deepFreeze(stateBefore);
      const stateAfter = email(stateBefore, action);

      stateAfter.message.should.equal('b');
    });
  });
}

