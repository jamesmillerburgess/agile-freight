import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';

import { Branches } from './branchCollection';

const branchNew = (options) => {
  check(options, {
    name: Match.Maybe(String),
  });
  return Branches.insert({ ...options });
};

const branchSave = (branchId, options) => {
  check(branchId, String);
  check(options, {
    name: Match.Maybe(String),
  });
  Branches.update({ _id: branchId }, { $set: options });
};

Meteor.methods({
  'branch.new': branchNew,
  'branch.save': branchSave,
});
