import { Meteor } from 'meteor/meteor';

import { Countries } from '../countriesCollection';

Meteor.publish('countries', () => Countries.find({}));
