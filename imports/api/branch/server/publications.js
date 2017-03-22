import { Meteor } from 'meteor/meteor';
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
    cursors.push(Customers.find());
    cursors.push(Quotes.find());
    cursors.push(Jobs.find());
  }
  return cursors;
});
