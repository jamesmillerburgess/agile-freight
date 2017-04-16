import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import { Quotes } from './quotes';
import { Customers } from '../customers/customers';

const updateQuote = (query, update) => {
  Quotes.update(query, update);
  const quote = Quotes.findOne(query);

  // Update package totals
  const packageLines = quote.cargo.packageLines;
  quote.cargo.totalPackages = packageLines.reduce((acc, val) => acc + (val.num || 0), 0);
  quote.cargo.totalPackageType = packageLines.reduce((acc, val) => {
    if (val.type !== '' && val.type) {
      if (acc === '' || acc === val.type) {
        return val.type;
      }
      return 'Mixed Types';
    }
    return acc;
  }, '');
  quote.cargo.totalGrossWeight = packageLines.reduce((acc, val) => acc + (val.grossWeight || 0), 0);
  quote.cargo.totalVolume = packageLines.reduce((acc, val) => acc + (val.volume || 0), 0);

  const newUpdate = {
    $set: {
      'cargo.totalPackages': quote.cargo.totalPackages,
      'cargo.totalPackageType': quote.cargo.totalPackageType,
      'cargo.totalGrossWeight': quote.cargo.totalGrossWeight,
      'cargo.totalVolume': quote.cargo.totalVolume,
    },
  };

  return Quotes.update(query, newUpdate);
};

Meteor.methods({
  'quotes.new': function quotesNewMethod(options) {
    // Check the parameters
    check(options, Object);

    // Insert the new quote and grab the ID
    const quoteId = Quotes.insert(options);

    const { customerId } = options;

    Customers.update({ _id: customerId }, { $push: { quotes: quoteId } });

    return quoteId;
  },
  'quote.newDraft': function quoteNewDraftMethod(customerId) {
    check(customerId, String);

    return Meteor.call('quotes.new', { customerId });
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
    const quote = Quotes.findOne(query);
    quote.cargo.packageLines.push({});

    // Update the job
    updateQuote(query, { $set: { cargo: quote.cargo } });
  },
  'quote.removePackageLine': function removePackageLine(quoteId, index) {
    check(quoteId, String);
    check(index, Number);

    const quote = Quotes.findOne(quoteId);

    if (index >= quote.cargo.packageLines.length) {
      return;
    }
    quote.cargo.packageLines.splice(index, 1);

    const newPackageLines = quote.cargo.packageLines;
    const query = { _id: quoteId };
    const update = {
      $set: {
        'cargo.packageLines': newPackageLines,
      },
    };

    updateQuote(query, update);
  },
  'quote.updateCargo': function quoteUpdateCargo(quoteId, cargo) {
    check(quoteId, String);
    check(cargo, Object);

    Quotes.update({ _id: quoteId }, { $set: { cargo } });
  },
});
