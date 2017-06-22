import React from 'react';
import Select from 'react-select';

import { currencyFormat } from '../formatters/numberFormatters';

const RateField = (props) => {
  const optionRenderer = (option) => {
    let rateValue = <div className="rate-option-na">no rate applicable</div>;
    if (option.rate) {
      rateValue = (
        <div className="rate-option-value">
          {currencyFormat(option.rate.unitPrice)}&nbsp;
          {option.rate.unitPriceCurrency} /&nbsp;
          {option.rate.rate}
        </div>
      );
    }
    if (option.value === 'custom') {
      rateValue = <div />;
    }
    return (
      <div className="rate-option">
        <div className="rate-option-label">{option.label}</div>
        {rateValue}
      </div>
    );
  };

  const valueRenderer = value => (
    <div className="rate-option-label">{value.label}</div>
  );

  return (
    <Select
      className="rate-field"
      value={props.value || ''}
      options={[
        { value: 'custom', label: 'CUSTOM' },
        { value: 'supplier', label: 'SUPPLIER', rate: props.rates.supplier },
        { value: 'location', label: 'LOCATION', rate: props.rates.location },
        { value: 'country', label: 'COUNTRY', rate: props.rates.country },
        { value: 'global', label: 'GLOBAL', rate: props.rates.global },
      ]}
      clearable={false}
      searchable={false}
      arrowRenderer={() => null}
      optionRenderer={optionRenderer}
      valueRenderer={valueRenderer}
      placeholder=""
    />
  );
};

export default RateField;
