import { Meteor } from 'meteor/meteor';

export const isFavoriteCustomer =
               customerId => Meteor.user() &&
                             Meteor.user().profile &&
                             Meteor.user().profile.favoriteCustomers &&
                             Meteor.user().profile
                                   .favoriteCustomers
                                   .indexOf(customerId) !== -1;
