import React from 'react';
import moment from 'moment';

import { currencyFormat, weightFormat } from '../formatters/numberFormatters';
import { quotePropTypes } from './quotePropTypes';

class Quote extends React.Component {
  constructor(props) {
    super(props);
    this.getStatus                    = this.getStatus.bind(this);
    this.hasCargo                     = this.hasCargo.bind(this);
    this.PackageLines                 = this.PackageLines.bind(this);
    this.ContainerLines               = this.ContainerLines.bind(this);
    this.LooseCargoTotals             = this.LooseCargoTotals.bind(this);
    this.ContainerizedCargoTotals     = this.ContainerizedCargoTotals.bind(this);
    this.LooseCargoAttributes         = this.LooseCargoAttributes.bind(this);
    this.ContainerizedCargoAttributes = this.ContainerizedCargoAttributes.bind(this);
    this.hasRouting                   = this.hasRouting.bind(this);
    this.Routing                      = this.Routing.bind(this);
    this.Insurance                    = this.Insurance.bind(this);
    this.CustomsClearance             = this.CustomsClearance.bind(this);
    this.hasCharges                   = this.hasCharges.bind(this);
    this.ChargeGroup                  = this.ChargeGroup.bind(this);
    this.Email                        = this.Email.bind(this);
    this.FXRates                      = this.FXRates.bind(this);
  }

  componentWillUpdate() {
    if (this.node && this.node.classList) {
      this.node.classList.add('update');
    }
  }

  componentDidUpdate() {
    setTimeout(() => {
      if (this.node && this.node.classList) {
        this.node.classList.remove('update');
      }
    }, 1);
  }

  getStatus() {
    if (!this.props.quote.status) {
      return '';
    }
    if (this.props.quote.status !== 'Submitted') {
      return this.props.quote.status.toUpperCase();
    }
    return `EXPIRES ${moment(this.props.quote.expiryDate).format('DD MMM YYYY').toUpperCase()}`;
  }

  hasCargo() {
    if (!this.props.quote.cargo || !this.props.quote.cargo.cargoType) {
      return false;
    }
    const { cargo } = this.props.quote;
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
  }

  PackageLines() {
    return (
      this.props.quote.cargo.packageLines.map((packageLine, index) => (
        <div key={index} className="cargo-row">
          <span className="packages">{packageLine.numPackages} {packageLine.packageType}</span>
          <span className="dimensions numeric-label">
            {packageLine.length}x{packageLine.width}x{packageLine.height} {packageLine.unitVolumeUOM}
          </span>
          <span className="weight numeric-label">
            {weightFormat(packageLine.weight)} {packageLine.weightUOM} / pkg
          </span>
          <span className="totals numeric-label">
            {packageLine.numPackages} pkgs,&nbsp;
            {weightFormat(packageLine.volume)} {packageLine.volumeUOM},&nbsp;
            {weightFormat(packageLine.totalWeight)} {packageLine.weightUOM}
          </span>
        </div>
      ))
    );
  }

  ContainerLines() {
    return (
      this.props.quote.cargo.containerLines.map((containerLine, index) => (
        <div key={index} className="cargo-row">
        <span>
          {containerLine.numContainers} {containerLine.containerType} {containerLine.temperatureControlled ? 'Temperature Controlled' : ''}
        </span>
        </div>
      ))
    );
  }

  LooseCargoTotals() {
    return (
      <span className="cargo-totals-values numeric-label">
      {this.props.quote.cargo.totalPackages} pkgs,&nbsp;
        {weightFormat(this.props.quote.cargo.totalVolume)} {this.props.quote.cargo.volumeUOM},&nbsp;
        {weightFormat(this.props.quote.cargo.totalWeight)} {this.props.quote.cargo.weightUOM}
    </span>
    );
  }

  ContainerizedCargoTotals() {
    return (
      <span className="cargo-totals-values numeric-label">
      {this.props.quote.cargo.totalContainers} container,&nbsp;
        {this.props.quote.cargo.totalTEU} TEU
    </span>
    );
  }

