import React from 'react';
import PropTypes from 'prop-types';

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
    } = props;
  return (
    <tbody className="striped-data">
      {chargeLines.map(chargeLine => (
        <tr key={chargeLine.id}>
          <td>
            <input
              type="text"
              placeholder=""
              value={chargeLine.code}
              onChange={e => setChargeLineCode(chargeLine.id, e.target.value)}
            />
          </td>
          <td>
            <input
              type="text"
              placeholder=""
              value={chargeLine.name}
              onChange={e => setChargeLineName(chargeLine.id, e.target.value)}
            />
          </td>
          <td>
            <input
              type="text"
              placeholder=""
              value={chargeLine.rate}
              onChange={e => setChargeLineRate(chargeLine.id, e.target.value)}
            />
          </td>
          <td>
            <input
              className="input-numeric"
              type="number"
              placeholder=""
              value={chargeLine.units}
              onChange={e => setChargeLineUnits(chargeLine.id, +e.target.value)}
            />
          </td>
          <td>
            <input
              className="input-numeric"
              type="number"
              placeholder=""
              value={chargeLine.unitPrice}
              onChange={e => setChargeLineUnitPrice(chargeLine.id, +e.target.value)}
            />
          </td>
          <td>{chargeLine.amount}</td>
          <td />
          <td className="icon-cell">
            <button
              className="cargo-row-icon"
              onClick={() => removeChargeLine(chargeLine.id)}
            >
              <span className="fa fa-fw fa-minus-circle" />
            </button>
          </td>
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
