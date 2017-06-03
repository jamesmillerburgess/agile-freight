import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import { Quotes } from './quotesCollection';
import { Customers } from '../customers/customers-collection';

Meteor.methods({
  'quote.new': function quoteNew(customerId) {
    check(customerId, String);

    const quoteId = Quotes.insert({ customerId, createdOn: new Date() });

    Customers.update({ _id: customerId }, { $push: { quotes: quoteId } });

    return quoteId;
  },
  'quote.copy': function quoteCopy(quoteId) {
    check(quoteId, String);

    const { customerId, cargo, movement, otherServices } = Quotes.findOne(quoteId);

    const newQuoteId = Quotes.insert({
      customerId,
      cargo,
      movement,
      otherServices,
      charges: {},
      status: 'Draft',
      createdOn: new Date(),
    });

    Customers.update({ _id: customerId }, { $push: { quotes: newQuoteId } });

    return newQuoteId;
  },
  'quote.newFromRateSearch': function quotesNewFromRateSearch(options) {
    check(options, Object);
    check(options.customerId, String);
    check(options.cargo, Object);
    check(options.movement, Object);
    check(options.otherServices, Object);

    // Check if the customerId is valid
    const customer = Customers.findOne(options.customerId);
    if (!customer) {
      throw new Error('Invalid customer ID');
    }

    // Insert quote
    const update  = {
      ...options,
      status: 'Draft',
      charges: [],
    };
    const quoteId = Quotes.insert(update);

    // Update the customer
    Customers.update({ _id: options.customerId }, { $push: { quotes: quoteId } });
    return quoteId;
  },
  'quote.submit': function quoteSubmit(quoteId, email, expiryDate) {
    check(quoteId, String);
    check(email, Object);
    check(expiryDate, String);

    const quote = Quotes.findOne(quoteId);
    if (!quote) {
      throw new Error(`No quote exists with quote id ${quoteId}`);
    }
    if (quote.status === 'Submitted' || quote.status === 'Expired') {
      throw new Error('This quote has already been submitted.');
    }
    Quotes.update(
      { _id: quoteId },
      {
        $set: {
          status: 'Submitted',
          email: { ...email, sentDate: new Date() },
          expiryDate: new Date(expiryDate),
        },
      },
    );
  },
  'quote.save': function quoteSave(quote) {
    check(quote, Object);

    Quotes.update(
      { _id: quote._id },
      {
        $set: {
          cargo: quote.cargo,
          movement: quote.movement,
          otherServices: quote.otherServices,
          charges: quote.charges,
          email: quote.email,
        },
      },
    );
  },
  'quote.archive': function quoteArchive(quoteId) {
    check(quoteId, String);

    const quote = Quotes.findOne(quoteId);
    if (!quote) {
      throw new Error('Quote does not exist.');
    }
    if (quote.status !== 'Draft') {
      throw new Error(`This quote's status is '${quote.status}'. Only quotes with status 'Draft' can be archived.`);
    }

    Quotes.update(
      { _id: quoteId },
      {
        $set: {
          status: 'Archived',
        },
      },
    );
  },
});
