import React from 'react';
import PropTypes from 'prop-types';
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
    }               = quote.cargo || {};
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
      return `${totalPackages} PKG${totalPackages !== 1 ? 'S' : ''}, ${totalVolume} ${volumeUOM.toUpperCase()}, ${totalWeight} ${weightUOM.toUpperCase()}`;
    }
    return '';
  };

  const routes = () => {
    
  };

  return (
    <div className="panel">
      <div className="icon-column">
        <span className="fa fa-fw fa-clone" />
      </div>
      <div className="container panel-body">
        <div className="row no-gutters">
          <div className="col-4">
            <span className="label">
              {cargoString()}<br />
              {routes()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

QuoteListItemInner.propTypes = {
  quote: PropTypes.shape({
    cargo: PropTypes.shape({
      ratedQuote: PropTypes.bool,
      cargoType: PropTypes.string,
      totalPackages: PropTypes.number,
      totalVolume: PropTypes.number,
      volumeUOM: PropTypes.string,
      totalWeight: PropTypes.number,
      weightUOM: PropTypes.string,
      totalContainers: PropTypes.number,
      totalTEU: PropTypes.number,
    }),
  }),
};

QuoteListItemInner.defaultProps = {
  quote: {
    cargo: {
      ratedQuote: false,
      cargoType: 'Loose',
      totalPackages: 0,
      totalVolume: 0,
      volumeUOM: 'cbm',
      totalWeight: 0,
      weightUOM: 'kg',
      totalContainers: 0,
      totalTEU: 0,
    },
  },
};

const QuoteListItem = createContainer((props) => {
  const { quoteId } = props;
  const quote       = Quotes.findOne(quoteId);
  return { quote };
}, QuoteListItemInner);

export default QuoteListItem;
