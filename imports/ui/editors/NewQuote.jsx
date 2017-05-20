import React from 'react';
import Select from 'react-select';
import { Meteor } from 'meteor/meteor';

import { integerFormat, weightFormat } from '../formatters/numberFormatters';
import { countByValue } from '../statsUtils';

import CheckboxField from '../fields/CheckboxField.jsx';
import CountryField from '../fields/CountryField.jsx';
import UNLocationField from '../fields/UNLocationField.jsx';

import { UNLocations } from '../../api/unlocations/unlocations-collection';
import { Countries } from '../../api/countries/countries-collection';
import { Quotes } from '../../api/quotes/quotesCollection';

const getQuoteStats = quotes => ({
  pickupCountry: countByValue(quotes, 'movement.pickup.country'),
  pickupLocation: countByValue(quotes, 'movement.pickup.location'),
  deliveryCountry: countByValue(quotes, 'movement.delivery.country'),
  deliveryLocation: countByValue(quotes, 'movement.delivery.location'),
});

class NewQuote extends React.Component {
  constructor(props) {
    super(props);
    this.archive      = this.archive.bind(this);
    this.saveAndClose = this.saveAndClose.bind(this);
    this.getRates     = this.getRates.bind(this);
    this.PackageLines = this.PackageLines.bind(this);
    this.Containers   = this.Containers.bind(this);

    this.quoteStats = getQuoteStats(props.quotes);
  }

  componentWillMount() {
    this.props.onLoad(Quotes.findOne(this.props.match.params.quoteId));
  }

  getRates() {
    Meteor.call(
      'quote.save',
      { ...this.props.quote, _id: this.props.match.params.quoteId },
      () => this.props.history.push(
        `/customers/${this.props.match.params.customerId}/quotes/${this.props.match.params.quoteId}/charges`,
      ),
    );
  }

  saveAndClose() {
    Meteor.call(
      'quote.save',
      { ...this.props.quote, _id: this.props.match.params.quoteId },
      () => this.props.history.push(
        `/customers/${this.props.match.params.customerId}/overview`,
      ),
    );
  }

  archive() {

  }

