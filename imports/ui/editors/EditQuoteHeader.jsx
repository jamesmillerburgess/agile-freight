import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { Meteor } from 'meteor/meteor';

import { integerFormat, weightFormat } from '../formatters/numberFormatters';
import { countByValue } from '../statsUtils';

import CheckboxField from '../fields/CheckboxField.jsx';
import CountryField from '../fields/CountryField.jsx';
import UNLocationField from '../fields/UNLocationField.jsx';
import QuoteContainer from '../objects/QuoteContainer';

import { quotePropTypes } from '../objects/quotePropTypes';

import { Countries } from '../../api/countries/countriesCollection';
import { Quotes } from '../../api/quotes/quotesCollection';

class EditQuoteHeader extends React.Component {
  constructor(props) {
    super(props);
    this.archive      = this.archive.bind(this);
    this.save         = this.save.bind(this);
    this.getRates     = this.getRates.bind(this);
    this.PackageLines = this.PackageLines.bind(this);
    this.Containers   = this.Containers.bind(this);
    props.dispatchers.onLoad(Quotes.findOne(props.match.params.quoteId));
  }

  componentWillMount() {

  }

  getRates() {
    Meteor.call(
      'quote.save',
      { ...this.props.quote, _id: this.props.match.params.quoteId },
      () => this.props.history.push(
        `/customers/view/${this.props.match.params.customerId}/quotes/${this.props.match.params.quoteId}/charges`,
      ),
    );
  }

  save() {
    Meteor.call('quote.save',
      { ...this.props.quote, _id: this.props.match.params.quoteId });
  }

  archive() {
    Meteor.call(
      'quote.archive',
      this.props.match.params.quoteId,
      () => this.props.history.push(
        `/customers/view/${this.props.match.params.customerId}/overview`,
      ),
    );
  }

