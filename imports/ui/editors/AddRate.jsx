import React from 'react';
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';

import Select from 'react-select';

import { APIGlobals } from '../../api/api-globals';

const AddRate = props => (
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
                options={[{ value: 'ILT', label: 'Inland Transport' }]}
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
              />
            </div>
            <div className="vertical-input-group">
              <span className="label">CARRIER</span>
              <Select
                value={props.rate.carrier}
                options={[
                  { value: '', label: 'Agility Choice' },
                  { value: 'MAEU', label: 'Maersk – MAEU' },
                  { value: 'SUDU', label: 'Hamburg Sud – SUDU' },
                ]}
                onChange={selected => props.dispatchers.onChangeRateRoute(
                  selected.value)}
                clearRenderer={() => null}
                arrowRenderer={() => null}
                placeholder=""
                clearable={false}
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
          </div>
        </div>
        <button
          className="button-submit"
          onClick={() => {
            if (props.editMode) {
              Meteor.call(
                'rate.save',
                props.match.params.rateId,
                props.rate,
                () => {
                  props.history.push('/rates');
                },
              );
            } else {
              Meteor.call('rate.new', props.rate, () => {
                props.history.push('/rates');
              });
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

export default AddRate;
