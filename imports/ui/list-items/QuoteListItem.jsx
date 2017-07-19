import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { createContainer } from 'meteor/react-meteor-data';
import moment from 'moment';

import { Shipments } from '../../api/shipments/shipmentsCollection';
import { Quotes } from '../../api/quotes/quotesCollection';

import ShipmentListItem from './ShipmentListItem.jsx';
import { currencyFormat, weightFormat } from '../formatters/numberFormatters';
import { copyQuote } from '../quoteUtils';

export const QuoteListItemInner = ({ quote, history }) => {
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
    } = quote.cargo || {};

  const getCargoText = () => {
    if (cargoType === 'Containerized') {
      if (ratedQuote === true) {
        return 'RATED, CONTAINERIZED';
      }
      return `${totalContainers} UNIT${totalContainers !== 1 ? 'S' : ''}, ${totalTEU} TEU`;
    } else if (cargoType === 'Loose') {
      if (ratedQuote === true) {
        return 'RATED, LOOSE';
      }
      return `${totalPackages} PKG${totalPackages !== 1 ? 'S' : ''}, ${weightFormat(totalVolume)} ${volumeUOM.toUpperCase()}, ${weightFormat(totalWeight)} ${weightUOM.toUpperCase()}`;
    }
    return 'NO CARGO ENTERED';
  };

  const getMovementText = () => {
    if (
      quote &&
      quote.movement &&
      quote.movement.pickup &&
      quote.movement.delivery &&
      quote.movement.pickup.locationName &&
      quote.movement.delivery.locationName
    ) {
      const pickupLocationName = quote.movement.pickup.locationName;
      const deliveryLocationName = quote.movement.delivery.locationName;
      return `${pickupLocationName} – ${deliveryLocationName}`.toUpperCase();
    }
    return 'NO ROUTING ENTERED';
  };

  const getOtherServicesText = () => {
    if (!quote || !quote.otherServices) {
      return 'NO OTHER SERVICES';
    }
    if (quote.otherServices.insurance && quote.otherServices.customsClearance) {
      return 'INSURANCE, CUSTOMS CLEARANCE';
    }
    if (quote.otherServices.insurance) {
      return 'INSURANCE';
    }
    if (quote.otherServices.customsClearance) {
      return 'CUSTOMS CLEARANCE';
    }
    return 'NO OTHER SERVICES';
  };

  const getTotalPriceText = () => {
    if (!quote || !quote.charges || !quote.charges.totalCharges || !quote.charges.currency) {
      return 'NO CHARGES ENTERED';
    }
    return `${quote.charges.currency} ${currencyFormat(quote.charges.totalCharges)}`;
  };

  const getStatusText = () => {
    if (!quote || !quote.status) {
      return '';
    }
    if (quote.status === 'Draft' || quote.status === 'Archived' || quote.status === 'Expired') {
      return quote.status.toUpperCase();
    }
    if (quote.status === 'Submitted' && quote.expiryDate) {
      return `EXPIRES ${moment(quote.expiryDate).format('DD MMM YYYY').toUpperCase()}`;
    }
    return '';
  };

  const onClickCopy = (e) => {
    e.preventDefault();
    copyQuote(quote._id, (err, newQuoteId) => history.push(`/customers/view/${quote.customerId}/quotes/${newQuoteId}/header`));
  };

  const quoteLink = () => {
    if (quote.status === 'Submitted') {
      return `/customers/view/${quote.customerId}/quotes/${quote._id}/view`;
    }
    return `/customers/view/${quote.customerId}/quotes/${quote._id}/header`;
  };

  return (
    <Link className="list-item" to={quoteLink()}>
      <div className="panel">
        <div className="icon-column">
          <span className="fa fa-fw fa-clone" onClick={onClickCopy} />
        </div>
        <div className="container panel-body">
          <div className="row no-gutters">
            <div className="col-4">
              <span className="label">{getCargoText()}</span><br />
              <span className="label">{getMovementText()}</span>
            </div>
            <div className="col-4">
              <span className="label">{getOtherServicesText()}</span><br />
              <span className="label">{getTotalPriceText()}</span>
            </div>
            <div className="col-4">
              <span className="label">{getStatusText()}</span>
            </div>
          </div>
        </div>
      </div>
      {quote.shipment ? <ShipmentListItem shipment={Shipments.findOne(quote.shipment)} /> : null}
    </Link>
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
  history: PropTypes.object,
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
  const quote = Quotes.findOne(quoteId);
  return { quote };
}, QuoteListItemInner);

export default QuoteListItem;
