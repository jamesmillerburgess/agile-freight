import { Meteor } from 'meteor/meteor';

import { Countries } from '../countries-collection';

Meteor.publish('countries', () => Countries.find({}));
