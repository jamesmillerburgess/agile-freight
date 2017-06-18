import { isFavoriteCustomer } from '../users/userUtils';

export const sortCustomers = (a, b) => {
  if (isFavoriteCustomer(a._id)) {
    return -1;
  }

  if (isFavoriteCustomer(b._id)) {
    return 1;
  }

  return 0;
};