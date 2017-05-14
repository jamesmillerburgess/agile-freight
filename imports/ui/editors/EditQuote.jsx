import React from 'react';
import PropTypes from 'prop-types';
import { Mongo } from 'meteor/mongo';

import EditQuoteChargeListConnect from './EditQuoteChargeListConnect';

import { CustomerQuotes } from '../../api/customerQuotes/customerQuotesCollection';
import { currencyFormat } from '../formatters/numberFormatters';

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
                  <th colSpan="7" className="title">Origin Charges</th>
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
                  <td>{currency} {currencyFormat(totalOriginCharges)}</td>
                </tr>
              </tbody>
              <tbody>
                <tr className="empty-row" />
                <tr className="title-row">
                  <th colSpan="7" className="title">International Charges</th>
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
                  <td>{currency} {currencyFormat(totalInternationalCharges)}</td>
                </tr>
              </tbody>
              <tbody>
                <tr className="empty-row" />
                <tr className="title-row">
                  <th colSpan="7" className="title">Destination Charges</th>
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
                  <td>{currency} {currencyFormat(totalDestinationCharges)}</td>
                </tr>
              </tbody>
              <tbody>
                <tr className="info-row">
                  <td colSpan="5">
                    <textarea />
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <tr className="summary">
                  <td colSpan="5">Summary</td>
                  <td>Total Price</td>
                  <td>{currency} {currencyFormat(totalCharges)}</td>
                </tr>
                <tr>
                  <td colSpan="5" />
                  <td colSpan="2">
                    <button className="submit" onClick={() => null}>
                      SAVE AND SUBMIT TO CUSTOMER
                    </button>
                  </td>
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
