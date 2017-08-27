import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { createContainer } from 'meteor/react-meteor-data';

import { Shipments } from '../../api/shipments/shipmentsCollection';
import { Quotes } from '../../api/quotes/quotesCollection';

import Shipment from '../shipmentUtils';

import ShipmentListItem from './ShipmentListItem.jsx';
import ShipmentListItemHeader from './ShipmentListItemHeader.jsx';
import MovementChart from './MovementChart.jsx';

export const QuoteListItemInner = ({ quote, filters }) => {
  const quoteLink = () => {
    if (quote.status === 'Submitted') {
      return `/customers/view/${quote.customerId}/quotes/${quote._id}/view`;
    }
    return `/customers/view/${quote.customerId}/quotes/${quote._id}/header`;
  };

  return (
    <div>
      <Link className="list-item panel" to={quoteLink()}>
        <ShipmentListItemHeader shipment={quote} />
        <div className="list-item-body">
          <MovementChart shipment={quote} />
        </div>
      </Link>
      {quote.shipments
        ? quote.shipments
            .slice()
            .reverse()
            .filter(shipmentId =>
              Shipment.filter(Shipments.findOne(shipmentId), filters),
            )
            .map(shipmentId =>
              <ShipmentListItem
                key={shipmentId}
                quote={quote}
                shipment={Shipments.findOne(shipmentId)}
              />,
            )
        : null}
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

const QuoteListItem = createContainer(props => {
  const { quoteId } = props;
  const quote = Quotes.findOne(quoteId);
  return { quote };
}, QuoteListItemInner);

export default QuoteListItem;
