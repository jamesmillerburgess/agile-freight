import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import { Quotes } from './quotes-collection';
import { Customers } from '../customers/customers';

import { updateCargo } from '../cargo/cargo-utils';

// const updateCargo = (cargo) => {
//   const { descriptionOfGoods, packageLines } = cargo;
//   return {
//     descriptionOfGoods,
//     packageLines,
//     totalPackages: packageLines.reduce((acc, val) => acc + (val.num || 0), 0),
//     totalPackageType: packageLines.reduce((acc, val) => {
//       if (val.type !== '' && val.type) {
//         if (acc === '' || acc === val.type) {
//           return val.type;
//         }
//         return 'Mixed Types';
//       }
//       return acc;
//     }, ''),
//     totalGrossWeight: packageLines.reduce((acc, val) => acc + (val.grossWeight || 0), 0),
//     totalVolume: packageLines.reduce((acc, val) => acc + (val.volume || 0), 0),
//   };
// };

const updateQuote = (query, update) => {
  Quotes.update(query, update);
  const quote = Quotes.findOne(query);

  // Update cargo
  const cargo = updateCargo(quote.cargo);
  // const packageLines = quote.cargo.packageLines;
  // const totalPackages = packageLines.reduce((acc, val) => acc + (val.num || 0), 0);
  // const totalPackageType = packageLines.reduce((acc, val) => {
  //   if (val.type !== '' && val.type) {
  //     if (acc === '' || acc === val.type) {
  //       return val.type;
  //     }
  //     return 'Mixed Types';
  //   }
  //   return acc;
  // }, '');
  // const totalGrossWeight = packageLines.reduce((acc, val) => acc + (val.grossWeight || 0), 0);
  // const totalVolume = packageLines.reduce((acc, val) => acc + (val.volume || 0), 0);

  // Update charge totals
  const chargeLines = quote.charges.chargeLines.map((val) => {
    const newVal = {
      description: val.description || '',
      rate: {
        amount: val.rate ? val.rate.amount || 0 : 0,
        currency: val.rate ? val.rate.currency || '' : '',
        unit: val.rate ? val.rate.unit || '' : '',
      },
      units: val.units || '',
      amount: (val.rate ? val.rate.amount || 0 : 0) * (val.units || 0),
      currency: val.rate ? val.rate.currency || '' : '',
    };
    return newVal;
  });
  const totalAmount = chargeLines.reduce((acc, val) => acc + val.amount, 0);
  const totalCurrency = chargeLines.reduce((acc, val) => {
    if (val.currency !== '' && val.currency) {
      if (acc === '' || acc === val.currency) {
        return val.currency;
      }
      return 'N/A';
    }
    return acc;
  }, '');

  const newUpdate = {
    $set: {
      // 'cargo.totalPackages': totalPackages,
      // 'cargo.totalPackageType': totalPackageType,
      // 'cargo.totalGrossWeight': totalGrossWeight,
      // 'cargo.totalVolume': totalVolume,
      cargo,
      'charges.chargeLines': chargeLines,
      'charges.totalAmount': totalAmount,
      'charges.totalCurrency': totalCurrency,
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

    const query = { _id: quoteId };
    updateQuote(query, {});
    return quoteId;
  },
  'quote.newDraft': function quoteNewDraftMethod(customerId) {
    check(customerId, String);

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
      customerId,
      cargo,
      charges,
      agilityContact,
    };

    return Meteor.call('quotes.new', update);
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
