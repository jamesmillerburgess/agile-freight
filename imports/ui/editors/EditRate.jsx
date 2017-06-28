import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';

import Select from 'react-select';

import CheckboxField from '../fields/CheckboxField.jsx';

import { APIGlobals } from '../../api/api-globals';

const EditRate = (props) => {
  const rangeEditor = (id) => {
    const range = props.rate.ranges[id];
    return (
      <div key={id} className="input-row">
        <button
          className="remove-row-button"
          onClick={() => props.dispatchers.onRemoveRateRange(id)}
        >
          <span className="fa fa-fw fa-minus-square" />
        </button>
        <div className="input-col-4">
          <input
            value={range.unitPrice}
            onChange={e =>
              props.dispatchers
                   .onChangeRateRangeUnitPrice(id, e.target.value)}
          />
        </div>
        <div className="input-col-4">
          <input
            value={range.maximumUnits}
            onChange={e =>
              props.dispatchers
                   .onChangeRateRangeMaximumUnits(id, e.target.value)}
          />
        </div>
        <div className="input-col-4 vertical-input-group" />
        <div className="input-col-4 vertical-input-group" />
      </div>
    );
  };

  const splitRateEditor = () => (
    <div>
      <div className="title">LOOSE CARGO</div>
      <div className="input-row">
        <div className="input-col-4 vertical-input-group">
          <span className="label">BASIS</span>
          <Select
            value={props.rate.looseBasis}
            options={APIGlobals.rateBasisOptions}
            onChange={selected => props.dispatchers.onChangeLooseBasis(
              selected.value)}
            clearRenderer={() => null}
            arrowRenderer={() => null}
            placeholder=""
            clearable={false}
          />
        </div>
        <div className="input-col-4 vertical-input-group">
          <span className="label">MINIMUM AMOUNT</span>
          <input
            value={props.rate.looseMinimumAmount}
            onChange={e => props.dispatchers.onChangeLooseMinimumAmount(
              e.target.value)}
          />
        </div>
        <div className="input-col-4 vertical-input-group" />
        <div className="input-col-4 vertical-input-group" />
      </div>
      <div className="input-table">
        <div className="input-row">
          <button
            className="add-row-button"
            onClick={() => props.dispatchers.onAddLooseRateRange()}
          >
            <span className="fa fa-fw fa-plus-square" />
          </button>
          <div className="input-col-4 subtitle">
            UNIT PRICE
          </div>
          <div className="input-col-4 subtitle">RANGE MAXIMUM</div>
          <div className="input-col-4 vertical-input-group" />
          <div className="input-col-4 vertical-input-group" />
        </div>
        {props.rate.looseRanges.map(id => rangeEditor(id))}
      </div>
      <div className="title">CONTAINERIZED CARGO</div>
      <div className="input-row">
        <div className="input-col-4 vertical-input-group">
          <span className="label">BASIS</span>
          <Select
            value={props.rate.containerizedBasis}
            options={APIGlobals.rateBasisOptions}
            onChange={selected => props.dispatchers.onChangeContainerizedBasis(
              selected.value)}
            clearRenderer={() => null}
            arrowRenderer={() => null}
            placeholder=""
            clearable={false}
          />
        </div>
        <div className="input-col-4 vertical-input-group">
          <span className="label">MINIMUM AMOUNT</span>
          <input
            value={props.rate.containerizedMinimumAmount}
            onChange={e => props.dispatchers.onChangeContainerizedMinimumAmount(
              e.target.value)}
          />
        </div>
        <div className="input-col-4 vertical-input-group" />
        <div className="input-col-4 vertical-input-group" />
      </div>
      <div className="input-table">
        <div className="input-row">
          <button
            className="add-row-button"
            onClick={() => props.dispatchers.onAddContainerizedRateRange()}
          >
            <span className="fa fa-fw fa-plus-square" />
          </button>
          <div className="input-col-4 subtitle">
            UNIT PRICE
          </div>
          <div className="input-col-4 subtitle">RANGE MAXIMUM</div>
          <div className="input-col-4 vertical-input-group" />
          <div className="input-col-4 vertical-input-group" />
        </div>
        {props.rate.containerizedRanges.map(id => rangeEditor(id))}
      </div>
    </div>
  );

  const rateEditor = () => (
    <div>
      <div className="input-row">
        <div className="input-col-4 vertical-input-group">
          <span className="label">BASIS</span>
          <Select
            value={props.rate.anyBasis}
            options={APIGlobals.rateBasisOptions}
            onChange={selected => props.dispatchers.onChangeAnyBasis(
              selected.value)}
            clearRenderer={() => null}
            arrowRenderer={() => null}
            placeholder=""
            clearable={false}
          />
        </div>
        <div className="input-col-4 vertical-input-group">
          <span className="label">MINIMUM AMOUNT</span>
          <input
            value={props.rate.anyMinimumAmount}
            onChange={e => props.dispatchers.onChangeAnyMinimumAmount(
              e.target.value)}
          />
        </div>
        <div className="input-col-4 vertical-input-group" />
        <div className="input-col-4 vertical-input-group" />
      </div>
      <div className="input-table">
        <div className="input-row">
          <button
            className="add-row-button"
            onClick={() => props.dispatchers.onAddAnyRateRange()}
          >
            <span className="fa fa-fw fa-plus-square" />
          </button>
          <div className="input-col-4 subtitle">
            UNIT PRICE
          </div>
          <div className="input-col-4 subtitle">RANGE MAXIMUM</div>
          <div className="input-col-4 vertical-input-group" />
          <div className="input-col-4 vertical-input-group" />
        </div>
        {props.rate.anyRanges.map(id => rangeEditor(id))}
      </div>
    </div>
  );

  return (
    <div>
      <div className="content rate">
        <div className="process-header">
          <div className="title">
            {
              props.editMode ?
              'EDIT RATE' :
              'NEW RATE'
            }
          </div>
          <Link to="/branches">
            <button className="button-primary">BACK TO RATE LIST</button>
          </Link>
        </div>
        <div className="panel">
          <div className="form">
            <div className="title">RATE APPLICABILITY</div>
            <div className="input-row">
              <div className="input-col-4 vertical-input-group">
                <span className="label">TYPE</span>
                <Select
                  value={props.rate.type}
                  options={[{ value: 'sell', label: 'Sell' }]}
                  onChange={selected => props.dispatchers.onChangeRateType(
                    selected.value)}
                  clearRenderer={() => null}
                  arrowRenderer={() => null}
                  placeholder=""
                  clearable={false}
                />
              </div>
              <div className="input-col-4 vertical-input-group">
                <span className="label">CHARGE</span>
                <Select
                  value={props.rate.chargeCode}
                  options={[
                    { value: 'ITP', label: 'Inland Transport – ITP' },
                    { value: 'FSC', label: 'Fuel Surcharge – FSC' },
                    { value: 'THC', label: 'Terminal Handling Charge – THC' },
                    { value: 'IFR', label: 'International Freight – IFR' },
                    { value: 'CSY', label: 'Carrier Security – CSY' },
                    { value: 'DOC', label: 'Documentation – DOC' },
                    { value: 'ICC', label: 'Import Customs Clearance – ICC' },
                    { value: 'ECC', label: 'Export Customs Clearance – ECC' },
                    { value: 'VGM', label: 'Verified Gross Mass – VGM' },
                  ]}
                  onChange={
                    selected => props.dispatchers.onChangeRateChargeCode(
                      selected.value)}
                  clearRenderer={() => null}
                  arrowRenderer={() => null}
                  placeholder=""
                  clearable={false}
                />
              </div>
              <div className="input-col-4 vertical-input-group">
                <span className="label">LEVEL</span>
                <Select
                  value={props.rate.level}
                  options={[
                    { value: 'carrier', label: 'Carrier' },
                    { value: 'location', label: 'Location' },
                    { value: 'country', label: 'Country' },
                    { value: 'global', label: 'Global' },
                  ]}
                  onChange={selected => props.dispatchers.onChangeRateLevel(
                    selected.value)}
                  clearRenderer={() => null}
                  arrowRenderer={() => null}
                  placeholder=""
                  clearable={false}
                />
              </div>
              <div className="input-col-4 vertical-input-group">
                <span className="label">ROUTE</span>
                <input
                  value={props.rate.route}
                  onChange={
                    e => props.dispatchers.onChangeRateRoute(e.target.value)
                  }
                />
              </div>
            </div>
            <div className="title">RATE VALUE</div>
            <div className="input-col-4 vertical-input-group">
              <span className="label">CURRENCY</span>
              <Select
                value={props.rate.currency}
                options={APIGlobals.currencyOptions}
                onChange={selected => props.dispatchers.onChangeRateCurrency(
                  selected.value)}
                clearRenderer={() => null}
                arrowRenderer={() => null}
                placeholder=""
                clearable={false}
              />
            </div>
            <div className="vertical-input-group">
              <CheckboxField
                label="SEPARATE RATES FOR LOOSE AND CONTAINERIZED CARGO"
                value={props.rate.isSplitByCargoType}
                onClick={() => props.dispatchers.onChangeIsSplitByCargoType()}
              />
            </div>
            {
              props.rate.isSplitByCargoType ?
              splitRateEditor() :
              rateEditor()
            }
            <button
              className="button-submit"
              onClick={() => {
                if (props.editMode) {
                  Meteor.call(
                    'rates.save',
                    props.match.params.rateId,
                    {
                      ...props.rate,
                      unitPrice: +props.rate.unitPrice,
                      minimumAmount: +props.rate.minimumAmount,
                    },
                    () => {
                      props.history.push('/rates');
                    },
                  );
                } else {
                  Meteor.call(
                    'rates.new',
                    {
                      ...props.rate,
                      unitPrice: +props.rate.unitPrice,
                      minimumAmount: +props.rate.minimumAmount,
                    },
                    (err, res) => {
                      props.history.push('/rates');
                    },
                  );
                }
              }}
            >
              SAVE RATE
            </button>
          </div>
        </div>
      </div>
      <div className="content-footer-accent rate-footer-accent" />
    </div>
  );
};

EditRate.propTypes = {
  rate: PropTypes.shape({
    type: PropTypes.string,
    chargeCode: PropTypes.string,
    level: PropTypes.string,
    route: PropTypes.string,
    isSplitByCargoType: PropTypes.bool,
    anyBasis: PropTypes.string,
    anyRanges: PropTypes.arrayOf(PropTypes.string),
    anyMinimumAmount: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
    looseBasis: PropTypes.string,
    looseRanges: PropTypes.arrayOf(PropTypes.string),
    looseMinimumAmount: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
    containerizedBasis: PropTypes.string,
    containerizedRanges: PropTypes.arrayOf(PropTypes.string),
    containerizedMinimumAmount: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
    ranges: PropTypes.objectOf(PropTypes.shape({
      maximumUnits: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
      ]),
      unitPrice: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
      ]),
    })),
    currency: PropTypes.string,
  }).isRequired,
  dispatchers: PropTypes.objectOf(PropTypes.func).isRequired,
  editMode: PropTypes.bool,
};

EditRate.defaultProps = { editMode: false };

export default EditRate;