  LooseCargoAttributes() {
    return (
      <span className="label">
        {this.props.quote.cargo.hazardous ? 'Hazardous,' : 'Non-Hazardous,'}&nbsp;
        {this.props.quote.cargo.temperatureControlled ? 'Temperature Controlled' : 'Non-Temperature Controlled'}
      </span>
    );
  }

  ContainerizedCargoAttributes() {
    return (
      <span className="label">
      {this.props.quote.cargo.hazardous ? '' : 'Non-'}Hazardous
    </span>
    );
  }

  hasRouting() {
    if (
      !this.props.quote.movement ||
      !this.props.quote.movement.pickup ||
      !this.props.quote.movement.delivery ||
      !this.props.quote.movement.pickup.locationName ||
      !this.props.quote.movement.delivery.locationName
    ) {
      return false;
    }
    return true;
  }

  Routing() {
    return (
      <div>
        <div>
          <span>
            {this.props.quote.movement.pickup.locationName} – {this.props.quote.movement.delivery.locationName}
          </span>
        </div>
        <div>
          <span>
            {this.props.quote.movement.pickup.locationType} to {this.props.quote.movement.delivery.locationType}
          </span>
        </div>
      </div>
    );
  }

  Insurance() {
    return (
      <span>{this.props.quote.otherServices && this.props.quote.otherServices.insurance ? '' : 'No '}Insurance</span>
    );
  }

  CustomsClearance() {
    return (
      <span>{this.props.quote.otherServices && this.props.quote.otherServices.customsClearance ? '' : 'No '}Customs Clearance</span>
    );
  }

  hasCharges() {
    return !(
      !this.props.quote ||
      !this.props.quote.charges ||
      !this.props.quote.charges.chargeLines ||
      !this.props.quote.charges.chargeLines.length
    );
  }

  ChargeGroup(group) {
    const groupChargeLines = this.props.quote.charges.chargeLines.filter(charge => charge.group === group);
    if (groupChargeLines.length === 0) {
      return (
        <div />
      );
    }
    return (
      <div className="charge-group section">
        <span className="title">
          {group.toUpperCase()} CHARGES
        </span>
        {groupChargeLines.map((chargeLine, index) => (
          <div key={index} className="charge-row">
            <span className="name">{chargeLine.name}</span>
            <span className="units" />
            <span className="rate">
              {chargeLine.units} {chargeLine.rate}
            </span>
            <span className="amount">
              {
                chargeLine.units !== 1 ?
                  `${currencyFormat(chargeLine.unitPrice)} ${chargeLine.unitPriceCurrency}` :
                  null
              }
            </span>
            <span className="amount">
              {
                chargeLine.unitPriceCurrency !== this.props.quote.charges.currency ?
                  `${currencyFormat(chargeLine.amount)} ${chargeLine.unitPriceCurrency}` :
                  null
              }
            </span>
            <span className="amount">
              {currencyFormat(chargeLine.finalAmount)} {this.props.quote.charges.currency}
            </span>
          </div>
        ))}
        <div className="subtotal-row">
          <span>SUBTOTAL</span>
          <span className="value">{(() => {
            switch (group) {
              case 'Origin':
                return currencyFormat(this.props.quote.charges.totalOriginCharges);
              case 'International':
                return currencyFormat(this.props.quote.charges.totalInternationalCharges);
              case 'Destination':
                return currencyFormat(this.props.quote.charges.totalDestinationCharges);
              default:
                return '';
            }
          })()} {this.props.quote.charges.currency}</span>
        </div>
      </div>
    );
  }

  Email() {
    const status = this.props.quote.status || '';
    if (!this.props.quote.email || !this.props.quote.email.sentDate) {
      return null;
    }
    if (status === 'Submitted' || status === 'Expired') {
      return (
        <div className="panel">
          <div className="email">
            <div className="title">EMAIL</div>
            <div className="email-field">
              <span className="label">SENT</span>
              <span className="value">{moment(this.props.quote.email.sentDate).format('DD MMM YYYY hh:mm').toUpperCase()}</span>
            </div>
            <div className="email-field">
              <span className="label">TO</span>
              <span className="value">{this.props.quote.email.to}</span>
            </div>
            <div className="email-field">
              <span className="label">CC</span>
              <span className="value">{this.props.quote.email.cc}</span>
            </div>
            <div className="email-field">
              <span className="label">SUBJECT</span>
              <span className="value">{this.props.quote.email.subject}</span>
            </div>
            <div className="email-field">
              <span className="label">MESSAGE</span>
              <pre className="value">{this.props.quote.email.message}</pre>
            </div>
          </div>
        </div>
      );
    }
    return null;
  }

