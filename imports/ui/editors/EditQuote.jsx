import React from 'react';
import PropTypes from 'prop-types';
import { Mongo } from 'meteor/mongo';

import EditQuoteChargeListConnect from './EditQuoteChargeListConnect';

import { CustomerQuotes } from '../../api/customerQuotes/customerQuotesCollection';

class EditQuote extends React.Component {
  componentWillMount() {
    this.props.onLoad(CustomerQuotes.findOne(this.props.match.params.quoteId));
  }

  render() {
    const
      {
        customerQuotes,
        totalOriginCharges,
        totalInternationalCharges,
        totalDestinationCharges,
        totalCharges,
        currency,
        addChargeLine,
      } = this.props;
    return (
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
                  <th className="icon-cell">
                    <button
                      className="cargo-row-icon"
                      onClick={() => addChargeLine({
                        id: new Mongo.ObjectID()._str,
                        group: 'Origin',
                      })}
                    >
                      <span className="fa fa-fw fa-plus-circle" />
                    </button>
                  </th>
                </tr>
              </tbody>
              <EditQuoteChargeListConnect group="Origin" />
              <tbody className="subtotal">
                <tr>
                  <td colSpan="5" />
                  <td>Subtotal</td>
                  <td>{currency} {totalOriginCharges}</td>
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
                  <th className="icon-cell">
                    <button
                      className="cargo-row-icon"
                      onClick={() => addChargeLine({
                        id: new Mongo.ObjectID()._str,
                        group: 'International',
                      })}
                    >
                      <span className="fa fa-fw fa-plus-circle" />
                    </button>
                  </th>
                </tr>
              </tbody>
              <EditQuoteChargeListConnect group="International" />
              <tbody className="subtotal">
                <tr>
                  <td colSpan="5" />
                  <td>Subtotal</td>
                  <td>{currency} {totalInternationalCharges}</td>
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
                  <th className="icon-cell">
                    <button
                      className="cargo-row-icon"
                      onClick={() => addChargeLine({
                        id: new Mongo.ObjectID()._str,
                        group: 'Destination',
                      })}
                    >
                      <span className="fa fa-fw fa-plus-circle" />
                    </button>
                  </th>
                </tr>
              </tbody>
              <EditQuoteChargeListConnect group="Destination" />
              <tbody className="subtotal">
                <tr>
                  <td colSpan="5" />
                  <td>Subtotal</td>
                  <td>{currency} {totalDestinationCharges}</td>
                </tr>
              </tbody>
              <tbody>
                <tr className="info-row">
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
                  <td>{currency} {totalCharges}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

EditQuote.propTypes = {
  onLoad: PropTypes.func.isRequired,
};

export default EditQuote;
