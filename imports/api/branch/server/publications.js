import { Meteor } from 'meteor/meteor';
import { Offices } from '../../offices/offices';
import { Customers } from '../../customers/customers';
import { Quotes } from '../../quotes/quotes';
import { Shipments } from '../../shipments/shipments';
import { Invoices } from '../../invoices/invoices-collection';
import { Jobs } from '../../jobs/jobs';

Meteor.publish('branch.active', function publishBranchActive() {
  const cursors = [];
  if (this.userId) {
    cursors.push(Offices.find());
    cursors.push(Customers.find({}, { limit: 10 }));
    cursors.push(Quotes.find());
    cursors.push(Shipments.find());
    cursors.push(Invoices.find());
    cursors.push(Jobs.find());
    cursors.push(Meteor.users.find({}, { fields: { profile: 1, emails: 1 } }));
  }
  return cursors;
});
