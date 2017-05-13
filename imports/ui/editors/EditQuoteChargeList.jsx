import React from 'react';
import PropTypes from 'prop-types';

const EditQuoteChargeList = (props) => {
  const { chargeLines, removeChargeLine, setChargeLineUnits, setChargeLineUnitPrice } = props;
  return (
    <tbody className="striped-data">
      {chargeLines.map(chargeLine => (
        <tr key={chargeLine.id}>
          <td>{chargeLine.code}</td>
          <td>{chargeLine.name}</td>
          <td>{chargeLine.rate}</td>
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
