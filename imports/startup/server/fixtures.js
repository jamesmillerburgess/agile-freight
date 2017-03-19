import { Meteor } from 'meteor/meteor';
import { Customers } from '../../api/customers/customers';
import { Quotes } from '../../api/quotes/quotes';
import { Jobs } from '../../api/jobs/jobs';

// if the database is empty on server start, create some sample data.
Meteor.startup(() => {
  // Customers.remove({});
  // Quotes.remove({});
  // Jobs.remove({});
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
        customerId: Customers.findOne({ name: 'AIA Engineering Limited' }, {})._id,
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
        shipper: 'Alstom Power Boilers Limited',
        consignee: 'Presspart Manufacturing Ltd',
        incoterm: 'FOB',
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
