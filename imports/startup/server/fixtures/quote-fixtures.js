import { Meteor } from 'meteor/meteor';
import moment from 'moment';
import { APIGlobals } from '../../../api/api-globals';
import { Customers } from '../../../api/customers/customers-collection';

export default class quoteFixtures {

  // Inserts the specified number of random quotes into the collection
  static random(num = 1) {
    const newQuotes = [];

    // Pre-fetch these guys so we don't do it over and over in the loop
    const customers = Customers.find().fetch();
    const users = Meteor.users.find().fetch();

    for (let i = 0; i < num; i += 1) {
      const rand = Math.random();

      // Set all the properties that have no dependencies
      const quote = {
        customerId: _.sample(customers)._id,
        mode: _.sample(APIGlobals.modeOptions),
        type: _.sample(APIGlobals.quoteTypeOptions),
        rateType: _.sample(APIGlobals.quoteRateTypeOptions),
        cargo: {
          descriptionOfGoods: '',
          packageLines: [{}],
        },
        rates: [
          {
            type: '20\' DC', // TODO: Randomize
            rate: Math.floor(rand * (50000 - 10000)) + 10000,
            currency: 'INR', // TODO: Base on customer
          },
          {
            type: '40\' DC', // TODO: Randomize
            rate: Math.floor(rand * (100000 - 20000)) + 10000,
            currency: 'INR', // TODO: Base on customer
          },
        ],
        direction: _.sample(APIGlobals.directionOptions),
        incoterm: _.sample(APIGlobals.incotermOptions),
        status: _.sample(APIGlobals.quoteStatusOptions),
        shipments: [],
        issuedBy: _.sample(users)._id,
      };

      // Then work out the values for the properties that have dependencies
      quote.service = quote.mode === 'Ocean' ?
        _.sample(APIGlobals.oceanServiceOptions) :
        _.sample(APIGlobals.airServiceOptions);
      if (quote.rateType === 'Rated') {
        quote.routes = quote.type === 'Single Route' ? [
          {
            collectionFrom: _.sample(APIGlobals.indiaPortOptions),
            deliveryTo: _.sample(APIGlobals.ukPortOptions),
          },
        ] : [
          {
            collectionFrom: _.sample(APIGlobals.indiaPortOptions),
            deliveryTo: _.sample(APIGlobals.ukPortOptions),
          },
          {
            collectionFrom: _.sample(APIGlobals.indiaPortOptions),
            deliveryTo: _.sample(APIGlobals.ukPortOptions),
          },
        ];
      } else {
        quote.routes = quote.type === 'Single Route' ? [
          {
            collectionFrom: _.sample(APIGlobals.indiaPortOptions),
            deliveryTo: _.sample(APIGlobals.ukPortOptions),
          },
        ] : [
          {
            collectionFrom: _.sample(APIGlobals.indiaPortOptions),
            deliveryTo: _.sample(APIGlobals.ukPortOptions),
          },
        ];
      }
      quote.validThrough = quote.status === 'Expired' ?
        moment().subtract(rand * 600, 'days').format() :
        moment().add(rand * 100, 'days').format();

      // Add to the array
      newQuotes.push(quote);
    }

    // Stick them in the collection
    _.each(newQuotes, doc => Meteor.call('quotes.new', doc));
  }
}
