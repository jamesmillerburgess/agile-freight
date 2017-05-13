import React from 'react';
import PropTypes from 'prop-types';

const EditQuoteChargeList = (props) => {
  const { chargeLines } = props;
  return (
    <tbody className="striped-data">
      {chargeLines.map(chargeLine => (
        <tr key={chargeLine.id}>
          <td>{chargeLine.code}</td>
          <td>{chargeLine.name}</td>
          <td>{chargeLine.rate}</td>
          <td>{chargeLine.units}</td>
          <td>{chargeLine.unitPrice}</td>
          <td>{chargeLine.amount}</td>
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
