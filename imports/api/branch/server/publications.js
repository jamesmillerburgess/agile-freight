import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Customers } from '../../customers/customers-collection';
import { Countries } from '../../countries/countries-collection';
import { Quotes } from '../../quotes/quotesCollection';
import { UNLocations } from '../../unlocations/unlocations-collection';

Meteor.publish('branch.active', function publishBranchActive() {
  const cursors = [];
  if (this.userId) {
    cursors.push(Customers.find({}, { limit: 10 }));
    cursors.push(Meteor.users.find({}, { fields: { profile: 1, emails: 1 } }));
    cursors.push(Countries.find());
    cursors.push(Quotes.find());
    const quotes = Quotes.find().fetch();
    const locationIds = [];
    quotes.forEach((quote) => {
      if (quote.movement && quote.movement.pickup && quote.movement.pickup.location) {
        locationIds.push(new Mongo.ObjectID(quote.movement.pickup.location));
      }
      if (quote.movement && quote.movement.delivery && quote.movement.delivery.location) {
        locationIds.push(new Mongo.ObjectID(quote.movement.delivery.location));
      }
    });
    console.log(locationIds);
    cursors.push(UNLocations.find({ _id: { $in: locationIds } }));
  }
  return cursors;
});
