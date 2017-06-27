import React from 'react';
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';

import Select from 'react-select';

import { APIGlobals } from '../../api/api-globals';

const EditRate = props => (
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
          <button className="button-primary">BACK TO BRANCH LIST</button>
        </Link>
      </div>
      <div className="panel container">
        <div className="row">
          <div className="col">
            <div className="vertical-input-group">
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
            <div className="vertical-input-group">
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
                  { value: 'ICC', label: 'Import Customs Clearance – DOC' },
                ]}
                onChange={selected => props.dispatchers.onChangeRateChargeCode(
                  selected.value)}
                clearRenderer={() => null}
                arrowRenderer={() => null}
                placeholder=""
                clearable={false}
              />
            </div>
            <div className="vertical-input-group">
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
            <div className="vertical-input-group">
              <span className="label">ROUTE</span>
              <input
                value={props.rate.route}
                onChange={
                  e => props.dispatchers.onChangeRateRoute(e.target.value)
                }
              />
            </div>
            <div className="vertical-input-group">
              <span className="label">BASIS</span>
              <Select
                value={props.rate.basis}
                options={APIGlobals.rateBasisOptions}
                onChange={selected => props.dispatchers.onChangeRateBasis(
                  selected.value)}
                clearRenderer={() => null}
                arrowRenderer={() => null}
                placeholder=""
                clearable={false}
              />
            </div>
            <div className="vertical-input-group">
              <span className="label">UNIT PRICE</span>
              <input
                value={props.rate.unitPrice}
                onChange={e => props.dispatchers.onChangeRateUnitPrice(
                  e.target.value)}
              />
            </div>
            <div className="vertical-input-group">
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
              <span className="label">MINIMUM AMOUNT</span>
              <input
                value={props.rate.minimumAmount}
                onChange={e => props.dispatchers.onChangeRateMinimumAmount(
                  e.target.value)}
              />
            </div>
          </div>
        </div>
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
    <div className="content-footer-accent rate-footer-accent" />
  </div>
);

export default EditRate;
