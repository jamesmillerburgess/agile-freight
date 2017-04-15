import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { currencyFormat } from '../formatters/currency-format';

const CustomerListItem = ({ customer }) => {
  const creditUsageStyle = () => ({
    width: `${Math.round((customer.credit.used / customer.credit.total) * 100)}%`,
    height: '20px',
  });

  return (
    <Link to={`/customer/${customer._id}/overview`} className="card">
      <div className="card-inner">
        <div className="icon-container hidden-md-down">
          <div className="icon fa fa-fw fa-address-card"></div>
        </div>
        <div className="container card-content">
          <div className="row">
            <div className="col-6">
              <span className="customer-name">{customer.name}</span>
              <br />
              <span className="customer-active-quotes">
                  {`${customer.activeQuotes.length} QUOTES`}
                </span>
              <br />
              <span className="customer-active-jobs">
                  {`${customer.activeJobs.length} JOBS`}
                </span>
            </div>
            <div className="col-6">
              <span className="customer-industry">Pharmaceuticals</span><br />
              <span className="customer-credit">
                  {`${currencyFormat(customer.credit.used)} / ${currencyFormat(customer.credit.total)} ${customer.credit.currency} credit`}
                </span>
              <br />
              <div className="progress">
                <div className="progress-bar" role="progressbar"
                     style={creditUsageStyle()} aria-valuenow="25"
                     aria-valuemin="0" aria-valuemax="100" />
              </div>
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
