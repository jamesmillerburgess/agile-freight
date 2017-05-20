import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';

import { currencyFormat } from '../formatters/numberFormatters';

const EditQuoteChargeList = (props) => {
  const
    {
      chargeLines,
      removeChargeLine,
      setChargeLineCode,
      setChargeLineName,
      setChargeLineRate,
      setChargeLineUnits,
      setChargeLineUnitPrice,
      readOnly,
    } = props;
  return (
    <tbody className="striped-data">
      {chargeLines.map(chargeLine => (
        <tr key={chargeLine.id}>
          {
            readOnly ?
              null :
              <td className="icon-cell">
                <button
                  className="cargo-row-icon"
                  onClick={() => removeChargeLine(chargeLine.id)}
                >
                  <span className="fa fa-fw fa-minus-square" />
                </button>
              </td>
          }
          <td className="charge-name-column">
            {
              readOnly ?
                chargeLine.name :
                <input
                  type="text"
                  placeholder=""
                  value={chargeLine.name || ''}
                  onChange={e => setChargeLineName(chargeLine.id, e.target.value)}
                />
            }
          </td>
          <td className="rate-basis-column">
            {
              readOnly ?
                chargeLine.rate :
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
            }
          </td>
          <td className="units-column">
            {
              readOnly ?
                chargeLine.units :
                <input
                  className="input-numeric"
                  type="number"
                  placeholder=""
                  value={chargeLine.units || ''}
                  onChange={e => setChargeLineUnits(chargeLine.id, +e.target.value)}
                />
            }
          </td>
          <td className="unit-price-column">
            {
              readOnly ?
                chargeLine.unitPrice :
                <div className="input-group">
                  <input
                    className="input-numeric input-group-first"
                    type="number"
                    placeholder=""
                    value={chargeLine.unitPrice || ''}
                    onChange={e => setChargeLineUnitPrice(chargeLine.id, +e.target.value)}
                  />
                  <Select
                    className="input-group-last addon"
                    value="USD"
                    options={[
                      { value: 'USD', label: 'USD' },
                      { value: 'CHF', label: 'CHF' },
                    ]}
                    clearable={false}
                    arrowRenderer={() => false}
                    searchable={false}
                  />
                </div>
            }
          </td>
          <td className="numeric-label amount-local-column">{currencyFormat(chargeLine.amount)}</td>
          <td className="amount-final-column" />
        </tr>
      ))}
    </tbody>
  );
};

EditQuoteChargeList.propTypes = {
  group: PropTypes.string,
  chargeLines: PropTypes.array,
  removeChargeLine: PropTypes.func,
};

export default EditQuoteChargeList;