  PackageLines() {
    return (
      <div className="">
        <div className="">
          <div className="package-row-header">
            <button
              className="cargo-row-icon"
              onClick={() => this.props.onAddPackageLine()}
              disabled={this.props.cargo.ratedQuote}
            >
              <span className="fa fa-fw fa-plus-square" />
            </button>
            <div className="package-type">
              <div className="label">
                PACKAGE TYPE
              </div>
            </div>
            <div className="num-packages">
              <div className="label">
                # PKGS
              </div>
            </div>
            <div className="dimensions">
              <div className="label">
                DIMENSIONS / PKG
              </div>
            </div>
            <div className="weight">
              <div className="label">
                WEIGHT / PKG
              </div>
            </div>
          </div>
          {this.props.cargo.packageLines.map((packageLine, index) => (
            <div key={index} className="package-row">
              <button
                className="cargo-row-icon"
                onClick={() => this.props.onRemovePackageLine(index)}
                disabled={this.props.cargo.ratedQuote}
              >
                <span className="fa fa-fw fa-minus-square" />
              </button>
              <div className="package-type">
                <Select
                  value={packageLine.packageType}
                  options={[
                    { value: 'Packages', label: 'Packages' },
                    { value: 'Boxes', label: 'Boxes' },
                    { value: 'Pallets', label: 'Pallets' },
                  ]}
                  clearable={false}
                  onChange={selectedValue => this.props.onChangePackageType(index, selectedValue.value)}
                  disabled={this.props.cargo.ratedQuote}
                />
              </div>
              <div className="num-packages">
                <input
                  className="input-numeric"
                  type="number"
                  placeholder=""
                  value={packageLine.numPackages}
                  onChange={e => this.props.onChangeNumPackages(index, e.target.value === '' ? '' : +e.target.value)}
                  disabled={this.props.cargo.ratedQuote}
                />
              </div>
              <div className="dimensions">
                <div className="input-group">
                  <input
                    className="input-group-first"
                    type="number"
                    placeholder="L"
                    value={packageLine.length}
                    onChange={e => this.props.onChangeLength(index, e.target.value === '' ? '' : +e.target.value)}
                    disabled={this.props.cargo.ratedQuote}
                  />
                  <input
                    className="input-group-middle"
                    type="number"
                    placeholder="W"
                    value={packageLine.width}
                    onChange={e => this.props.onChangeWidth(index, e.target.value === '' ? '' : +e.target.value)}
                    disabled={this.props.cargo.ratedQuote}
                  />
                  <input
                    className="input-group-middle"
                    type="number"
                    placeholder="H"
                    value={packageLine.height}
                    onChange={e => this.props.onChangeHeight(index, e.target.value === '' ? '' : +e.target.value)}
                    disabled={this.props.cargo.ratedQuote}
                  />
                  <Select
                    className="input-group-last addon"
                    value={packageLine.unitVolumeUOM}
                    options={[
                      { value: 'cm', label: 'cm' },
                      { value: 'in', label: 'in' },
                    ]}
                    clearable={false}
                    onChange={selectedValue =>
                      this.props.onChangePackageLineUnitVolumeUOM(index, selectedValue.value)}
                    arrowRenderer={() => false}
                    searchable={false}
                    disabled={this.props.cargo.ratedQuote}
                  />
                </div>
              </div>
              <div className="weight">
                <div className="input-group">
                  <input
                    className="input-group-first"
                    type="number"
                    placeholder="Weight"
                    value={packageLine.weight}
                    onChange={e => this.props.onChangeWeight(index, e.target.value === '' ? '' : +e.target.value)}
                    disabled={this.props.cargo.ratedQuote}
                  />
                  <Select
                    className="input-group-last addon"
                    value={packageLine.weightUOM}
                    options={[
                      { value: 'kg', label: 'kg' },
                      { value: 'lb', label: 'lb' },
                    ]}
                    clearable={false}
                    onChange={selectedValue =>
                      this.props.onChangePackageLineWeightUOM(index, selectedValue.value)}
                    arrowRenderer={() => false}
                    searchable={false}
                    disabled={this.props.cargo.ratedQuote}
                  />
                </div>
              </div>
              <div className="totals">
              <span className="value">
                {integerFormat(packageLine.numPackages || 0)}
              </span>
                &nbsp;pkgs,&nbsp;
                <span className="value">
                {weightFormat(packageLine.volume)}
              </span>
                &nbsp;{packageLine.volumeUOM},&nbsp;
                <span className="value">
                {weightFormat(packageLine.totalWeight)}
              </span>
                &nbsp;{packageLine.weightUOM}
              </div>
            </div>
          ))}
        </div>
        <div className="edit-group-footer">
          <div className="cargo-row-icon" />
          <CheckboxField
            className="checkbox-hazardous"
            onClick={this.props.onClickHazardous}
            value={this.props.cargo.hazardous}
            label="HAZARDOUS"
          />
          <CheckboxField
            className="checkbox-temperature-controlled"
            onClick={this.props.onClickTemperatureControlled}
            value={this.props.cargo.temperatureControlled}
            label="TEMPERATURE CONTROLLED"
          />
          <div className="edit-group-totals">
            <span className="total-shipment-label">
              TOTAL
            </span>
          </div>
          <div className="total-values">
            <span className="total-shipment-value">
              {integerFormat(this.props.cargo.totalPackages)}
            </span> pkgs,&nbsp;
            <span className="total-shipment-value">
              {weightFormat(this.props.cargo.totalVolume)}
            </span> {this.props.cargo.volumeUOM},&nbsp;
            <span className="total-shipment-value">
              {weightFormat(this.props.cargo.totalWeight)}
            </span> {this.props.cargo.weightUOM}
          </div>
        </div>
      </div>
    );
  }

