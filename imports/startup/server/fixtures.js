import { Meteor } from 'meteor/meteor';
import { Customers } from '../../api/customers/customers';

// if the database is empty on server start, create some sample data.
Meteor.startup(() => {
  if (Customers.find().count() === 0) {
    const customerFixtures = [
      {
        code: 1,
        name: 'Alstom Power Boilers Limited',
        activeQuotes: ['', ''],
        activeJobs: [''],
        credit: {
          currency: 'INR',
          total: 119000,
          used: 24000,
        },
      },
      {
        code: 2,
        name: 'AIA Engineering Limited',
        activeQuotes: [''],
        activeJobs: [''],
        credit: {
          currency: 'INR',
          total: 200000,
          used: 180000,
        },
      },
    ];
    _.each(customerFixtures, doc => Customers.insert(doc));
  }
});
