import React from 'react';
import CurrencyField from './CurrencyField.jsx';

const MonetaryFieldGroup = ({
  numericValue,
  currencyValue,
  onChangeNumeric,
  onChangeCurrency,
  disabled,
}) =>
  <div className="monetary-field-group">
    <input
      className="numeric-field"
      type="number"
      value={numericValue}
      onChange={onChangeNumeric}
      disabled={disabled}
    />
    <CurrencyField
      className="field-addon"
      value={currencyValue}
      onChange={onChangeCurrency}
      disabled={disabled}
    />
  </div>;

export default MonetaryFieldGroup;
