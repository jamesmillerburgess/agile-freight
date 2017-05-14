import React from 'react';
import PropTypes from 'prop-types';

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
          <td>
            {
              readOnly ?
                chargeLine.code :
                <input
                  type="text"
                  placeholder=""
                  value={chargeLine.code || ''}
                  onChange={e => setChargeLineCode(chargeLine.id, e.target.value)}
                />
            }
          </td>
          <td>
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
          <td>
            {
              readOnly ?
                chargeLine.rate :
                <textarea
                  type="text"
                  placeholder=""
                  value={chargeLine.rate || ''}
                  onChange={e => setChargeLineRate(chargeLine.id, e.target.value)}
                />
            }
          </td>
          <td>
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
          <td>
            {
              readOnly ?
                chargeLine.unitPrice :
                <input
                  className="input-numeric"
                  type="number"
                  placeholder=""
                  value={chargeLine.unitPrice || ''}
                  onChange={e => setChargeLineUnitPrice(chargeLine.id, +e.target.value)}
                />
            }
          </td>
          <td>{currencyFormat(chargeLine.amount)}</td>
          <td />
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
