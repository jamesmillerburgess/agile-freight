import React from 'react';

export default class CargoList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <table className="table table-hover">
        <thead>
        <tr className="list-header">
          <th>Status</th>
          <th>Goods</th>
          <th>Mode</th>
          <th>Route</th>
          <th>Terms</th>
          <th>Last Updated By</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <th>Received</th>
          <td>
            20 Boxes<br />
            239.000 kg<br />
            4.219 cbm
          </td>
          <td>Ocean LCL</td>
          <td>INNSA - GBFXT</td>
          <td>Export FOB</td>
          <td>James Burgess</td>
        </tr>
        <tr>
          <th>Received</th>
          <td>
            20 Boxes<br />
            239.000 kg<br />
            4.219 cbm
          </td>
          <td>Ocean LCL</td>
          <td>INNSA - GBFXT</td>
          <td>Export FOB</td>
          <td>James Burgess</td>
        </tr>
        <tr>
          <th>Received</th>
          <td>
            20 Boxes<br />
            239.000 kg<br />
            4.219 cbm
          </td>
          <td>Ocean LCL</td>
          <td>INNSA - GBFXT</td>
          <td>Export FOB</td>
          <td>James Burgess</td>
        </tr>
        <tr>
          <th>Received</th>
          <td>
            20 Boxes<br />
            239.000 kg<br />
            4.219 cbm
          </td>
          <td>Ocean LCL</td>
          <td>INNSA - GBFXT</td>
          <td>Export FOB</td>
          <td>James Burgess</td>
        </tr>
        </tbody>
      </table>
    );
  }
}

CargoList.propTypes = {};