  FXRates() {
    if (!this.props.quote.charges.fxConversions) {
      return null;
    }
    const currencies =
            Object
              .keys(this.props.quote.charges.fxConversions)
              .filter(currency => this.props.quote.charges.fxConversions[currency].active);
    if (!currencies.length) {
      return null;
    }
    return (
      <div className="fx-rates">
        <div className="title">FX RATES</div>
        {
          currencies.map((currency, index) => (
            <div key={index} className="field">
              <div className="label">
                {this.props.quote.charges.currency}/{currency}
              </div>
              <div className="value">
                {this.props.quote.charges.fxConversions[currency].rate}
              </div>
            </div>
          ))
        }
      </div>
    );
  }

  render() {
    return (
      <div
        ref={(node) => {
          this.node = node;
        }}
        className="quote-container"
      >
        <div className="panel transition">
          <div className="quote">
            <div className="header-row">
              <span className="header">AGILITY FREIGHT QUOTATION</span>
              <span className="title">{this.getStatus()}</span>
            </div>
            {
              this.hasCharges() ?
                <div>
                  <div className="total-row">
                    <span className="title">TOTAL PRICE</span>
                    <span className="title value">
                      {currencyFormat(this.props.quote.charges.totalCharges)} {this.props.quote.charges.currency}
                    </span>
                  </div>
                </div> :
                null
            }
            <div className="cargo section">
              <span className="title">CARGO</span>
              {
                this.hasCargo() ?
                  <div className="">
                    {this.props.quote.cargo.cargoType === 'Loose' ? this.PackageLines() : this.ContainerLines()}
                    <div className="cargo-totals">
                      <span className="label">TOTAL</span>
                      {this.props.quote.cargo.cargoType === 'Loose' ? this.LooseCargoTotals() : this.ContainerizedCargoTotals()}
                    </div>
                    <div className="cargo-attributes">
                      {this.props.quote.cargo.cargoType === 'Loose' ? this.LooseCargoAttributes() : this.ContainerizedCargoAttributes()}
                    </div>
                  </div> :
                  <span>NO CARGO ENTERED</span>
              }
            </div>
            <div className="routing-and-other-services section">
              <div className="routing">
                <span className="title">ROUTING</span>
                {
                  this.hasRouting() ?
                    this.Routing() :
                    <span>NO ROUTING ENTERED</span>
                }
              </div>
              <div className="other-services">
                <span className="title">OTHER SERVICES</span>
                {this.Insurance()}
                {this.CustomsClearance()}
              </div>
            </div>
            <div className="charges section">
              {
                this.hasCharges() ?
                  <div>
                    {this.ChargeGroup('Origin')}
                    {this.ChargeGroup('International')}
                    {this.ChargeGroup('Destination')}
                    <div className="notes-and-fx-rates">
                      <div className="notes">
                        <span className="title">NOTES</span>
                        <pre>
                    {this.props.quote.charges.notes}
                  </pre>
                      </div>
                      {this.FXRates()}
                    </div>
                    <div className="total-row">
                      <span className="title">TOTAL PRICE</span>
                      <span className="title value">
                      {currencyFormat(this.props.quote.charges.totalCharges)} {this.props.quote.charges.currency}
                    </span>
                    </div>
                  </div> :
                  <span className="title">NO CHARGES ENTERED</span>
              }
            </div>
          </div>
        </div>
        {this.Email()}
      </div>
    );
  }
}

Quote.propTypes = {
  quote: quotePropTypes,
};

Quote.defaultProps = {
  quote: {},
};

export default Quote;
