import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { createContainer } from 'meteor/react-meteor-data';

import { Quotes } from '../../api/quotes/quotesCollection';

const QuoteListItemInner = ({ quote }) => {
  const
    {
      cargoType,
      ratedQuote,
      totalContainers,
      totalTEU,
      totalPackages,
      totalVolume,
      volumeUOM,
      totalWeight,
      weightUOM,
    }               = quote.cargo;
  const cargoString = () => {
    if (cargoType === 'Containerized') {
      if (ratedQuote === true) {
        return 'RATED, CONTAINERIZED';
      }
      return `${totalContainers} UNIT${totalContainers !== 1 ? 'S' : ''}, ${totalTEU} TEU`;
    } else if (cargoType === 'Loose') {
      if (ratedQuote === true) {
        return 'RATED, LOOSE';
      }
      return `${totalPackages} PKG${totalPackages !== 1 ? 'S' : ''}, ${totalVolume} ${volumeUOM}, ${totalWeight} ${weightUOM}`;
    }
    return '';
  };

  return (
    <div className="panel">
      <div className="icon-column">
      </div>
      <div className="container panel-body">
        <div className="row no-gutters">
          <div className="col-4">
            <span className="label">
              {cargoString()}
            </span>
          </div>
        </div>
      </div>
      Quote!
    </div>
  );
};

QuoteListItemInner.propTypes = {
  quote: PropTypes.object.isRequired,
};

const QuoteListItem = createContainer((props) => {
  const { quoteId } = props;
  const quote       = Quotes.findOne(quoteId);
  return { quote };
}, QuoteListItemInner);

export default QuoteListItem;
