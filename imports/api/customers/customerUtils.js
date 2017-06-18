import { isFavoriteCustomer } from '../users/userUtils';

export const compareCustomers = (a, b, user) => {
  const aFav = isFavoriteCustomer(a._id, user);
  const bFav = isFavoriteCustomer(b._id, user);
  if (aFav && bFav) {
    return 0;
  }

  if (aFav) {
    return -1;
  }

  if (bFav) {
    return 1;
  }

  return 0;
};
