/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

import { chai } from 'meteor/practicalmeteor:chai';

import * as numberFormatters from './numberFormatters';

chai.should();

describe('Number Formatters', () => {
  describe('Currency Formatter', () => {
    const { currencyFormat } = numberFormatters;

    it('defaults to \'0.00\' if nothing is passed', () => {
      currencyFormat().should.equal('0.00');
    });

    it('returns maximum two decimal places', () => {
      currencyFormat(0.123).should.equal('0.12');
    });

    it('returns minimum two decimal places', () => {
      currencyFormat(123).should.equal('123.00');
    });

    it('inserts commas every three digits', () => {
      currencyFormat(123456789).should.equal('123,456,789.00');
    });

    it('rounds', () => {
      currencyFormat(0.004).should.equal('0.00');
      currencyFormat(0.005).should.equal('0.01');
      currencyFormat(0.00499999999).should.equal('0.00');
    });
  });

  describe('Weight Formatter', () => {
    const { weightFormat } = numberFormatters;

    it('defaults to \'0\' if nothing is passed', () => {
      weightFormat().should.equal('0');
    });

    it('returns maximum three decimal places', () => {
      weightFormat(0.1234).should.equal('0.123');
    });

    it('returns minimum zero decimal places', () => {
      weightFormat(123).should.equal('123');
    });

    it('inserts commas every three digits', () => {
      weightFormat(123456789).should.equal('123,456,789');
    });

    it('rounds', () => {
      weightFormat(0.0004).should.equal('0');
      weightFormat(0.0005).should.equal('0.001');
      weightFormat(0.000499999999).should.equal('0');
    });
  });

  describe('Integer Formatter', () => {
    const { integerFormat } = numberFormatters;

    it('defaults to \'0\' if nothing is passed', () => {
      integerFormat().should.equal('0');
    });

    it('returns zero decimal places', () => {
      integerFormat(0.1234).should.equal('0');
    });

    it('inserts commas every three digits', () => {
      integerFormat(123456789).should.equal('123,456,789');
    });

    it('rounds', () => {
      integerFormat(0.4).should.equal('0');
      integerFormat(0.5).should.equal('1');
      integerFormat(0.499999999).should.equal('0');
    });
  });
});

