export const isFavoriteCustomer =
               (customerId, user) => user &&
                                     user.profile &&
                                     user.profile.favoriteCustomers &&
                                     user.profile.favoriteCustomers
                                         .indexOf(customerId) !== -1;
