import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';

import { APIGlobals } from '../../api/api-globals';

const CurrencyField = props => (
  <Select
    className={props.className ? `currency-field ${props.className}` : 'currency-field'}
    value={props.value}
    options={APIGlobals.currencyOptions}
    clearable={false}
    arrowRenderer={APIGlobals.noop}
    searchable
    onChange={e => props.onChange(e)}
    placeholder={false}
  />
);

CurrencyField.propTypes = {
  className: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
};

CurrencyField.defaultProps = {
  className: '',
  value: '',
  onChange: APIGlobals.noop,
};

export default CurrencyField;
