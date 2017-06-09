import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import { Branches } from './branchCollection';

Meteor.methods({
  'branch.new': function branchNewMethod(options) {
    check(options, {
      name: String,
    });
    return Branches.insert({ ...options });
  },
});
