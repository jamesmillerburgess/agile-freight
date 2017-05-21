import React from 'react';
import moment from 'moment';

import { weightFormat } from '../formatters/numberFormatters';

const Quote = (props) => {
  const getStatus = () => {
    if (!props.quote.status) {
      return '';
    }
    if (props.quote.status !== 'Submitted') {
      return props.quote.status.toUpperCase();
    }
    return `EXPIRES ${moment(props.quote.expiryDate).format('DD MMM YYYY').toUpperCase()}`;
  };

  const hasCargo = () => {
    if (!props.quote.cargo || !props.quote.cargo.cargoType) {
      return false;
    }
    const { cargo } = props.quote;
    if (cargo.cargoType === 'Loose' && cargo.packageLines.length === 0) {
      return false;
    }
    return !(cargo.cargoType === 'Containerized' && cargo.packageLines.length === 0);
  };

  return (
    <div className="panel">
      <div className="quote">
        <div className="header-row">
          <span className="header">AGILITY FREIGHT QUOTATION</span>
          <span className="status">{getStatus()}</span>
        </div>
        <span className="title">CARGO</span>
        {
          hasCargo() ?
            props.quote.cargo.packageLines.map((packageLine, index) => (
              <div key={index} className="cargo-row">
                <span>{packageLine.numPackages} {packageLine.packageType}</span>
                <span className="numeric-label">
                  {packageLine.length}x{packageLine.width}x{packageLine.height} {packageLine.unitVolumeUOM}
                </span>
                <span className="numeric-label">
                  {weightFormat(packageLine.weight)} {packageLine.weightUOM} / pkg
                </span>
                <span className="numeric-label">
                  {packageLine.numPackages} pkgs,&nbsp;
                  {weightFormat(packageLine.volume)} {packageLine.volumeUOM},&nbsp;
                  {weightFormat(packageLine.totalWeight)} {packageLine.weightUOM}
                </span>
              </div>
            )) :
            <span>NO CARGO ENTERED</span>
        }
      </div>
    </div>
  );
};

Quote.defaultProps = {
  quote: {},
};

export default Quote;
