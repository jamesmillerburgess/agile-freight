import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import { Quotes } from './quotesCollection';
import { Customers } from '../customers/customersCollection';
import { Branches } from '../branch/branchCollection';

const quoteNew = customerId => {
  check(customerId, String);

  const { currency, branch } = Customers.findOne(customerId);

  const quoteId = Quotes.insert({
    customerId,
    createdOn: new Date(),
    charges: { currency },
    status: 'Draft',
    reference: Meteor.call('branch.nextReference', branch),
    branch,
  });

  Customers.update(customerId, { $push: { quotes: quoteId } });
  Branches.update(branch, {
    $push: { references: { type: 'Quote', reference: quoteId } },
  });

  return quoteId;
};

const quoteCopy = quoteId => {
  check(quoteId, String);
  const {
    customerId,
    cargo,
    movement,
    charges,
    otherServices,
  } = Quotes.findOne(quoteId);

  const { branch } = Customers.findOne(customerId);

  const newQuoteId = Quotes.insert({
    customerId,
    cargo,
    movement,
    otherServices,
    charges,
    status: 'Draft',
    createdOn: new Date(),
    reference: Meteor.call('branch.nextReference', branch),
    branch,
  });

  Customers.update({ _id: customerId }, { $push: { quotes: newQuoteId } });
  Branches.update(branch, {
    $push: { references: { type: 'Quote', reference: newQuoteId } },
  });
  return newQuoteId;
};

const quoteSubmit = (quoteId, email, expiryDate) => {
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
};

const quoteSave = quote => {
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
};

const quoteArchive = quoteId => {
  check(quoteId, String);

  const quote = Quotes.findOne(quoteId);
  if (!quote) {
    throw new Error('Quote does not exist.');
  }
  if (quote.status !== 'Draft') {
    throw new Error(
      `This quote's status is '${quote.status}'. Only quotes with status ` +
        "'Draft' can be archived.",
    );
  }

  Quotes.update(
    { _id: quoteId },
    {
      $set: {
        status: 'Archived',
      },
    },
  );
};

Meteor.methods({
  'quote.new': quoteNew,
  'quote.copy': quoteCopy,
  'quote.submit': quoteSubmit,
  'quote.save': quoteSave,
  'quote.archive': quoteArchive,
});
