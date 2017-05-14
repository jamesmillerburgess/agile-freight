import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import Modal from 'react-modal';

import EditQuoteChargeListConnect from './EditQuoteChargeListConnect';

import { CustomerQuotes } from '../../api/customerQuotes/customerQuotesCollection';

import { currencyFormat } from '../formatters/numberFormatters';

class EditQuote extends React.Component {
  componentWillMount() {
    this.props.onLoad(CustomerQuotes.findOne(this.props.match.params.quoteId));
    this.state = { modalIsOpen: false };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
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
                    <button className="submit" onClick={this.openModal}>
                      SAVE AND SUBMIT TO CUSTOMER
                    </button>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={() => null}
          onRequestClose={() => null}
          contentLabel="Modal"
        >
          <h1>Email Customer</h1>
          To: <input /><br />
          cc: <input /><br />
          Subject: <input /><br />
          Message: <textarea /><br />
          <button onClick={this.closeModal}>Send Email</button>
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
                  </tr>
                </tbody>
                <EditQuoteChargeListConnect group="Origin" readOnly />
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
                  </tr>
                </tbody>
                <EditQuoteChargeListConnect group="International" readOnly />
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
                  </tr>
                </tbody>
                <EditQuoteChargeListConnect group="Destination" readOnly />
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
                </tfoot>
              </table>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

EditQuote.propTypes = {
  onLoad: PropTypes.func.isRequired,
};

export default EditQuote;
