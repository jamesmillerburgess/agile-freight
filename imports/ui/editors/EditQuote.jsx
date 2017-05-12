import React from 'react';

const EditQuote = () => (
  <div className="edit-quote">
    <div className="edit-group">
      <div className="edit-group-body">
        <table className="table table-bordered">
          <tbody>
            <tr className="title-row">
              <th colSpan="4" className="title">
                Origin Charges
              </th>
              <th colSpan="3">Shanghai to CNSHA Shanghai</th>
            </tr>
            <tr className="column-title-row">
              <th className="amount">Fee Code</th>
              <th>Fee Name</th>
              <th>Comment</th>
              <th className="amount">Units</th>
              <th className="amount">Unit Price</th>
              <th className="amount">Amount</th>
              <th className="amount">Final Amount</th>
            </tr>
          </tbody>
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
          <tbody className="subtotal">
            <tr>
              <td colSpan="5" />
              <td>Subtotal</td>
              <td>USD 614.00</td>
            </tr>
          </tbody>
          <tbody>
            <tr className="empty-row" />
            <tr className="title-row">
              <th colSpan="4" className="title">International Charges</th>
              <th colSpan="3">CNSHA Shanghai to USMIA Miami</th>
            </tr>
            <tr className="column-title-row">
              <th>Fee Code</th>
              <th>Fee Name</th>
              <th>Comment</th>
              <th>Units</th>
              <th>Unit Price</th>
              <th>Amount</th>
              <th>Final Amount</th>
            </tr>
          </tbody>
          <tbody className="striped-data">
            <tr>
              <td>Ocean 20&apos;</td>
              <td>Ocean Freight Cost</td>
              <td>20&apos;/2000 USD<br />40&apos;/2470 USD</td>
              <td>1</td>
              <td>USD 2,000.00</td>
              <td>USD 2,000.00</td>
              <td>USD 2,000.00</td>
            </tr>
            <tr>
              <td>DHDL</td>
              <td>Handling Fee at Destination</td>
              <td>Flat Fee</td>
              <td>1</td>
              <td>USD 65.00</td>
              <td>USD 65.00</td>
              <td>USD 65.00</td>
            </tr>
          </tbody>
          <tbody className="subtotal">
            <tr>
              <td colSpan="5" />
              <td>Subtotal</td>
              <td>USD 2,065.00</td>
            </tr>
          </tbody>
          <tbody>
            <tr className="empty-row" />
            <tr className="title-row">
              <th colSpan="4" className="title">Destination Charges</th>
              <th colSpan="3">USMIA Miami to Sarasota, FL</th>
            </tr>
            <tr className="column-title-row">
              <th>Fee Code</th>
              <th>Fee Name</th>
              <th>Comment</th>
              <th>Units</th>
              <th>Unit Price</th>
              <th>Amount</th>
              <th>Final Amount</th>
            </tr>
          </tbody>
          <tbody className="striped-data">
            <tr>
              <td>DELIVERY 20&apos;</td>
              <td>Delivery Charge</td>
              <td>Per Container</td>
              <td>1</td>
              <td>USD 881.25</td>
              <td>USD 881.25</td>
              <td>USD 881.25</td>
            </tr>
            <tr>
              <td>FSC</td>
              <td>Fuel Surcharge</td>
              <td />
              <td>0.19</td>
              <td>USD 705.00</td>
              <td>USD 705.00</td>
              <td>USD 705.00</td>
            </tr>
          </tbody>
          <tbody className="subtotal">
            <tr>
              <td colSpan="5" />
              <td>Subtotal</td>
              <td>USD 1,105.20</td>
            </tr>
          </tbody>
          <tbody>
            <tr>
              <td colSpan="5">
                <b>Ocean Freight Leg:</b><br />
                • Transit times are estimates as provided by the carriers.<br />
                • Overweight fee of USD 175.00 applies over 16,000kg<br />
                <br />
                <b>Delivery Leg:</b><br />
                •Chassis fee includes 3 days standard Charge. Final price will be Charged at
                actuals, 30 USD/day.<br />
                • SOLAS: upon customer request at time of dispatch, we can arrange to have
                containers weighed empty and/or loaded and provide email photo(s)<br />
                • USD 85 Per Chassis Repositioning<br />
                • USD 150 Hazardous commodities must be verified prior to dispatch.<br />
                • USD 175 Refrigerated container<br />
                • USD 125 Prepull flat charge. Subject to approval<br />
                • USD 30 Daily storage charge<br />
                • Free time Local 1 / Road 2 hrs then Hourly detention charge USD 85<br />
                • Bonded Stop Off charge: Please call with specifics for rates.<br />
                • Customer responsible for Rail Lift charge when applicable.<br />
                • Upon notification of container availability, and in coordination with the
                consignee, pre-arranged drayage can generally be completed within a 1-2 day
                timeframe.
              </td>
              <td colSpan="1">ISF Fee</td>
              <td colSpan="1">USD 50.00</td>
            </tr>
          </tbody>
          <tfoot>
            <tr className="summary">
              <td colSpan="5">Summary</td>
              <td>Total Price</td>
              <td>USD 3834.20</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  </div>
);

export default EditQuote;
