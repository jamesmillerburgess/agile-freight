import { Meteor } from 'meteor/meteor';
import { Customers } from '../../customers/customers-collection';
import { Countries } from '../../countries/countries-collection';
import { CustomerQuotes } from '../../customerQuotes/customerQuotesCollection';

Meteor.publish('branch.active', function publishBranchActive() {
  const cursors = [];
  if (this.userId) {
    cursors.push(Customers.find({}, { limit: 10 }));
    cursors.push(Meteor.users.find({}, { fields: { profile: 1, emails: 1 } }));
    cursors.push(Countries.find());
    cursors.push(CustomerQuotes.find());
  }
  return cursors;
});