  PackageLines() {
    return (
      <div className="">
        <div className="">
          <div className="package-row-header">
            <button
              className="cargo-row-icon"
              onClick={() => this.props.dispatchers.onAddPackageLine()}
              disabled={this.props.quote.cargo.ratedQuote}
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
          {this.props.quote.cargo.packageLines.map((packageLine, index) => (
            <div key={index} className="package-row">
              <button
                className="cargo-row-icon"
                onClick={() => this.props.dispatchers.onRemovePackageLine(index)}
                disabled={this.props.quote.cargo.ratedQuote}
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
                    { value: 'Cases', label: 'Cases' },
                  ]}
                  clearable={false}
                  onChange={selectedValue => this.props.dispatchers
                                                 .onChangePackageType(index,
                                                   selectedValue.value)}
                  disabled={this.props.quote.cargo.ratedQuote}
                />
              </div>
              <div className="num-packages">
                <input
                  className="input-numeric"
                  type="number"
                  placeholder=""
                  value={packageLine.numPackages}
                  onChange={e => this.props.dispatchers.onChangeNumPackages(
                    index,
                    e.target.value === '' ? '' : +e.target.value)}
                  disabled={this.props.quote.cargo.ratedQuote}
                />
              </div>
              <div className="dimensions">
                <div className="input-group">
                  <input
                    className="input-group-first"
                    type="number"
                    placeholder="L"
                    value={packageLine.length}
                    onChange={e => this.props.dispatchers.onChangeLength(index,
                      e.target.value === '' ? '' : +e.target.value)}
                    disabled={this.props.quote.cargo.ratedQuote}
                  />
                  <input
                    className="input-group-middle"
                    type="number"
                    placeholder="W"
                    value={packageLine.width}
                    onChange={e => this.props.dispatchers.onChangeWidth(index,
                      e.target.value === '' ? '' : +e.target.value)}
                    disabled={this.props.quote.cargo.ratedQuote}
                  />
                  <input
                    className="input-group-middle"
                    type="number"
                    placeholder="H"
                    value={packageLine.height}
                    onChange={e => this.props.dispatchers.onChangeHeight(index,
                      e.target.value === '' ? '' : +e.target.value)}
                    disabled={this.props.quote.cargo.ratedQuote}
                  />
                  <Select
                    className="input-group-last addon"
                    value={packageLine.unitVolumeUOM}
                    options={[
                      { value: 'cm', label: 'cm' },
                      { value: 'in', label: 'in' },
                    ]}
                    clearable={false}
                    onChange={selectedValue => this.props.dispatchers
                                                   .onChangePackageLineUnitVolumeUOM(
                                                     index,
                                                     selectedValue.value)}
                    arrowRenderer={() => false}
                    searchable={false}
                    disabled={this.props.quote.cargo.ratedQuote}
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
                    onChange={e => this.props.dispatchers.onChangeWeight(index,
                      e.target.value === '' ? '' : +e.target.value)}
                    disabled={this.props.quote.cargo.ratedQuote}
                  />
                  <Select
                    className="input-group-last addon"
                    value={packageLine.weightUOM}
                    options={[
                      { value: 'kg', label: 'kg' },
                      { value: 'lb', label: 'lb' },
                    ]}
                    clearable={false}
                    onChange={selectedValue => this.props.dispatchers
                                                   .onChangePackageLineWeightUOM(
                                                     index,
                                                     selectedValue.value)}
                    arrowRenderer={() => false}
                    searchable={false}
                    disabled={this.props.quote.cargo.ratedQuote}
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
            onClick={this.props.dispatchers.onClickHazardous}
            value={this.props.quote.cargo.hazardous}
            label="HAZARDOUS"
          />
          <CheckboxField
            className="checkbox-temperature-controlled"
            onClick={this.props.dispatchers.onClickTemperatureControlled}
            value={this.props.quote.cargo.temperatureControlled}
            label="TEMPERATURE CONTROLLED"
          />
          <div className="edit-group-totals">
            <span className="total-shipment-label">
              TOTAL
            </span>
          </div>
          <div className="total-values">
            <span className="total-shipment-value">
              {integerFormat(this.props.quote.cargo.totalPackages)}
            </span> pkgs,&nbsp;
            <span className="total-shipment-value">
              {weightFormat(this.props.quote.cargo.totalVolume)}
            </span> {this.props.quote.cargo.volumeUOM},&nbsp;
            <span className="total-shipment-value">
              {weightFormat(this.props.quote.cargo.totalWeight)}
            </span> {this.props.quote.cargo.weightUOM}
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
              onClick={() => this.props.dispatchers.onAddContainerLine()}
              disabled={this.props.quote.cargo.ratedQuote}
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
            this.props.quote.cargo.containerLines.map((containerLine,
                                                       index) => (
              <div key={index} className="container-row">
                <button
                  className="cargo-row-icon"
                  onClick={() => this.props.dispatchers.onRemoveContainerLine(
                    index)}
                  disabled={this.props.quote.cargo.ratedQuote}
                >
                  <span className="fa fa-fw fa-minus-square" />
                </button>
                <div className="num-containers">
                  <input
                    value={containerLine.numContainers}
                    onChange={e => this.props.dispatchers
                                       .onChangeContainerLineNumContainers(index,
                                         +e.target.value)}
                    disabled={this.props.quote.cargo.ratedQuote}
                  />
                </div>
                <div className="container-type">
                  <button
                    className={`radio-button ${containerLine.containerType ===
                                               '20\'' ? 'active' : ''}`}
                    onClick={() => this.props.dispatchers.onChangeContainerLineContainerType(
                      index,
                      '20\'')}
                    disabled={this.props.quote.cargo.ratedQuote}
                  >
                    20&apos;
                  </button>
                  <button
                    className={`radio-button ${containerLine.containerType ===
                                               '40\'' ? 'active' : ''}`}
                    onClick={() => this.props.dispatchers.onChangeContainerLineContainerType(
                      index,
                      '40\'')}
                    disabled={this.props.quote.cargo.ratedQuote}
                  >
                    40&apos;
                  </button>
                  <button
                    className={`radio-button ${containerLine.containerType ===
                                               '40\'HC' ? 'active' : ''}`}
                    onClick={() => this.props.dispatchers.onChangeContainerLineContainerType(
                      index,
                      '40\'HC')}
                    disabled={this.props.quote.cargo.ratedQuote}
                  >
                    40&apos;HC
                  </button>
                  <button
                    className={`radio-button ${containerLine.containerType ===
                                               '45\'HC' ? 'active' : ''}`}
                    onClick={() => this.props.dispatchers.onChangeContainerLineContainerType(
                      index,
                      '45\'HC')}
                    disabled={this.props.quote.cargo.ratedQuote}
                  >
                    45&apos;HC
                  </button>
                </div>
                <div className="field checkbox-temperature-controlled">
                  <button
                    className="checkbox"
                    onClick={() =>
                      this.props.dispatchers.onClickContainerLineTemperatureControlled(
                        index)}
                    disabled={this.props.quote.cargo.ratedQuote}
                  >
                    <span
                      className={`fa fa-fw ${containerLine.temperatureControlled ?
                                             'fa-check' : ' '}`}
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
            onClick={this.props.dispatchers.onClickHazardous}
            value={this.props.quote.cargo.hazardous}
            label="HAZARDOUS"
          />
          <div className="edit-group-totals">
            <span className="total-shipment-label">
              TOTAL
            </span>
          </div>
          <div className="total-values">
            <span className="total-shipment-value">
              {integerFormat(this.props.quote.cargo.totalContainers)}
            </span> CONTAINERS,&nbsp;
            <span className="total-shipment-value">
              {integerFormat(this.props.quote.cargo.totalTEU)}
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
          <button
            className="button-primary"
            onClick={() => this.props.history.push(`/customers/view/${this.props.match.params.customerId}/overview`)}
          >
            BACK TO CUSTOMER
          </button>
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
                  className={`radio-button ${this.props.quote.cargo.cargoType ===
                                             'Loose' ? 'active' : 'inactive'}`}
                  onClick={() => this.props.dispatchers.onChangeCargoType(
                    'Loose')}
                >
                  LOOSE
                </button>
                <button
                  className={`radio-button ${this.props.quote.cargo.cargoType ===
                                             'Containerized' ? 'active' :
                                             'inactive'}`}
                  onClick={() => this.props.dispatchers.onChangeCargoType(
                    'Containerized')}
                >
                  CONTAINERIZED
                </button>
              </div>
              <div className="button-group col-6">
                <button
                  className={`radio-button ${this.props.quote.cargo.ratedQuote ?
                                             'inactive' : 'active'}`}
                  onClick={() => this.props.dispatchers.onChangeRatedQuote()}
                >
                  ITEMIZED
                </button>
                <button
                  className={`radio-button ${this.props.quote.cargo.ratedQuote ?
                                             'active' : 'inactive'}`}
                  onClick={() => this.props.dispatchers.onChangeRatedQuote()}
                >
                  RATED
                </button>
              </div>
            </div>
          </div>
          {this.props.quote.cargo.cargoType === 'Loose' ? this.PackageLines() :
           ''}
          {this.props.quote.cargo.cargoType === 'Containerized' ?
           this.Containers() : ''}
        </div>
        <div className="panel container form-section">
          <div className="">
            <div className="title">
              <div className="cargo-row-icon" />
              ROUTING
            </div>
            <div className="pickup-delivery-wrapper">
              <div className="cargo-row-icon" />
              <div className="field select-country">
                <div className="label">
                  MODE
                </div>
                <Select
                  value={this.props.quote.movement.mode}
                  options={[
                    { value: 'Air', label: 'Air' },
                    { value: 'Sea', label: 'Sea' },
                    { value: 'Road', label: 'Road' },
                  ]}
                  onChange={selectedValue =>
                    this.props.dispatchers.onChangeMovementMode(selectedValue.value)}
                />
              </div>
            </div>
            <div className="pickup-delivery-wrapper">
              <div className="pickup">
                <div className="cargo-row-icon" />
                <div className="field select-country">
                  <div className="label">
                    COUNTRY
                  </div>
                  <CountryField
                    value={this.props.quote.movement.pickup.country}
                    onChange={selectedValue =>
                      this.props.dispatchers.onChangePickupCountry(selectedValue.value)}
                    countries={Countries}
                  />
                </div>
                <div className="field select-country">
                  <div className="label">
                    LOCATION
                  </div>
                  <UNLocationField
                    value={this.props.quote.movement.pickup.location}
                    country={this.props.quote.movement.pickup.country}
                    onChange={(selectedValue) => {
                      this.props.dispatchers
                          .onChangePickupLocation(selectedValue.value);
                      this.props.dispatchers
                          .onChangePickupLocationName(selectedValue.label);
                      let locationType = 'Door';
                      if (selectedValue.isAirport) {
                        locationType = 'Airport';
                      }
                      if (selectedValue.isSeaport) {
                        locationType = 'Seaport';
                      }
                      if (!selectedValue.value) {
                        locationType = '';
                      }
                      this.props.dispatchers
                          .onChangePickupLocationType(locationType);
                    }}
                  />
                </div>
                <div className="to-label">TO</div>
                <div className="field select-country">
                  <div className="label">
                    COUNTRY
                  </div>
                  <CountryField
                    value={this.props.quote.movement.delivery.country}
                    onChange={selectedValue =>
                      this.props.dispatchers.onChangeDeliveryCountry(
                        selectedValue.value)}
                    countries={Countries}
                  />
                </div>
                <div className="field select-country">
                  <div className="label">
                    LOCATION
                  </div>
                  <UNLocationField
                    value={this.props.quote.movement.delivery.location}
                    country={this.props.quote.movement.delivery.country}
                    onChange={(selectedValue) => {
                      this.props.dispatchers
                          .onChangeDeliveryLocation(selectedValue.value);
                      this.props.dispatchers
                          .onChangeDeliveryLocationName(selectedValue.label);
                      let locationType = 'Door';
                      if (selectedValue.isAirport) {
                        locationType = 'Airport';
                      }
                      if (selectedValue.isSeaport) {
                        locationType = 'Seaport';
                      }
                      if (!selectedValue.value) {
                        locationType = '';
                      }
                      this.props.dispatchers
                          .onChangeDeliveryLocationType(locationType);
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="edit-group-footer">
              <div className="edit-group-totals">
                <span className="total-shipment-label">
                  MOVEMENT
                </span>
              </div>
              <div className="total-values">
                {this.props.quote.movement.pickup.locationType || 'Door'}
                &nbsp;to&nbsp;
                {this.props.quote.movement.delivery.locationType || 'Door'}
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
                  onClick={this.props.dispatchers.onClickInsurance}
                  value={this.props.quote.otherServices.insurance}
                  label="INSURANCE"
                />
                <CheckboxField
                  className="checkbox-temperature-controlled"
                  onClick={this.props.dispatchers.onClickCustomsClearance}
                  value={this.props.quote.otherServices.customsClearance}
                  label="CUSTOMS CLEARANCE"
                />
              </div>
              <div className="form-button-group">
                <button className="delete-button" onClick={this.archive}>ARCHIVE</button>
                <button className="save-button" onClick={this.save}>SAVE</button>
                <button className="button-submit" onClick={this.getRates}>
                  EDIT CHARGES
                </button>
              </div>
            </div>
          </div>
        </div>
        <QuoteContainer quoteId={this.props.match.params.quoteId} />
      </div>
    );
  }
}

EditQuoteHeader.propTypes = {
  quote: quotePropTypes.isRequired,
  dispatchers: PropTypes.objectOf(PropTypes.func).isRequired,
  history: PropTypes.object.isRequired, // eslint-disable-line
                                        // react/forbid-prop-types
  match: PropTypes.object.isRequired, // eslint-disable-line
                                      // react/forbid-prop-types
};

export default EditQuoteHeader;

