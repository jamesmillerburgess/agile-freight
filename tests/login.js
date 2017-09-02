/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */
// These are Chimp globals
/* globals browser assert server */
function countLists() {
  browser.waitForExist('.list-todo');
  const elements = browser.elements('.list-todo');
  return elements.value.length;
}
describe('list ui', () => {
  beforeEach(() => {
    browser.url('http://localhost:5000');
    // server.call('generateFixtures');
  });
  it('titles the page \'Agile Freight\' @watch', () => {
    expect(browser.getTitle()).to.equal('Agile Freight');
  });
});
