import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Customers } from '../customers/customersCollection';
import { Branches } from '../branch/branchCollection';

import { buildSearchRegExp } from '../../ui/searchUtils';

export const stakeholderSearch = options => {
  check(options, Object);
  const query = { name: { $regex: buildSearchRegExp(options.search) } };
  let results = [];
  if (options.fetchCustomers) {
    results = results.concat(...Customers.find(query).fetch());
  }
  if (options.fetchBranches) {
    results = results.concat(...Branches.find(query).fetch());
  }
  return results;
};

Meteor.methods({
  'stakeholder.search': stakeholderSearch,
});
