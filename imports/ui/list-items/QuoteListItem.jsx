import React from 'react';
import PropTypes from 'prop-types';

import { dateFormat } from '../formatters/date-format';

export default class QuoteListItem extends React.Component {
  constructor(props) {
    super(props);
  }

  modeIconClass() {
    const { mode } = this.props.quote;
    if (mode === 'Air') {
      return 'fa-plane';
    }
    if (mode === 'Ocean') {
      return 'fa-ship';
    }
    if (mode === 'Road') {
      return 'fa-truck';
    }
    return '';
  }

  render() {
    const { quote } = this.props;
    return (
      <a className="card">
        <div className="card-inner">
          <div className="icon-container hidden-md-down">
            <div className={`icon fa fa-fw ${this.modeIconClass()}`}/>
          </div>
          <div className="card-content container">
            <div className="row">
              <div className="col-6">
                <b>{quote.quoteCode}</b><br/>
                {quote.status}<br/>
                {dateFormat(quote.expiryDate)}
              </div>
              <div className="col-6">
                {quote.type}<br/>
                {quote.rateType}<br/>
                {quote.incoterm}
              </div>
            </div>
          </div>
        </div>
      </a>
    );
  }
}

QuoteListItem.propTypes = {
  quote: PropTypes.object,
};
