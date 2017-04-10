import { Meteor } from 'meteor/meteor';
import moment from 'moment';
import { APIGlobals } from '../../../api/api-globals';
import { Customers } from '../../../api/customers/customers';
import { Quotes } from '../../../api/quotes/quotes';

export default class shipmentFixtures {

  // Inserts the specified number of random quotes into the collection
  static random(num = 1) {
    const newShipments = [];

    // Pre-fetch these guys so we don't do it over and over in the loop
    const customers = Customers.find().fetch();
    const quotes = Quotes.find().fetch();
    const users = Meteor.users.find().fetch();

    for (let i = 0; i < num; i += 1) {
      const rand = Math.random();

      // Set all the properties that have no dependencies
      const shipment = {
        shipmentCode: `S${Math.floor(rand * (900000 - 100000)) + 100000}`,
        customerId: _.sample(customers)._id,
        mode: _.sample(APIGlobals.modeOptions),
        direction: _.sample(APIGlobals.directionOptions),
        incoterm: _.sample(APIGlobals.incotermOptions),
        lastUpdatedBy: _.sample(users)._id,
      };

      // Then work out the values for the properties that have dependencies
      shipment.quoteId = _.sample(Customers.findOne(shipment.customerId).quotes);
      shipment.service = shipment.mode === 'Ocean' ?
        _.sample(APIGlobals.oceanServiceOptions) :
        _.sample(APIGlobals.airServiceOptions);
      if (shipment.rateType === 'Rated') {
        shipment.routes = shipment.type === 'Single Route' ? [
          `${_.sample(APIGlobals.indiaPortOptions)} - ${_.sample(APIGlobals.ukPortOptions)}`,
        ] : [
          `${_.sample(APIGlobals.indiaPortOptions)} - ${_.sample(APIGlobals.ukPortOptions)}`,
          `${_.sample(APIGlobals.indiaPortOptions)} - ${_.sample(APIGlobals.ukPortOptions)}`,
        ];
      } else {
        shipment.routes = shipment.type === 'Single Route' ? [
          `${_.sample(APIGlobals.indiaPortOptions)} - ${_.sample(APIGlobals.ukPortOptions)}`,
        ] : [
          `${_.sample(APIGlobals.indiaPortOptions)} - ${_.sample(APIGlobals.ukPortOptions)}`,
          `${_.sample(APIGlobals.indiaPortOptions)} - ${_.sample(APIGlobals.ukPortOptions)}`,
        ];
      }
      shipment.expiryDate = shipment.status === 'Expired' ?
        moment().subtract(rand * 100, 'days').format() :
        moment().add(rand * 100, 'days').format();

      // Add to the array
      newShipments.push(shipment);
    }

    // Stick them in the collection
    _.each(newShipments, doc => Meteor.call('shipments.new', doc));
  }
}
