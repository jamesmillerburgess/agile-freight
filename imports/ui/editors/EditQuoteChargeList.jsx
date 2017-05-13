import React from 'react';

const EditQuoteChargeList = () => (
  <tbody className="striped-data">
    <tr>
      <td>PICKUP 20&apos;</td>
      <td>Pickup Charge</td>
      <td />
      <td>1</td>
      <td>USD 200.00</td>
      <td>USD 200.00</td>
      <td>USD 200.00</td>
    </tr>
    <tr>
      <td>AMS 20&apos;</td>
      <td>Automated Manifest System</td>
      <td>30 USD/Container</td>
      <td>1</td>
      <td>USD 30.00</td>
      <td>USD 30.00</td>
      <td>USD 30.00</td>
    </tr>
    <tr>
      <td>ODOC 20&apos;</td>
      <td>Documentation Charge at Origin</td>
      <td>Incl. SEAL, EIR. 150 USD/Container</td>
      <td>1</td>
      <td>USD 150.00</td>
      <td>USD 150.00</td>
      <td>USD 150.00</td>
    </tr>
    <tr>
      <td>OCCF 20&apos;</td>
      <td>Export Customs Clearance</td>
      <td>48 USD/Container</td>
      <td>1</td>
      <td>USD 48.00</td>
      <td>USD 48.00</td>
      <td>USD 48.00</td>
    </tr>
    <tr>
      <td>OTHC 20&apos;</td>
      <td>Terminal Handling Charge at Origin</td>
      <td>Incl. ORC. 20&apos;/186 USD</td>
      <td>1</td>
      <td>USD 186.00</td>
      <td>USD 186.00</td>
      <td>USD 186.00</td>
    </tr>
  </tbody>
);

export default EditQuoteChargeList;
