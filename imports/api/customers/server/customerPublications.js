import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import { Customers } from '../customers-collection';
import { Quotes } from '../../quotes/quotesCollection';
import { UNLocations } from '../../unlocations/unlocationsCollection';

import { uniqueValues } from '../../../ui/statsUtils';

Meteor.publish('customers.deepCustomer', (id = '') => {
  check(id, String);

  const customer = Customers.findOne(id);
  if (!customer) {
    return null;
  }
  const quotes      = Quotes
    .find({ _id: { $in: Customers.findOne(id).quotes } })
    .fetch();
  const locationIds = [
    ...uniqueValues(quotes, 'movement.pickup.location'),
    ...uniqueValues(quotes, 'movement.delivery.location'),
  ];
  return [
    Customers.find({ _id: id }),
    Quotes.find({ _id: { $in: Customers.findOne(id).quotes } }),
    UNLocations.find({ _id: { $in: locationIds } }),
  ];
});
