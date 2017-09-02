import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';

import { isFavoriteCustomer } from '../../api/users/userUtils';

const CustomerListItem = ({ customer }) => {
  const favoriteCustomer = e => {
    e.preventDefault();
    Meteor.call('users.favoriteCustomer', Meteor.user()._id, customer._id);
  };

  const unfavoriteCustomer = e => {
    e.preventDefault();
    Meteor.call('users.unfavoriteCustomer', Meteor.user()._id, customer._id);
  };

  return (
    <Link
      to={`/customers/view/${customer._id}/overview`}
      className="list-item panel"
    >
      <div className="title">
        {customer.name}&nbsp;
        {isFavoriteCustomer(customer._id, Meteor.user())
          ? <span
              className="fa fa-fw fa-heart favorite-icon"
              onClick={unfavoriteCustomer}
            />
          : <span
              className="fa fa-fw fa-heart-o favorite-icon"
              onClick={favoriteCustomer}
            />}
      </div>
    </Link>
  );
};

CustomerListItem.propTypes = {
  customer: PropTypes.object.isRequired,
};

export default CustomerListItem;
