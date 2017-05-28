import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';

import CurrencyField from '../fields/CurrencyField.jsx';

import { currencyFormat } from '../formatters/numberFormatters';

const EditQuoteChargeGroup = (props) => {
  const
    {
      removeChargeLine,
      setChargeLineName,
      setChargeLineRate,
      setChargeLineUnits,
      setChargeLineUnitPrice,
      setChargeLineUnitPriceCurrency,
    } = props;

  const getFinalAmount = (chargeLine) => {
    let finalAmount = 0;
    if (
      props.fxConversions &&
      props.fxConversions[chargeLine.unitPriceCurrency] &&
      props.fxConversions[chargeLine.unitPriceCurrency].rate
    ) {
      finalAmount = chargeLine.amount * props.fxConversions[chargeLine.unitPriceCurrency].rate;
    }
    return finalAmount;
  };

  const getSubtotalAmount = () =>
    props.chargeLines.reduce((acc, chargeLine) => acc + getFinalAmount(chargeLine), 0);

  return (
    <tbody className="striped-data">
      {props.chargeLines.map(chargeLine => (
        <tr key={chargeLine.id}>
          <td className="icon-cell">
            <button
              className="cargo-row-icon"
              onClick={() => removeChargeLine(chargeLine.id)}
            >
              <span className="fa fa-fw fa-minus-square" />
            </button>
          </td>
          <td className="charge-name-column">
            <input
              type="text"
              placeholder=""
              value={chargeLine.name || ''}
              onChange={e => setChargeLineName(chargeLine.id, e.target.value)}
            />
          </td>
          <td className="rate-basis-column">
            <Select
              className="input-group-last addon"
              value={chargeLine.rate || ''}
              options={[
                { value: 'Shipment', label: 'Shipment' },
                { value: 'KG', label: 'KG' },
                { value: 'CBM', label: 'CBM' },
                { value: 'Container', label: 'Container' },
                { value: 'TEU', label: 'TEU' },
              ]}
              onChange={selectedValue => setChargeLineRate(chargeLine.id, selectedValue.value)}
              arrowRenderer={() => false}
              searchable
              clearable={false}
            />
          </td>
          <td className="units-column">
            <input
              className="input-numeric"
              type="number"
              placeholder=""
              value={chargeLine.units || ''}
              onChange={e => setChargeLineUnits(chargeLine.id, +e.target.value)}
            />
          </td>
          <td className="unit-price-column">
            <div className="input-group">
              <input
                className="input-numeric input-group-first"
                type="number"
                placeholder=""
                value={chargeLine.unitPrice || ''}
                onChange={e => setChargeLineUnitPrice(chargeLine.id, +e.target.value)}
              />
              <CurrencyField
                className="input-group-last addon"
                value={chargeLine.unitPriceCurrency}
                onChange={e => setChargeLineUnitPriceCurrency(chargeLine.id, e.value)}
              />
            </div>
          </td>
          <td className="numeric-label amount-local-column">{currencyFormat(chargeLine.amount)} {chargeLine.unitPriceCurrency}</td>
          <td className="numeric-label amount-final-column">
            {currencyFormat(getFinalAmount(chargeLine))} {props.currency}
          </td>
        </tr>
      ))}
      {
        props.chargeLines.length > 0 ?
          (
            <tr>
              <td colSpan="5" />
              <td className="numeric-label">SUBTOTAL</td>
              <td className="numeric-label">
                {currencyFormat(getSubtotalAmount())} {props.currency}
              </td>
            </tr>
          ) :
          null
      }
    </tbody>
  );
};

EditQuoteChargeGroup.propTypes = {
  group: PropTypes.string,
  charges: PropTypes.object,
  currency: PropTypes.string,
  removeChargeLine: PropTypes.func,
};

export default EditQuoteChargeGroup;
