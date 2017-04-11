import { Meteor } from 'meteor/meteor';
import { Offices } from '../../../api/offices/offices';
import { Customers } from '../../../api/customers/customers';
import { Quotes } from '../../../api/quotes/quotes';
import { Jobs } from '../../../api/jobs/jobs';
import { Shipments } from '../../../api/shipments/shipments';

import quoteFixtures from './quote-fixtures';
import shipmentFixtures from './shipment-fixtures';

// if the database is empty on server start, create some sample data.
Meteor.startup(() => {
  console.log(Meteor.settings);
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
    const customerFixtures = [
      {
        customerCode: '1',
        name: 'Alstom Power Boilers Limited',
        address: `Jubilee Hills
Hyderabad, Telangana, 500033
India`,
        properties: `Customer - Existing
INHYD`,
        quotes: [],
        shipments: [],
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
        name: 'Cellmid Limited',
        address: `Suite 1802, Level 18
Sydney, New South Wales 2000
Australia`,
        properties: `Customer - Existing
AUSYD`,
        quotes: [],
        shipments: [],
        activeQuotes: ['3'],
        activeJobs: ['2'],
        credit: {
          currency: 'AUD',
          total: 200000,
          used: 180000,
        },
      },
      {
        customerCode: '3',
        name: 'Presspart Manufacturing Ltd.',
        address: `Whitebirk Ind Est.
Blackburn, Lancashire
BB1 5RF
United Kingdom`,
        properties: `Customer - Existing
GBLAN`,
        quotes: [],
        shipments: [],
        activeQuotes: ['3'],
        activeJobs: ['2'],
        credit: {
          currency: 'AUD',
          total: 200000,
          used: 180000,
        },
      },
    ];
    _.each(customerFixtures, (doc) => {
      const newDoc = doc;
      newDoc.search = `${doc.name}
${doc.address}`;
      Customers.insert(newDoc);
    });

    quoteFixtures.random(50);
    shipmentFixtures.random(20);

    const jobFixtures = [
      {
        jobCode: 'J00000001',
        status: 'Initiated',
        movementType: 'Door to CY', // TODO: Autocalculate in template helper
        quoteCode: 'Q571559',
        netRevenue: '3,291 INR',
        shipper: Customers.findOne({ name: customerFixtures[0].name }, {})._id,
        consignee: Customers.findOne({ name: customerFixtures[1].name }, {})._id,
        incoterm: 'FOB',
        exportOffice: Offices.findOne({ name: officeFixtures[0].name }, {})._id,
        importOffice: Offices.findOne({ name: officeFixtures[1].name }, {})._id,
        cargo: {},
        routing: {},
        operations: {},
        accounting: {},
        contract: 'MyContract',
        carrierBookingConfirmationFile: 'CBC-12392.pdf',
        bookingReference: 'ABC1234',
        mblNumber: 'MAEU12345',
        mblType: 'Waybill',
        mblTerms: 'Prepaid',
        seaquestType: 'Original',
        numOriginals: 3,
        detention: '',
        demurrage: '',
        originHaulageBy: 'Customer',
        originCustomsBy: 'Customer',
        destinationHaulageBy: '',
        destinationCustomsBy: '',
      },
    ];
    _.each(jobFixtures, doc => Jobs.insert(doc));
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