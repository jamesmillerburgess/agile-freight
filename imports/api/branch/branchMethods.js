import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';

import { Branches } from './branchCollection';

Meteor.methods({
  'branch.new': function branchNewMethod(options) {
    check(options, {
      name: Match.Maybe(String),
    });
    return Branches.insert({ ...options });
  },
  'branch.edit': function branchEditMethod(branchId, options) {
    check(branchId, String);
    check(options, {
      name: Match.Maybe(String),
    });
    Branches.update({ _id: branchId }, { $set: options });
  },
});
