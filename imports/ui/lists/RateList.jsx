import React from 'react';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';

import { Rates } from '../../api/rates/rateCollection';

import RateListItem from '../list-items/RateListItem.jsx';

export const RateListInner = (props) => {
  const { rates, history } = props;

  const newRate = () => {
    history.push('/rates/new');
  };

  return (
    <div>
      <div className="content rate">
        <div className="process-header">
          <div className="title">RATE LIST</div>
          <button
            className="button-primary"
            onClick={newRate}
          >
            NEW RATE
          </button>
        </div>
        {
          rates
            .map(rate => (
              <RateListItem
                key={rate._id}
                rate={rate}
                history={history}
              />
            ))
        }
      </div>
      <div className="content-footer-accent rate-footer-accent" />
    </div>
  );
};

RateListInner.propTypes = {
  rates: PropTypes.array,
};

RateListInner.defaultProps = {
  rates: [],
};

const RateList = createContainer(() => ({
  rates: Rates.find().fetch(),
}), RateListInner);

export default RateList;
