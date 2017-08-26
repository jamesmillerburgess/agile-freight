import React from 'react';

import QuoteContainer from './QuoteContainer';
import { copyQuote, newShipment } from '../quoteUtils';

const ViewQuote = props => (
  <div className="view-quote">
    <div className="process-header">
      <div className="title">VIEW QUOTE</div>
      <div className="header-button-group">
        <button
          className="button-primary"
          onClick={() => copyQuote(
            props.match.params.quoteId,
            (err, quoteId) => props.history.push(
              `/customers/view/${props.match.params.customerId}/quotes/` +
              `${quoteId}/header`,
            ),
          )}
        >
          COPY QUOTE
        </button>
        <button
          className="button-primary"
          onClick={() => newShipment(
            props.match.params.quoteId,
            (err, shipmentId) => props.history.push(
              `/customers/view/${props.match.params.customerId}/shipments/` +
              `${shipmentId}`,
            ),
          )}
        >
          CREATE SHIPMENT
        </button>
        <button
          className="button-primary"
          onClick={() => props.history.push(`/customers/view/${props.match.params.customerId}/overview`)}
        >
          BACK TO CUSTOMER
        </button>
      </div>
    </div>

    <QuoteContainer quoteId={props.match.params.quoteId} />
  </div>
);

export default ViewQuote;
