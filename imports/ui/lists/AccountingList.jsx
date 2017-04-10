import React from 'react';

export default class AccountingList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <table className="table table-hover">
        <thead>
        <tr className="list-header">
          <th />
          <th>Amount</th>
          <th>References</th>
          <th>Issued Date</th>
          <th>Issued By</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <th>
            I5671023<br />
            Invoice
          </th>
          <td>32,928 INR</td>
          <td>
            J285012<br />
            J158210
          </td>
          <td>02-Apr-2017</td>
          <td>James Burgess</td>
        </tr>
        <tr>
          <th>
            I5671023<br />
            Invoice
          </th>
          <td>32,928 INR</td>
          <td>
            J285012<br />
            J158210
          </td>
          <td>02-Apr-2017</td>
          <td>James Burgess</td>
        </tr>
        <tr>
          <th>
            I5671023<br />
            Invoice
          </th>
          <td>32,928 INR</td>
          <td>
            J285012<br />
            J158210
          </td>
          <td>02-Apr-2017</td>
          <td>James Burgess</td>
        </tr>
        <tr>
          <th>
            I5671023<br />
            Invoice
          </th>
          <td>32,928 INR</td>
          <td>
            J285012<br />
            J158210
          </td>
          <td>02-Apr-2017</td>
          <td>James Burgess</td>
        </tr>
        </tbody>
      </table>
    );
  }
}

AccountingList.propTypes = {};

