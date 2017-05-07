import { Meteor } from 'meteor/meteor';
import moment from 'moment';

import { APIGlobals } from '../../../api/api-globals';
import { Customers } from '../../../api/customers/customers-collection';
import { Shipments } from '../../../api/shipments/shipments';

export default class invoiceFixtures {

  // Inserts the specified number of random quotes into the collection
  static random(num = 1) {
    const newInvoices = [];

    // Pre-fetch these guys so we don't do it over and over in the loop
    const customers = Customers.find().fetch();
    const users = Meteor.users.find().fetch();
    const shipments = Shipments.find().fetch();

    for (let i = 0; i < num; i += 1) {
      const rand = Math.random();

      // Set all the properties that have no dependencies
      const invoice = {
        invoiceCode: `I${Math.floor(rand * (900000 - 100000)) + 100000}`,
        customerId: _.sample(customers)._id,
        status: _.sample(APIGlobals.invoiceStatusOptions),
        amount: Math.floor(rand * (100000 - 20000)) + 10000,
        currency: 'INR',
        issuedDate: moment().subtract((rand - 0.5) * 100, 'days').format(),
        issuedBy: _.sample(users)._id,
      };

      // Then work out the values for the properties that have dependencies
      invoice.shipments = [(_.sample(shipments)._id)];
      if (rand > 0.5) {
        invoice.shipments.push(_.sample(shipments)._id);
      }

      // Add to the array
      newInvoices.push(invoice);
    }

    // Stick them in the collection
    _.each(newInvoices, doc => Meteor.call('invoices.new', doc));
  }
}
