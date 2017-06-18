import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';

import { isFavoriteCustomer } from '../../api/users/userUtils';

const CustomerListItem = ({ customer, header, history }) => {
  const newQuote = (e) => {
    e.preventDefault();
    Meteor.call(
      'quote.new',
      customer._id,
      (err,
       quoteId) => history.push(`/customers/view/${customer._id}/quotes/${quoteId}/header`),
    );
  };

  const editCustomer = (e) => {
    e.preventDefault();
    history.push(`/customers/edit/${customer._id}`);
  };

  const favoriteCustomer = (e) => {
    e.preventDefault();
    Meteor.call('users.favoriteCustomer', Meteor.user()._id, customer._id);
  };

  return (
    <Link to={`/customers/view/${customer._id}/overview`} className="list-item">
      <div className={`panel ${header ? 'header-panel' : ''}`}>
        <div className="icon-column">
          <button onClick={newQuote}>
            <span className="fa fa-fw fa-file" />
          </button>
          <span className="fa fa-fw fa-cubes" />
          <span className="fa fa-fw fa-dollar" />
        </div>
        <div className="container panel-body">
          <div className="row no-gutters">
            <div className="col-6">
              <span className="list-item-header">{customer.name.toUpperCase()}&nbsp;
                {
                  isFavoriteCustomer(customer._id)
                    ?
                  <span className="fa fa-fw fa-heart favorite-icon" />
                    :
                  <span
                    className="fa fa-fw fa-heart-o favorite-icon"
                    onClick={favoriteCustomer}
                  />
                }
              </span>
              <br />
              <span className="customer-active-quotes">
                {customer.quotes.length} QUOTES
              </span>
              <br />
              <span className="label">{customer.shipments.length} SHIPMENTS</span>
            </div>
            <div className="col-3">
              <span className="list-item-header">LOCAL ACCOUNT</span><br />
              Heavy Machinery<br />
              2.1 TEU/MO
            </div>
            <div className="col-3">
              <span className="label">13 k NR/MO</span><br />
              <span className="label">2 k UNBILLED</span><br />
              <span className="label">58 % CREDIT USAGE</span>
            </div>
          </div>
        </div>
        <div className="icon-column">
          <button onClick={editCustomer}>
            <span className="fa fa-fw fa-pencil" />
          </button>
        </div>
      </div>
    </Link>
  );
};

CustomerListItem.propTypes = {
  customer: PropTypes.object.isRequired,
  header: PropTypes.bool,
  history: PropTypes.object.isRequired,
};

CustomerListItem.defaultProps = {
  header: false,
};

export default CustomerListItem;
