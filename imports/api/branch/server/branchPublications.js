import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Branches } from '../branchCollection';
import { Customers } from '../../customers/customersCollection';
import { Countries } from '../../countries/countriesCollection';
import { Quotes } from '../../quotes/quotesCollection';
import { UNLocations } from '../../unlocations/unlocationsCollection';
import { Rates } from '../../rates/rateCollection';
import { Shipments } from '../../shipments/shipmentsCollection';

const publishBranchAll = () => Branches.find({});

Meteor.publish('branch.all', publishBranchAll);

Meteor.publish('branch.active', function publishBranchActive() {
  const cursors = [];
  if (this.userId) {
    cursors.push(Customers.find({}));
    cursors.push(Meteor.users.find({}, { fields: { profile: 1, emails: 1 } }));
    cursors.push(Countries.find());
    cursors.push(Quotes.find());
    cursors.push(Rates.find());
    cursors.push(Shipments.find());
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
    cursors.push(UNLocations.find({ _id: { $in: locationIds } }));
  }
  return cursors;
});
