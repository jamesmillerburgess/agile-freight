import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

import { Branches } from '../../../api/branch/branchCollection';
import { Offices } from '../../../api/offices/offices';
import { Customers } from '../../../api/customers/customersCollection';
import { Quotes } from '../../../api/quotes/quotesCollection';

import customerFixtures from './customer-fixtures';

// if the database is empty on server start, create some sample data.
Meteor.startup(() => {
  console.log(Meteor.settings);
  if (Meteor.settings.reset) {
    Offices.remove({});
    Offices._ensureIndex({ search: 1 });

    Branches.remove({});
    Branches.insert({ name: 'Basel' });

    Customers.remove({});
    Customers._ensureIndex({ search: 1 });

    Quotes.remove({});
    
    Meteor.users.remove({});
    Accounts.createUser({
      username: 'user',
      email: 'user@example.com',
      password: 'user',
      profile: {
        admin: false,
        branch: Branches.findOne({ name: 'Basel' })._id,
        name: 'James Burgess',
        address: `Beim Goldenen Loewen 16
4052 Basel
Switzerland`,
      },
    });
    Accounts.createUser({
      username: 'admin',
      email: 'admin@example.com',
      password: 'admin',
      profile: {
        admin: true,
        branch: Branches.findOne({ name: 'Basel' })._id,
        name: 'James Burgess',
        address: `Beim Goldenen Loewen 16
4052 Basel
Switzerland`,
      },
    });
  }

  if (Meteor.settings.testMode === 'structure' && Customers.find().count() === 0) {
    const officeFixtures = [
      {
        name: 'Bangalore',
        address: 'India',
      },
      {
        name: 'Thurrock',
        address: 'United Kingdom',
      },
    ];
    _.each(officeFixtures, (doc) => {
      const newDoc = doc;
      newDoc.search = `${doc.name}
${doc.address}`;
      Offices.insert(newDoc);
    });
    customerFixtures.random(15);
  }

  if (Meteor.settings.testMode === 'load' && Customers.find().count() === 0) {
    console.log('Loading fixtures for load testing');
    const customerFixtures = [];
    for (let i = 0; i < 10000; i += 1) {
      customerFixtures.push({
        customerCode: '1',
        name: `Alstom Power Boilers Limited ${i}`,
        address: `Jubilee Hills
Hyderabad, Telangana, 500033
India`,
        search: `Alstom Power Boilers Limited
Jubilee Hills
Hyderabad, Telangana, 500033
India
Customer - Existing
INHYD`,
        properties: `Customer - Existing
INHYD`,
        activeQuotes: ['1', '2'],
        activeJobs: ['1'],
        credit: {
          currency: 'INR',
          total: 119000,
          used: 24000,
        },
      });
    }
    console.log('Inserting 10k customers');
    _.each(customerFixtures, doc => Customers.insert(doc));
    console.log('Done inserting');
  }
});
