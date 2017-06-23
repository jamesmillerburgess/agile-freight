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
          {option.rate.currency} /&nbsp;
          {option.rate.basis}
        </div>
      );
    }
    if (option.value === 'custom') {
      rateValue = <div />;
    }
    return (
      <div className={`rate-option ${option.disabled ? 'disabled' : ''}`}>
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
        {
          value: 'custom',
          label: 'CUSTOM',
        },
        {
          value: 'supplier',
          label: 'SUPPLIER',
          rate: props.rates.supplier,
          disabled: typeof props.rates.supplier === 'undefined',
        },
        {
          value: 'location',
          label: 'LOCATION',
          rate: props.rates.location,
          disabled: typeof props.rates.location === 'undefined',
        },
        {
          value: 'country',
          label: 'COUNTRY',
          rate: props.rates.country,
          disabled: typeof props.rates.country === 'undefined',
        },
        {
          value: 'global',
          label: 'GLOBAL',
          rate: props.rates.global,
          disabled: typeof props.rates.global === 'undefined',
        },
      ]}
      clearable={false}
      searchable={false}
      arrowRenderer={() => null}
      optionRenderer={optionRenderer}
      valueRenderer={valueRenderer}
      placeholder=""
      onChange={props.onChange}
    />
  );
};

export default RateField;
