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
          <th />
          <th>Routes</th>
          <th>Terms</th>
          <th>Rates</th>
          <th>Expiry</th>
          <th>Quoted By</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <th><i className="fa fa-fw fa-ship product-icon" /></th>
          <td>INNSA - GBFXT</td>
          <td>Export FOB</td>
          <td>
            20' DC - 24,212 INR<br />
            40' DC - 48,242 INR
          </td>
          <td>21-Apr-2017</td>
          <td>James Burgess</td>
        </tr>
        <tr>
          <th><i className="fa fa-fw fa-ship product-icon" /></th>
          <td>INNSA - GBFXT</td>
          <td>Export FOB</td>
          <td>
            20' DC - 24,212 INR<br />
            40' DC - 48,242 INR
          </td>
          <td>21-Apr-2017</td>
          <td>James Burgess</td>
        </tr>
        <tr>
          <th><i className="fa fa-fw fa-ship product-icon" /></th>
          <td>INNSA - GBFXT</td>
          <td>Export FOB</td>
          <td>
            20' DC - 24,212 INR<br />
            40' DC - 48,242 INR
          </td>
          <td>21-Apr-2017</td>
          <td>James Burgess</td>
        </tr>
        <tr>
          <th><i className="fa fa-fw fa-ship product-icon" /></th>
          <td>INNSA - GBFXT</td>
          <td>Export FOB</td>
          <td>
            20' DC - 24,212 INR<br />
            40' DC - 48,242 INR
          </td>
          <td>21-Apr-2017</td>
          <td>James Burgess</td>
        </tr>
        </tbody>
      </table>
    );
  }
}

CargoList.propTypes = {};

