import { Meteor } from 'meteor/meteor';
import { Customers } from '../../api/customers/customers';
import { Quotes } from '../../api/quotes/quotes';

// if the database is empty on server start, create some sample data.
Meteor.startup(() => {
  // Customers.remove({});
  // Quotes.remove({});
  if (Customers.find().count() === 0) {
    const customerFixtures = [
      {
        customerCode: '1',
        name: 'Alstom Power Boilers Limited',
        activeQuotes: ['1', '2'],
        activeJobs: ['1'],
        credit: {
          currency: 'INR',
          total: 119000,
          used: 24000,
        },
      },
      {
        customerCode: '2',
        name: 'AIA Engineering Limited',
        activeQuotes: ['3'],
        activeJobs: ['2'],
        credit: {
          currency: 'INR',
          total: 200000,
          used: 180000,
        },
      },
    ];
    _.each(customerFixtures, doc => Customers.insert(doc));
    const quoteFixtures = [
      {
        quoteCode: '1',
        customerId: Customers.findOne({ name: 'Alstom Power Boilers Limited' }, {})._id,
        mode: 'Air',
        type: 'Single Route',
        rateType: 'Rated',
        incoterm: 'FOB',
        status: 'Accepted',
        expiryDate: new Date('22-May-2017'),
      },
      {
        quoteCode: '2',
        customerId: Customers.findOne({ name: 'Alstom Power Boilers Limited' }, {})._id,
      },
      {
        quoteCode: '3',
        customerId: Customers.findOne({ name: 'AIA Engineering Limited' }, {})._id,
      },
    ];
    _.each(quoteFixtures, doc => Quotes.insert(doc));
  }
});
