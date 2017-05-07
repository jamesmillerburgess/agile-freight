import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import { Quotes } from './quotes-collection';
import { Customers } from '../customers/customers-collection';

import { updateCargo } from '../cargo/cargo-utils';
import { updateCharges } from '../charges/charges-utils';

import { APIGlobals } from '../../api/api-globals';

const updateQuote = (query, update) => {
  Quotes.update(query, update);
  const quote = Quotes.findOne(query);

  let service = quote.service;
  // Update service
  if (quote.mode === 'Air Freight') {
    if (APIGlobals.airServiceOptions.indexOf(quote.service) === -1) {
      service = '';
    }
  }
  if (quote.mode === 'Ocean Freight') {
    if (APIGlobals.oceanServiceOptions.indexOf(quote.service) === -1) {
      service = '';
    }
  }
  if (quote.mode === 'Road Freight') {
    if (APIGlobals.roadServiceOptions.indexOf(quote.service) === -1) {
      service = '';
    }
  }

  // Update cargo
  const cargo = updateCargo(quote.cargo);

  // Update charge totals
  const charges = updateCharges(quote.charges);

  const newUpdate = {
    $set: {
      service,
      cargo,
      charges,
    },
  };

  return Quotes.update(query, newUpdate);
};

Meteor.methods({
  'quote.newFromRateSearch': function quotesNewFromRateSearch(options) {
    check(options, Object);
    check(options.customerId, String);
    check(options.rateParameters, Object);

    const update = { ...options, status: 'Draft' };
    return Quotes.insert(update);
  },
  'quote.new': function quotesNewMethod(options) {
    // Check the parameters
    check(options, Object);

    // Insert the new quote and grab the ID
    const quoteId = Quotes.insert(options);

    const { customerId } = options;

    Customers.update({ _id: customerId }, { $push: { quotes: quoteId } });

    const query = { _id: quoteId };
    updateQuote(query, {});
    return quoteId;
  },
  'quote.newDraft': function quoteNewDraftMethod(customerId) {
    check(customerId, String);

    const mode = 'Air Freight';
    const service = 'Premier';
    const cargo = {
      descriptionOfGoods: '',
      packageLines: [{}],
    };
    const charges = {
      chargeLines: [{}],
    };
    const user = Meteor.user();
    const agilityContact = user.profile ? (`${user.profile.name}
${user.profile.address}`) : '';

    const update = {
      mode,
      service,
      customerId,
      cargo,
      charges,
      agilityContact,
    };

    return Meteor.call('quote.new', update);
  },
  'quote.updateField': function quoteUpdateFieldMethod(quoteId, path, value) {
    // Check the parameters
    check(quoteId, String);
    check(path, String);
    check(value, String);

    // Build the query and update criteria
    const query = { _id: quoteId };
    const update = { $set: { [path]: value } };

    updateQuote(query, update);
  },
  'quote.addPackageLine': function quoteAddPackageLineMethod(quoteId) {
    // Check the parameters
    check(quoteId, String);

    // Build the query and update criteria
    const query = { _id: quoteId };
    const { cargo } = Quotes.findOne(query);
    cargo.packageLines.push({});

    // Update the job
    updateQuote(query, { $set: { cargo } });
  },
  'quote.removePackageLine': function removePackageLine(quoteId, index) {
    check(quoteId, String);
    check(index, Number);

    const { cargo } = Quotes.findOne(quoteId);

    if (index >= cargo.packageLines.length) {
      return;
    }
    cargo.packageLines.splice(index, 1);

    const query = { _id: quoteId };
    const update = { $set: { cargo } };

    updateQuote(query, update);
  },
  'quote.addChargeLine': function addChargeLine(quoteId) {
    // Check the parameters
    check(quoteId, String);

    // Build the query and update criteria
    const query = { _id: quoteId };
    const { charges } = Quotes.findOne(query);
    charges.chargeLines.push({
      description: '',
      rate: { amount: 0, currency: '', unit: '' },
      units: 0,
      amount: 0,
      currency: '',
    });
    const update = { $set: { charges } };

    // Update the job
    updateQuote(query, update);
  },
  'quote.removeChargeLine': function removeChargeLine(quoteId, index) {
    check(quoteId, String);
    check(index, Number);

    const { charges } = Quotes.findOne(quoteId);

    if (index >= charges.chargeLines.length) {
      return;
    }
    charges.chargeLines.splice(index, 1);

    const query = { _id: quoteId };
    const update = { $set: { charges } };

    updateQuote(query, update);
  },
});
