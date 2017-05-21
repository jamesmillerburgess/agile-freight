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
    if (cargo.cargoType === 'Loose') {
      if (!cargo.packageLines || cargo.packageLines.length === 0) {
        return false;
      }
    }
    if (cargo.cargoType === 'Containerized') {
      if (!cargo.containerLines || cargo.containerLines.length === 0) {
        return false;
      }
    }
    return true;
  };

  const PackageLines = () => (
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
    ))
  );

  const ContainerLines = () => (
    props.quote.cargo.containerLines.map((containerLine, index) => (
      <div key={index} className="cargo-row">
        <span>
          {containerLine.numContainers} {containerLine.containerType} {containerLine.temperatureControlled ? 'Temperature Controlled' : ''}
        </span>
      </div>
    ))
  );

  const LooseCargoTotals = () => (
    <span className="cargo-totals-values numeric-label">
      {props.quote.cargo.totalPackages} pkgs,&nbsp;
      {weightFormat(props.quote.cargo.totalVolume)} {props.quote.cargo.volumeUOM},&nbsp;
      {weightFormat(props.quote.cargo.totalWeight)} {props.quote.cargo.weightUOM}
    </span>
  );

  const ContainerizedCargoTotals = () => (
    <span className="cargo-totals-values numeric-label">
      {props.quote.cargo.totalContainers} container,&nbsp;
      {props.quote.cargo.totalTEU} TEU
    </span>
  );

  const LooseCargoAttributes = () => (
    <span className="label">
      {props.quote.cargo.hazardous ? '' : 'NON-'}HAZARDOUS, {props.quote.cargo.temperatureControlled ? '' : 'NON-'}TEMPERATURE CONTROLLED
    </span>
  );

  const ContainerizedCargoAttributes = () => (
    <span className="label">
      {props.quote.cargo.hazardous ? '' : 'NON-'}HAZARDOUS
    </span>
  );
  
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
            <div className="cargo">
              {props.quote.cargo.cargoType === 'Loose' ? PackageLines() : ContainerLines()}
              <div className="cargo-totals">
                <span className="label">TOTAL</span>
                {props.quote.cargo.cargoType === 'Loose' ? LooseCargoTotals() : ContainerizedCargoTotals()}
              </div>
              <div className="cargo-attributes">
                {props.quote.cargo.cargoType === 'Loose' ? LooseCargoAttributes() : ContainerizedCargoAttributes()}
              </div>
            </div> :
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
