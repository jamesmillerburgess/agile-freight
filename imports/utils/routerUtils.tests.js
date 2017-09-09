/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';
import { chai } from 'meteor/practicalmeteor:chai';

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
      it("returns false if the action is 'POP' (browser refresh)", () => {
        const props = {
          history: {
            action: 'POP',
            location: { state: { prevParams: { a: '1', b: '2' } } },
          },
          match: { params: { a: '1', b: '2' } },
        };
        isSameParamsAsPrev(props).should.equal(false);
      });
    });
    describe('buildShipmentLink', () => {
      const { buildShipmentLink } = routerUtils;
      it('builds the url for operations', () => {
        const url = '/customers/view/a/shipments/b/operations';
        buildShipmentLink('a', 'b', 'operations').should.equal(url);
      });
      it('builds the url for accounting', () => {
        const url = '/customers/view/a/shipments/b/accounting';
        buildShipmentLink('a', 'b', 'accounting').should.equal(url);
      });
      it('drops invalid tabs', () => {
        const url = '/customers/view/a/shipments/b';
        buildShipmentLink('a', 'b', 'invalidTab').should.equal(url);
      });
    });
  });
}
