import React from 'react';

export default class QuoteList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <table className="table table-hover">
        <thead>
        <tr className="list-header">
          <th />
          <th>Mode</th>
          <th>Routes</th>
          <th>Rates</th>
          <th>Expiry</th>
          <th>Quoted By</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <th>
            Q285610<br />
            Issued
          </th>
          <td>
            Ocean LCL<br />
            Export FOB
          </td>
          <td>INNSA - GBFXT</td>
          <td>
            20' DC - 24,212 INR<br />
            40' DC - 48,242 INR
          </td>
          <td>21-Apr-2017</td>
          <td>James Burgess</td>
        </tr>
        <tr>
          <th>
            Q285610<br />
            Issued
          </th>
          <td>
            Ocean LCL<br />
            Export FOB
          </td>
          <td>INNSA - GBFXT</td>
          <td>
            20' DC - 24,212 INR<br />
            40' DC - 48,242 INR
          </td>
          <td>21-Apr-2017</td>
          <td>James Burgess</td>
        </tr>
        <tr>
          <th>
            Q285610<br />
            Issued
          </th>
          <td>
            Ocean LCL<br />
            Export FOB
          </td>
          <td>INNSA - GBFXT</td>
          <td>
            20' DC - 24,212 INR<br />
            40' DC - 48,242 INR
          </td>
          <td>21-Apr-2017</td>
          <td>James Burgess</td>
        </tr>
        <tr>
          <th>
            Q285610<br />
            Issued
          </th>
          <td>
            Ocean LCL<br />
            Export FOB
          </td>
          <td>INNSA - GBFXT</td>
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

QuoteList.propTypes = {};

