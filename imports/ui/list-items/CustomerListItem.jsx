import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { currencyFormat } from '../formatters/numberFormatters';

const CustomerListItem = ({ customer, history }) => {
  const creditUsageStyle = () => ({
    width: `${Math.round((customer.credit.used / customer.credit.total) * 100)}%`,
    height: '20px',
  });

  return (
    <Link to={`/customer/${customer._id}/quotes`} className="list-item">
      <div className="panel">
        <div className="icon-column">
          <span className="fa fa-fw fa-file" />
          <span className="fa fa-fw fa-cubes" />
          <span className="fa fa-fw fa-dollar" />
        </div>
        <div className="container panel-body">
          <div className="row no-gutters">
            <div className="col-6">
              <span className="list-item-header">{customer.name.toUpperCase()} <span className="fa fa-fw fa-heart-o favorite-icon" /></span>
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
      </div>
    </Link>
  );
}

CustomerListItem.propTypes = {
  customer: PropTypes.object,
};

export default CustomerListItem;
