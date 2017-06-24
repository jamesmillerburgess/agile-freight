import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { currencyFormat } from '../formatters/numberFormatters';

const RateListItem = (props) => {
  const branchLink = `/branches/edit/${props.rate._id}`;

  return (
    <Link className="list-item" to={branchLink}>
      <div className="panel">
        <div className="icon-column" />
        <div className="container panel-body">
          <div className="row no-gutters">
            <div className="col-1">
              <span className="label">{props.rate.type}</span>
            </div>
            <div className="col-1">
              <span className="label">{props.rate.chargeCode}</span>
            </div>
            <div className="col-1">
              <span className="label">{props.rate.level}</span>
            </div>
            <div className="col-2">
              <span className="label">{props.rate.route}</span>
            </div>
            <div className="col-2">
              <span className="label">{props.rate.basis}</span>
            </div>
            <div className="col-1">
              <span className="label">{currencyFormat(props.rate.unitPrice)}</span>
            </div>
            <div className="col-1">
              <span className="label">{props.rate.currency}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

RateListItem.propTypes = {
  rate: PropTypes.object,
};

export default RateListItem;
