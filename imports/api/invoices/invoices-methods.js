import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Invoices } from './invoices-collection';
import { Customers } from '../customers/customers-collection';

Meteor.methods({
  'invoices.new': function invoicesNewMethod(options) {
    // Check the parameters
    check(options, Object);

    // Insert the new quote and grab the ID
    const quoteId = Invoices.insert(options);

    const { customerId } = options;

    Customers.update({ _id: customerId }, { $push: { invoices: quoteId } });
  },
  'invoice.issue': function invoiceIssueMethod(invoiceId) {
    // Check the parameters
    check(invoiceId, String);

    Invoices.update({ _id: invoiceId }, { $set: { status: 'Issued' } });

    const invoice = Invoices.findOne(invoiceId);

    // Customers.update({ _id: invoice.customerId }, { $add { }})
  }
});
