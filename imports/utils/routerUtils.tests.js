/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';
import { chai } from 'meteor/practicalmeteor:chai';
import deepFreeze from 'deep-freeze';

import routerUtils from './routerUtils';

if (Meteor.isClient) {
  describe('Router Utilities', () => {
    chai.should();

    describe('isSameParamsAsPrev', () => {
      const { isSameParamsAsPrev } = routerUtils;
      it('returns true if all params are equal', () => {
        const props = {
          history: { location: { state: { prevParams: { a: '1', b: '2' } } } },
          match: { params: { a: '1', b: '2' } },
        };
        deepFreeze(props);
        isSameParamsAsPrev(props).should.equal(true);
      });
      it('returns false if the params have different values', () => {
        const props = {
          history: { location: { state: { prevParams: { a: '1' } } } },
          match: { params: { a: '2' } },
        };
        isSameParamsAsPrev(props).should.equal(false);
      });
      it('returns false if there is a different number of params', () => {
        const props = {
          history: { location: { state: { prevParams: { a: '1' } } } },
          match: { params: { a: '1', b: '2' } },
        };
        isSameParamsAsPrev(props).should.equal(false);
        props.history.location.state.prevParams = { a: '1', b: '2', c: '3' };
        isSameParamsAsPrev(props).should.equal(false);
      });
      it('returns false if there is a different set of params', () => {
        const props = {
          history: { location: { state: { prevParams: { a: '1' } } } },
          match: { params: { b: '1' } },
        };
        isSameParamsAsPrev(props).should.equal(false);
      });
      it('returns false if the params are missing', () => {
        const props = {
          history: { location: { state: { prevParams: null } } },
          match: { params: { a: '1', b: '2' } },
        };
        isSameParamsAsPrev(props).should.equal(false);
        props.history.location.state.prevParams = { a: '1', b: '2', c: '3' };
        props.match.params = null;
        isSameParamsAsPrev(props).should.equal(false);
        props.history = null;
        isSameParamsAsPrev(props).should.equal(false);
      });
    });
  });
}
