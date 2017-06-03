import React from 'react';

import QuoteContainer from './QuoteContainer';

const ViewQuote = props => (
  <div className="view-quote">
    <div className="process-header">
      <div className="title">VIEW QUOTE</div>
      <button
        className="back-button"
        onClick={() => props.history.push(`/customers/${props.match.params.customerId}/overview`)}
      >
        BACK TO CUSTOMER
      </button>
    </div>

    <QuoteContainer quoteId={props.match.params.quoteId} />
  </div>
);

export default ViewQuote;
