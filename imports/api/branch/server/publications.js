import { Meteor } from 'meteor/meteor';
import { Offices } from '../../offices/offices';
import { Customers } from '../../customers/customers';
import { Quotes } from '../../quotes/quotes';
import { Jobs } from '../../jobs/jobs';

Meteor.publish('branch.active', function publishBranchActive() {
  const cursors = [];
  // if (this.userId && this.userId.branch) {
  if (this.userId) {
    // const branch = this.userId.branch;
    // cursors.push(Customers.find({ branch, active: true }));
    // cursors.push(Quotes.find({ branch, active: true }));
    // cursors.push(Jobs.find({ branch, active: true }));
    cursors.push(Offices.find());
    cursors.push(Customers.find({}, { limit: 10 }));
    cursors.push(Quotes.find());
    cursors.push(Jobs.find());
  }
  return cursors;
});