  Containers() {
    return (
      <div className="">
        <div className="">
          <div className="container-header">
            <button
              className="cargo-row-icon"
              onClick={() => this.props.onAddContainerLine()}
              disabled={this.props.cargo.ratedQuote}
            >
              <span className="fa fa-fw fa-plus-square" />
            </button>
            <div className="num-containers">
              <div className="label">
                QUANTITY
              </div>
            </div>
            <div className="container-type">
              <div className="label">
                CONTAINER TYPE
              </div>
            </div>
          </div>
          {
            this.props.cargo.containerLines.map((containerLine, index) => (
              <div key={index} className="container-row">
                <button
                  className="cargo-row-icon"
                  onClick={() => this.props.onRemoveContainerLine(index)}
                  disabled={this.props.cargo.ratedQuote}
                >
                  <span className="fa fa-fw fa-minus-square" />
                </button>
                <div className="num-containers">
                  <input
                    value={containerLine.numContainers}
                    onChange={e => this.props.onChangeContainerLineNumContainers(index, +e.target.value)}
                    disabled={this.props.cargo.ratedQuote}
                  />
                </div>
                <div className="container-type">
                  <button
                    className={`radio-button ${containerLine.containerType === '20\'' ? 'active' : ''}`}
                    onClick={() => this.props.onChangeContainerLineContainerType(index, '20\'')}
                    disabled={this.props.cargo.ratedQuote}
                  >
                    20&apos;
                  </button>
                  <button
                    className={`radio-button ${containerLine.containerType === '40\'' ? 'active' : ''}`}
                    onClick={() => this.props.onChangeContainerLineContainerType(index, '40\'')}
                    disabled={this.props.cargo.ratedQuote}
                  >
                    40&apos;
                  </button>
                  <button
                    className={`radio-button ${containerLine.containerType === '40\'HC' ? 'active' : ''}`}
                    onClick={() => this.props.onChangeContainerLineContainerType(index, '40\'HC')}
                    disabled={this.props.cargo.ratedQuote}
                  >
                    40&apos;HC
                  </button>
                  <button
                    className={`radio-button ${containerLine.containerType === '45\'HC' ? 'active' : ''}`}
                    onClick={() => this.props.onChangeContainerLineContainerType(index, '45\'HC')}
                    disabled={this.props.cargo.ratedQuote}
                  >
                    45&apos;HC
                  </button>
                </div>
                <div className="field checkbox-temperature-controlled">
                  <button
                    className="checkbox"
                    onClick={() => this.props.onClickContainerLineTemperatureControlled(index)}
                    disabled={this.props.cargo.ratedQuote}
                  >
                  <span
                    className={`fa fa-fw ${containerLine.temperatureControlled ? 'fa-check' : ' '}`}
                  />
                  </button>
                  <div className="checkbox-label">TEMPERATURE CONTROLLED</div>
                </div>
              </div>
            ))
          }
        </div>
        <div className="edit-group-footer">
          <div className="cargo-row-icon" />
          <CheckboxField
            className="checkbox-hazardous"
            onClick={this.props.onClickHazardous}
            value={this.props.cargo.hazardous}
            label="HAZARDOUS"
          />
          <div className="edit-group-totals">
            <span className="total-shipment-label">
              TOTAL
            </span>
          </div>
          <div className="total-values">
            <span className="total-shipment-value">
            {integerFormat(this.props.cargo.totalContainers)}
          </span> CONTAINERS,&nbsp;
            <span className="total-shipment-value">
            {integerFormat(this.props.cargo.totalTEU)}
          </span> TEU&nbsp;
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="new-quote">
        <div className="process-header">
          <div className="title">NEW QUOTE</div>
          <div className="breadcrumbs">
            <div className="breadcrumb active customer">HEADER</div>
            <div className="breadcrumb-end active customer" />
          </div>
        </div>
        <div className="panel container form-section">
          <div className="title">
            <div className="cargo-row-icon" />
            CARGO
          </div>
          <div className="input-row">
            <div className="cargo-row-icon" />
            <div className="input-group">
              <div className="button-group col-6">
                <button
                  className={`radio-button ${this.props.cargo.cargoType === 'Loose' ? 'active' : 'inactive'}`}
                  onClick={() => this.props.onChangeCargoType('Loose')}
                >
                  LOOSE
                </button>
                <button
                  className={`radio-button ${this.props.cargo.cargoType === 'Containerized' ? 'active' : 'inactive'}`}
                  onClick={() => this.props.onChangeCargoType('Containerized')}
                >
                  CONTAINERIZED
                </button>
              </div>
              <div className="button-group col-6">
                <button
                  className={`radio-button ${this.props.cargo.ratedQuote ? 'inactive' : 'active'}`}
                  onClick={() => this.props.onChangeRatedQuote()}
                >
                  ITEMIZED
                </button>
                <button
                  className={`radio-button ${this.props.cargo.ratedQuote ? 'active' : 'inactive'}`}
                  onClick={() => this.props.onChangeRatedQuote()}
                >
                  RATED
                </button>
              </div>
            </div>
          </div>
          {this.props.cargo.cargoType === 'Loose' ? this.PackageLines() : ''}
          {this.props.cargo.cargoType === 'Containerized' ? this.Containers() : ''}
        </div>
        <div className="panel container form-section">
          <div className="">
            <div className="pickup-delivery-wrapper">
              <div className="pickup">
                <div className="title">
                  <div className="cargo-row-icon" />
                  ROUTING
                </div>
                <div className="cargo-row-icon" />
                <div className="field select-country">
                  <div className="label">
                    COUNTRY
                  </div>
                  <CountryField
                    value={this.props.movement.pickup.country}
                    onChange={selectedValue => this.props.onChangePickupCountry(selectedValue.value)}
                    countries={Countries}
                    topCountries={this.quoteStats.pickupCountry}
                  />
                </div>
                <div className="field select-country">
                  <div className="label">
                    LOCATION
                  </div>
                  <UNLocationField
                    value={this.props.movement.pickup.location}
                    country={this.props.movement.pickup.country}
                    onChange={selectedValue => this.props.onChangePickupLocation(selectedValue.value)}
                    unLocations={UNLocations}
                    topLocations={this.quoteStats.pickupLocation}
                  />
                </div>
                <div className="to-label">TO</div>
                <div className="field select-country">
                  <div className="label">
                    COUNTRY
                  </div>
                  <CountryField
                    value={this.props.movement.delivery.country}
                    onChange={selectedValue => this.props.onChangeDeliveryCountry(selectedValue.value)}
                    countries={Countries}
                    topCountries={this.quoteStats.deliveryCountry}
                  />
                </div>
                <div className="field select-country">
                  <div className="label">
                    LOCATION
                  </div>
                  <UNLocationField
                    value={this.props.movement.delivery.location}
                    country={this.props.movement.delivery.country}
                    onChange={selectedValue => this.props.onChangeDeliveryLocation(selectedValue.value)}
                    unLocations={UNLocations}
                    topLocations={this.quoteStats.deliveryLocation}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="panel container form-section">
          <div className="">
            <div className="pickup-delivery-wrapper">
              <div className="pickup">

                <div className="title">
                  <div className="cargo-row-icon" />
                  OTHER SERVICES
                </div>
                <div className="cargo-row-icon" />
                <CheckboxField
                  className="checkbox-hazardous"
                  onClick={this.props.onClickInsurance}
                  value={this.props.otherServices.insurance}
                  label="INSURANCE"
                />
                <CheckboxField
                  className="checkbox-temperature-controlled"
                  onClick={this.props.onClickCustomsClearance}
                  value={this.props.otherServices.customsClearance}
                  label="CUSTOMS CLEARANCE"
                />
              </div>
              <div className="form-button-group">
                <button className="delete-button" onClick={this.archive}>ARCHIVE</button>
                <button className="save-button" onClick={this.saveAndClose}>SAVE AND CLOSE</button>
                <button className="submit-button" onClick={this.getRates}>
                  EDIT CHARGES
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default NewQuote;
