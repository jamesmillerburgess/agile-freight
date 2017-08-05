import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import Datetime from 'react-datetime';
import moment from 'moment';

import UNLocationField from '../fields/UNLocationField.jsx';

import { APIGlobals } from '../../api/api-globals';
import CheckboxField from "../fields/CheckboxField";

export const Dates = ({ movement, dispatchers }) => (
  <div className="pickup-delivery-wrapper">
    <div className="pickup">
      <div className="cargo-row-icon" />
      <div className="field select-country">
        <Datetime
          value={movement.receiptDate ? moment(movement.receiptDate) : ''}
          onChange={receiptDate =>
            dispatchers.onChangeReceiptDate(receiptDate.format())}
        />
      </div>
      <div className="field select-country">
        <Datetime
          value={movement.departureDate ? moment(movement.departureDate) : ''}
          onChange={departureDate =>
            dispatchers.onChangeDepartureDate(departureDate.format())}
        />
      </div>
      <div className="field select-country">
        <Datetime
          value={movement.arrivalDate ? moment(movement.arrivalDate) : ''}
          onChange={arrivalDate =>
            dispatchers.onChangeArrivalDate(arrivalDate.format())}
        />
      </div>
      <div className="field select-country">
        <Datetime
          value={movement.deliveryDate ? moment(movement.deliveryDate) : ''}
          onChange={deliveryDate =>
            dispatchers.onChangeDeliveryDate(deliveryDate.format())}
        />
      </div>
    </div>
    <div className="pickup">
      <div className="cargo-row-icon" />
      <div className="field select-country">
        <CheckboxField
          value={movement.receiptStatus === 'Actual'}
          label="Received"
          onClick={dispatchers.onChangeReceiptStatus}
        />
      </div>
      <div className="field select-country">
        <CheckboxField
          value={movement.departureStatus === 'Actual'}
          label="Departed"
          onClick={dispatchers.onChangeDepartureStatus}
        />
      </div>
      <div className="field select-country">
        <CheckboxField
          value={movement.arrivalStatus === 'Actual'}
          label="Arrived"
          onClick={dispatchers.onChangeArrivalStatus}
        />
      </div>
      <div className="field select-country">
        <CheckboxField
          value={movement.deliveryStatus === 'Actual'}
          label="Delivered"
          onClick={dispatchers.onChangeDeliveryStatus}
        />
      </div>
    </div>
  </div>
);

const EditMovement = ({ movement, dispatchers, useDates, useShipperConsignee }) => (
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
      {useShipperConsignee ?
       null : (
         <div>
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
         </div>
       )
      }
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
      {useShipperConsignee ? (
        <div className="field select-country">
          <div className="label">
            PRE-CARRIAGE BY
          </div>
          <input
            value={movement.preCarriageBy}
            onChange={e => dispatchers.onChangePreCarriageBy(e.target.value)}
          />
        </div>
      ) : null}
      {useShipperConsignee ? (
        <div className="field select-country">
          <div className="label">
            VESSEL
          </div>
          <input
            value={movement.vessel}
            onChange={e => dispatchers.onChangeVessel(e.target.value)}
          />
        </div>
      ) : null}
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
    {useDates ? <Dates movement={movement} dispatchers={dispatchers} /> : null}
  </div>
);

EditMovement.propTypes = {
  movement: PropTypes.object.isRequired,
  dispatchers: PropTypes.objectOf(PropTypes.func).isRequired,
  useDates: PropTypes.bool,
  useShipperConsignee: PropTypes.bool,
};

EditMovement.defaultProps = {
  useDates: false,
  useShipperConsignee: false,
};

export default EditMovement;
