import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

import { Offices } from '../../../api/offices/offices';
import { Customers } from '../../../api/customers/customers';
import { Quotes } from '../../../api/quotes/quotes';
import { Jobs } from '../../../api/jobs/jobs';
import { Shipments } from '../../../api/shipments/shipments';

import { Airports } from '../../../api/reference-data/airports/airports-collection';

import customerFixtures from './customer-fixtures';
import quoteFixtures from './quote-fixtures';
import shipmentFixtures from './shipment-fixtures';
import invoiceFixtures from './invoice-fixtures';

// if the database is empty on server start, create some sample data.
Meteor.startup(() => {
  console.log(Meteor.settings);
  console.log(Airports.find({}, { limit: 1 }).fetch());
  if (Meteor.settings.reset) {
    Offices.remove({});
    Offices._ensureIndex({ search: 1 });
    Customers.remove({});
    Customers._ensureIndex({ search: 1 });
    Quotes.remove({});
    Quotes._ensureIndex({ search: 1 });
    Jobs.remove({});
    Jobs._ensureIndex({ search: 1 });
    Shipments.remove({});
    Shipments._ensureIndex({ search: 1 });
    Meteor.users.remove({});
    Accounts.createUser({
      username: 'd',
      email: 'd@d.com',
      password: 'd',
      profile: {
        name: 'default',
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
    quoteFixtures.random(150);
    shipmentFixtures.random(80);
    invoiceFixtures.random(60);
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
