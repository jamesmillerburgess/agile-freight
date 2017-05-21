import React from 'react';
import moment from 'moment';

import { currencyFormat, weightFormat } from '../formatters/numberFormatters';

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

  const hasRouting = () => {
    if (
      !props.quote.movement ||
      !props.quote.movement.pickup ||
      !props.quote.movement.delivery ||
      !props.quote.movement.pickup.locationName ||
      !props.quote.movement.delivery.locationName
    ) {
      return false;
    }
    return true;
  };

  const Routing = () => (
    <div>
      <span>
        {props.quote.movement.pickup.locationName} – {props.quote.movement.delivery.locationName}
      </span>
      <span>
        {props.quote.movement.pickup.isPort ? 'PORT' : 'DOOR'} TO {props.quote.movement.delivery.isPort ? 'PORT' : 'DOOR'}
      </span>
    </div>
  );

  const Insurance = () => (
    <span>{props.quote.otherServices && props.quote.otherServices.insurance ? '' : 'NO '}INSURANCE</span>
  );

  const CustomsClearance = () => (
    <span>{props.quote.otherServices && props.quote.otherServices.customsClearance ? '' : 'NO '}CUSTOMS CLEARANCE</span>
  );

  const hasCharges = () => !(
    !props.quote ||
    !props.quote.charges ||
    !props.quote.charges.chargeLines ||
    !props.quote.charges.chargeLines.length
  );

  const ChargeGroup = group => {
    const groupChargeLines = props.quote.charges.chargeLines.filter(charge => charge.group === group);
    if (groupChargeLines.length === 0) {
      return (
        <div className="charge-group section">
          <span className="title">
            NO {group.toUpperCase()} CHARGES
          </span>
        </div>
      );
    }
    return (
      <div className="charge-group">
        <span className="title">
          {group.toUpperCase()} CHARGES
        </span>
        {groupChargeLines.map((chargeLine, index) => (
          <div key={index} className="charge-row">
            <span>{chargeLine.name}</span>
            <span>{chargeLine.rate}</span>
            <span className="units">{chargeLine.units}</span>
            <span className="amount">{currencyFormat(chargeLine.unitPrice)} {chargeLine.localCurrency}</span>
            <span className="amount">{currencyFormat(chargeLine.localTotal)} {chargeLine.localCurrency}</span>
            <span className="amount">{currencyFormat(chargeLine.total)} {props.quote.charges.currency}</span>
          </div>
        ))}
        <div className="subtotal-row">
          <span>SUBTOTAL</span>
          <span className="value">{(() => {
            switch (group) {
              case 'Origin':
                return currencyFormat(props.quote.charges.totalOriginCharges);
              case 'International':
                return currencyFormat(props.quote.charges.totalInternationalCharges);
              case 'Destination':
                return currencyFormat(props.quote.charges.totalDestinationCharges);
              default:
                return '';
            }
          })()} {props.quote.charges.currency}</span>
        </div>
      </div>
    );
  };

  const Email = () => {
    const status = props.quote.status || '';
    if (!props.quote.email || !props.quote.email.sentDate) {
      return null;
    }
    if (status === 'Submitted' || status === 'Expired') {
      return (
        <div className="panel">
          <div className="email">
            <div className="title">EMAIL</div>
            <div className="email-field">
              <span>SENT</span>
              <span>{moment(props.quote.email.sentDate).format('DD MMM YYYY hh:mm').toUpperCase()}</span>
            </div>
            <div className="email-field">
              <span>TO</span>
              <span>{props.quote.email.to}</span>
            </div>
            <div className="email-field">
              <span>CC</span>
              <span>{props.quote.email.cc}</span>
            </div>
            <div className="email-field">
              <span>SUBJECT</span>
              <span>{props.quote.email.subject}</span>
            </div>
            <div className="email-field">
              <span>MESSAGE</span>
              <pre>{props.quote.email.message}</pre>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="quote-container">
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
          <div className="routing-and-other-services section">
            <div className="routing">
              <span className="title">ROUTING</span>
              {
                hasRouting() ?
                  Routing() :
                  <span>NO ROUTING ENTERED</span>
              }
            </div>
            <div className="other-services">
              <span className="title">OTHER SERVICES</span>
              {Insurance()}
              {CustomsClearance()}
            </div>
          </div>
          <div className="charges section">
            {
              hasCharges() ?
                <div>
                  {ChargeGroup('Origin')}
                  {ChargeGroup('International')}
                  {ChargeGroup('Destination')}
                  <span className="title">NOTES</span>
                  <pre>{props.quote.charges.notes}</pre>
                  <div className="total-row">
                    <span className="title">TOTAL PRICE</span>

                    <span className="title value">
                    {currencyFormat(props.quote.charges.totalCharges)} {props.quote.charges.currency}
                  </span>
                  </div>
                </div> :
                <span className="title">NO CHARGES ENTERED</span>
            }
          </div>
        </div>
      </div>
      {Email()}
    </div>
  );
};

Quote.defaultProps = {
  quote: {},
};

export default Quote;
