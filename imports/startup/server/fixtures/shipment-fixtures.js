import { Meteor } from 'meteor/meteor';
import moment from 'moment';
import { APIGlobals } from '../../../api/api-globals';
import { Customers } from '../../../api/customers/customers';

export default class shipmentFixtures {

  // Inserts the specified number of random quotes into the collection
  static random(num = 1) {
    const newShipments = [];

    // Pre-fetch these guys so we don't do it over and over in the loop
    const customers = Customers.find().fetch();
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
        status: _.sample(APIGlobals.shipmentStatusOptions),
        totalNetRevenue: Math.floor(rand * (50000 - 10000)) + 10000,
        lastUpdatedBy: _.sample(users)._id,
      };

      // Then work out the values for the properties that have dependencies
      shipment.quoteId = _.sample(Customers.findOne(shipment.customerId).quotes);
      shipment.service = shipment.mode === 'Ocean' ?
        _.sample(APIGlobals.oceanServiceOptions) :
        _.sample(APIGlobals.airServiceOptions);
      shipment.route = [
        `${_.sample(APIGlobals.indiaPortOptions)} - ${_.sample(APIGlobals.ukPortOptions)}`,
      ];
      shipment.cargo = {
        totalPackages: Math.floor(rand * (999 - 1)) + 1,
        totalPackagesType: 'Packages',
        totalGrossWeightKG: Math.floor(rand * (20000 - 50)) + 50,
        totalVolumeCBM: Math.floor(rand * (30 - 1)) + 1,
      };
      shipment.shipperNetRevenue = Math.floor(shipment.totalNetRevenue * rand);
      shipment.consigneeNetRevenue = Math.ceil(shipment.totalNetRevenue * (1 - rand));
      shipment.creationDate = moment().subtract(rand * 600, 'days').format();

      // Add to the array
      newShipments.push(shipment);
    }

    // Stick them in the collection
    _.each(newShipments, doc => Meteor.call('shipments.new', doc));
  }
}
