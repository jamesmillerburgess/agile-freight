import React from 'react';
import CurrencyField from './CurrencyField.jsx';

const MonetaryFieldGroup = ({
  numericValue,
  currencyValue,
  onChangeNumeric,
  onChangeCurrency,
}) =>
  <div className="monetary-field-group">
    <input
      className="numeric-field"
      type="number"
      value={numericValue}
      onChange={onChangeNumeric}
    />
    <CurrencyField
      className="field-addon"
      value={currencyValue}
      onChange={onChangeCurrency}
    />
  </div>;

export default MonetaryFieldGroup;
