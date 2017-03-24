import { Meteor } from 'meteor/meteor';
import { Customers } from '../../api/customers/customers';
import { Quotes } from '../../api/quotes/quotes';
import { Jobs } from '../../api/jobs/jobs';

// if the database is empty on server start, create some sample data.
Meteor.startup(() => {

  if (Customers.find().count() === 0) {
    Customers.remove({});
    Customers._ensureIndex({ search: 1 });
    Quotes.remove({});
    Quotes._ensureIndex({ search: 1 });
    Jobs.remove({});
    Jobs._ensureIndex({ search: 1 });

    const customerFixtures = [
      {
        customerCode: '1',
        name: 'Alstom Power Boilers Limited',
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
      },
      {
        customerCode: '2',
        name: 'Cellmid Limited',
        address: `Suite 1802, Level 18
Sydney, New South Wales 2000
Australia`,
        search: `Cellmid Limited
Suite 1802, Level 18
Sydney, New South Wales 2000
Australia
Customer - Existing
AUSYD`,
        properties: `Customer - Existing
AUSYD`,
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
        search: `Presspart Manufacturing Ltd.
Whitebirk Ind Est.
Blackburn, Lancashire
BB1 5RF
United Kingdom
Customer - Existing
GBLAN`,
        properties: `Customer - Existing
GBLAN`,
        activeQuotes: ['3'],
        activeJobs: ['2'],
        credit: {
          currency: 'AUD',
          total: 200000,
          used: 180000,
        },
      },
    ];
    _.each(customerFixtures, doc => Customers.insert(doc));
    const quoteFixtures = [
      {
        quoteCode: 'Q572038',
        customerId: Customers.findOne({ name: 'Alstom Power Boilers Limited' }, {})._id,
        mode: 'Air',
        type: 'Single Route',
        rateType: 'Rated',
        incoterm: 'FOB',
        status: 'Accepted',
        expiryDate: new Date('22-May-2017'),
      },
      {
        quoteCode: 'Q571559',
        customerId: Customers.findOne({ name: 'Alstom Power Boilers Limited' }, {})._id,
        mode: 'Ocean',
        type: 'Route Matrix',
        rateType: 'Rated',
        incoterm: 'CIF',
        status: 'Won +3,291 INR',
        expiryDate: new Date('12-May-2017'),
      },
      {
        quoteCode: '3',
        customerId: Customers.findOne({ name: 'Cellmid Limited' }, {})._id,
        mode: 'Air',
        type: 'Single Route',
        rateType: 'Rated',
        incoterm: 'FOB',
        status: 'Accepted',
        expiryDate: new Date('22-May-2017'),
      },
    ];
    _.each(quoteFixtures, doc => Quotes.insert(doc));
    const jobFixtures = [
      {
        jobCode: 'J201938',
        status: 'Received',
        movementType: 'Door to CY', // TODO: Autocalculate in template helper
        quoteCode: 'Q571559',
        netRevenue: '3,291 INR',
        shipper: 'Alstom Power Boilers Limited',
        shipperId: Customers.findOne({ name: 'Alstom Power Boilers Limited' }, {})._id,
        consignee: 'Presspart Manufacturing Ltd',
        incoterm: 'FOB',
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
});
