/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

import { chai } from 'meteor/practicalmeteor:chai';

import { smartHighlight } from './smart-highlight';

describe('Smart Highlight', function () {
  it(`finds 'S' in 'Shanghai'`, function () {
    chai.assert.equal(smartHighlight('Shanghai', 's'), '<b>S</b>hanghai');
  });

  it(`finds 'united' in United States`, function () {
    chai.assert.equal(smartHighlight('United States', 'united'), '<b>United</b> States');
  });
});
