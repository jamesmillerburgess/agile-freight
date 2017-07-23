import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';

import UNLocationField from '../fields/UNLocationField.jsx';

import { APIGlobals } from '../../api/api-globals';

const EditMovement = ({ movement, dispatchers }) => (
  <div>
    <div className="pickup-delivery-wrapper">
      <div className="cargo-row-icon" />
      <div className="field select-country">
        <div className="label">
          MODE
        </div>
        <Select
          value={movement.mode}
          options={[
            { value: 'Air', label: 'Air' },
            { value: 'Sea', label: 'Sea' },
            { value: 'Road', label: 'Road' },
            { value: 'Brokerage', label: 'Brokerage' },
          ]}
          onChange={selectedValue =>
            dispatchers.onChangeMovementMode(selectedValue.value)}
        />
      </div>
      <div className="field select-country">
        <div className="label">
          COMMERCIAL PARTY
        </div>
        <Select
          value={movement.commercialParty}
          options={APIGlobals.commercialPartyOptions}
          onChange={selectedValue =>
            dispatchers.onChangeMovementCommercialParty(selectedValue.value)}
        />
      </div>
      <div className="field select-country">
        <div className="label">
          TERMS OF SALE
        </div>
        <Select
          value={movement.termsOfSale}
          options={APIGlobals.incotermOptions}
          onChange={selectedValue =>
            dispatchers.onChangeMovementTermsOfSale(selectedValue.value)}
          disabled={movement.mode === 'Brokerage'}
        />
      </div>
      <div className="field select-country">
        <div className="label">
          CARRIER
        </div>
        <Select
          value={movement.carrier}
          options={APIGlobals.carrierOptions}
          onChange={selectedValue =>
            dispatchers.onChangeCarrier(selectedValue.value)}
          disabled={movement.mode === 'Brokerage'}
        />
      </div>
    </div>
    <div className="pickup-delivery-wrapper">
      <div className="pickup">
        <div className="cargo-row-icon" />
        <div className="field select-country">
          <div className="label">
            RECEIPT
          </div>
          <UNLocationField
            location={movement.receipt}
            locations
            onChange={(selectedValue) => {
              dispatchers.onChangeReceipt(selectedValue);
            }}
          />
        </div>
        <div className="field select-country">
          <div className="label">
            DEPARTURE
          </div>
          <UNLocationField
            location={movement.departure}
            airports
            seaports
            onChange={(selectedValue) => {
              dispatchers.onChangeDeparture(selectedValue);
            }}
          />
        </div>
        <div className="field select-country">
          <div className="label">
            ARRIVAL
          </div>
          <UNLocationField
            location={movement.arrival}
            airports
            seaports
            onChange={(selectedValue) => {
              dispatchers.onChangeArrival(selectedValue);
            }}
          />
        </div>
        <div className="field select-country">
          <div className="label">
            DELIVERY
          </div>
          <UNLocationField
            location={movement.delivery}
            locations
            onChange={(selectedValue) => {
              dispatchers.onChangeDelivery(selectedValue);
            }}
          />
        </div>
      </div>
    </div>
  </div>
);

EditMovement.propTypes = {
  movement: PropTypes.object,
  dispatchers: PropTypes.objectOf(PropTypes.func),
};

export default EditMovement;
