import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import { currencyFormat, weightFormat } from '../formatters/numberFormatters';

const STYLES = {
  MESSAGE: { fontFamily: 'inherit' },
  QUOTE: {
    width: '600px',
    backgroundColor: '#CCD4D2',
    padding: '7px',
    fontFamily: '"Tw Cen MT", Arial, sans-serif',
    color: '#666666',
  },
  TABLE: { width: '586px', borderSpacing: '0' },
  HEADER: { fontSize: '28px' },
  TITLE: { fontSize: '18px' },
  ALIGN_RIGHT: { textAlign: 'right' },
  TOTAL_SPACER: { width: '316px' },
  TOTAL_ROW_CELL: {
    borderBottom: 'double',
    fontSize: '18px',
    lineHeight: '18px',
  },
  SECTION_HEADER: {
    borderBottom: '1px dashed',
    fontSize: '18px',
    lineHeight: '20px',
  },
  SECTION: { marginBottom: '10px' },
  HALF_SECTION: { width: '270px' },
  CHARGE_CELL: { width: '146px' },
  ALIGN_TOP: { verticalAlign: 'top' },
  CELL: {
    padding: '0',
    fontFamily: '"Tw Cen MT", Arial, sans-serif',
    color: '#666666',
    boxSizing: 'border-box',
    borderCollapse: 'collapse',
  },
};

const QuoteEmail = (props) => {
  const PackageLines = () => (
    <tbody>
      {props.quote.cargo.packageLines.map((packageLine, index) => (
        <tr key={index}>
          <td style={STYLES.CELL}>
            {packageLine.numPackages} {packageLine.packageType}
          </td>
          <td style={STYLES.CELL}>
            {weightFormat(packageLine.length)}x
            {weightFormat(packageLine.width)}x
            {weightFormat(packageLine.height)}
          </td>
          <td style={STYLES.CELL}>
            {weightFormat(packageLine.weight)} {packageLine.weightUOM} / pkg
          </td>
          <td style={{ ...STYLES.CELL, ...STYLES.ALIGN_RIGHT }}>
            {packageLine.numPackages} pkgs,&nbsp;
            {weightFormat(packageLine.volume)} {packageLine.volumeUOM},&nbsp;
            {weightFormat(packageLine.totalWeight)} {packageLine.weightUOM}
          </td>
        </tr>
      ))}
    </tbody>
  );

  const ContainerLines = () => <tr>container lines</tr>;

  const PackageTotals = () => (
    <tbody>
      <tr>
        <td style={{ ...STYLES.CELL, ...STYLES.TOTAL_SPACER }} />
        <td style={STYLES.CELL}>TOTAL</td>
        <td style={{ ...STYLES.CELL, ...STYLES.ALIGN_RIGHT }}>
          {props.quote.cargo.totalPackages} pkgs,&nbsp;
          {weightFormat(props.quote.cargo.totalVolume)} {props.quote.cargo.volumeUOM},&nbsp;
          {weightFormat(props.quote.cargo.totalWeight)} {props.quote.cargo.weightUOM}
        </td>
      </tr>
    </tbody>
  );

  const ContainerTotals = () => <tr>container totals</tr>;

  const LooseCargoAttributes = () => (
    <tbody>
      <tr>
        <td style={STYLES.CELL}>
          {props.quote.cargo.hazardous ?
            '' :
            'Non-'}Hazardous,&nbsp;
          {props.quote.cargo.temperatureControlled ?
            '' :
            'Non-'}Temperature Controlled
        </td>
      </tr>
    </tbody>
  );

  const ContainerizedCargoAttributes = () => <tr>container attributes</tr>;

  const ChargeGroup = (group) => {
    const groupChargeLines = props.quote.charges.chargeLines
      .filter(charge => charge.group === group);
    if (groupChargeLines.length === 0) {
      return (
        <tbody />
      );
    }
    return (
      <tbody style={STYLES.SECTION}>
        <tr>
          <td style={{ ...STYLES.CELL, ...STYLES.SECTION_HEADER }} colSpan="5">
            {group.toUpperCase()} CHARGES
          </td>
        </tr>
        {groupChargeLines.map((chargeLine, index) => (
          <tr key={index}>
            <td style={{ ...STYLES.CELL, ...STYLES.CHARGE_CELL }}>{chargeLine.name}</td>
            <td style={{ ...STYLES.CELL, ...STYLES.CHARGE_CELL }}>
              {chargeLine.units} {chargeLine.rate}&nbsp;
              {
                chargeLine.units !== 1 ?
                  ` x ${currencyFormat(chargeLine.unitPrice)} ${chargeLine.currency}` :
                  null
              }
            </td>
            <td style={{ ...STYLES.CELL, ...STYLES.CHARGE_CELL, ...STYLES.ALIGN_RIGHT }}>
              {
                chargeLine.currency !== props.quote.charges.currency ?
                  `${currencyFormat(chargeLine.amount)} ${chargeLine.currency}` :
                  null
              }
            </td>
            <td style={{ ...STYLES.CELL, ...STYLES.CHARGE_CELL, ...STYLES.ALIGN_RIGHT }}>
              {currencyFormat(chargeLine.finalAmount)} {props.quote.charges.currency}
            </td>
          </tr>
        ))}
      </tbody>
    );
  };

  const ChargeGroupSubtotal = (group) => {
    const groupChargeLines = props.quote.charges.chargeLines
      .filter(charge => charge.group === group);
    if (groupChargeLines.length === 0) {
      return (
        <tbody />
      );
    }
    return (
      <tbody>
        <tr>
          <td style={{ ...STYLES.CELL, ...STYLES.TOTAL_SPACER }} />
          <td style={STYLES.CELL}>SUBTOTAL</td>
          <td style={{ ...STYLES.CELL, ...STYLES.ALIGN_RIGHT }}>
            {(() => {
              switch (group) {
                case 'Origin':
                  return currencyFormat(props.quote.charges.totalOriginCharges);
                case 'International':
                  return currencyFormat(props.quote.charges.totalInternationalCharges);
                case 'Destination':
                  return currencyFormat(props.quote.charges.totalDestinationCharges);
                default:
                  return '';
              }
            })()} {props.quote.charges.currency}
          </td>
        </tr>
      </tbody>
    );
  };

  const FXRates = () => {
    if (!props.quote.charges.fxConversions) {
      return null;
    }
    const currencies =
            Object
              .keys(props.quote.charges.fxConversions)
              .filter(currency => props.quote.charges.fxConversions[currency].active);
    if (!currencies.length) {
      return null;
    }
    return (
      <table>
        <tbody>
          <tr>
            <td style={{ ...STYLES.CELL, ...STYLES.SECTION_HEADER, ...STYLES.HALF_SECTION }} colSpan="2">
              FX RATES
            </td>
          </tr>
          {
            currencies.map(currency => (
              <tr key={currency}>
                <td style={STYLES.CELL}>
                  {props.quote.charges.currency}/{currency}
                </td>
                <td style={{ ...STYLES.CELL, ...STYLES.ALIGN_RIGHT }}>
                  {props.quote.charges.fxConversions[currency].rate}
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    );
  };

  return (
    <div>
      <pre style={STYLES.MESSAGE}>{props.message}</pre>
      <div style={STYLES.QUOTE}>
        <table style={{ ...STYLES.TABLE, ...STYLES.SECTION }}>
          <tbody>
            <tr>
              <td style={{ ...STYLES.CELL, ...STYLES.HEADER }}>FREIGHT QUOTATION</td>
              <td style={{ ...STYLES.CELL, ...STYLES.TITLE, ...STYLES.ALIGN_RIGHT }}>
                EXPIRES {moment(props.quote.expiryDate).format('DD MMM YYYY').toUpperCase()}
              </td>
            </tr>
          </tbody>
        </table>
        <table style={{ ...STYLES.TABLE, ...STYLES.SECTION }}>
          <tbody>
            <tr>
              <td style={STYLES.TOTAL_SPACER} />
              <td style={{ ...STYLES.CELL, ...STYLES.TOTAL_ROW_CELL }}>TOTAL PRICE</td>
              <td style={{ ...STYLES.CELL, ...STYLES.TOTAL_ROW_CELL, ...STYLES.ALIGN_RIGHT }}>
                {currencyFormat(props.quote.charges.totalCharges)} {props.quote.charges.currency}
              </td>
            </tr>
          </tbody>
        </table>
        <table style={STYLES.TABLE}>
          <tbody>
            <tr style={STYLES.SECTION_HEADER}>
              <td style={STYLES.CELL}>CARGO</td>
            </tr>
          </tbody>
        </table>
        <table style={STYLES.TABLE}>
          {props.quote.cargo.cargoType === 'Loose' ?
            PackageLines() :
            ContainerLines()}
        </table>
        <table style={STYLES.TABLE}>
          {props.quote.cargo.cargoType === 'Loose' ?
            PackageTotals() :
            ContainerTotals()}
        </table>
        <table style={{ ...STYLES.TABLE, ...STYLES.SECTION }}>
          {props.quote.cargo.cargoType === 'Loose' ?
            LooseCargoAttributes() :
            ContainerizedCargoAttributes()}
        </table>
        <table style={{ ...STYLES.TABLE, ...STYLES.SECTION }}>
          <tbody>
            <tr>
              <td style={{ ...STYLES.CELL, ...STYLES.SECTION_HEADER, ...STYLES.HALF_SECTION }}>
                ROUTING
              </td>
              <td style={STYLES.CELL} />
              <td style={{ ...STYLES.CELL, ...STYLES.SECTION_HEADER, ...STYLES.HALF_SECTION }}>
                OTHER SERVICES
              </td>
            </tr>
            <tr>
              <td style={{ ...STYLES.CELL, ...STYLES.HALF_SECTION }}>
                {props.quote.movement.pickup.locationName} –&nbsp;
                {props.quote.movement.delivery.locationName}
              </td>
              <td style={STYLES.CELL} />
              <td style={{ ...STYLES.CELL, ...STYLES.HALF_SECTION }}>
                {props.quote.otherServices.insurance ? '' : 'No '}Insurance
              </td>
            </tr>
            <tr>
              <td style={STYLES.CELL}>
                {props.quote.movement.pickup.isPort ? 'Port' : 'Door'} to&nbsp;
                {props.quote.movement.delivery.isPort ? 'Port' : 'Door'}
              </td>
              <td style={STYLES.CELL} />
              <td style={{ ...STYLES.CELL, ...STYLES.HALF_SECTION }}>
                {props.quote.otherServices.customsClearance ?
                  '' :
                  'No '}Customs Clearance
              </td>
            </tr>
          </tbody>
        </table>
        <table style={STYLES.TABLE}>
          {ChargeGroup('Origin')}
        </table>
        <table style={{ ...STYLES.TABLE, ...STYLES.SECTION }}>
          {ChargeGroupSubtotal('Origin')}
        </table>
        <table style={STYLES.TABLE}>
          {ChargeGroup('International')}
        </table>
        <table style={{ ...STYLES.TABLE, ...STYLES.SECTION }}>
          {ChargeGroupSubtotal('International')}
        </table>
        <table style={STYLES.TABLE}>
          {ChargeGroup('Destination')}
        </table>
        <table style={{ ...STYLES.TABLE, ...STYLES.SECTION }}>
          {ChargeGroupSubtotal('Destination')}
        </table>
        <table style={{ ...STYLES.TABLE, ...STYLES.SECTION }}>
          <tbody>
            <tr>
              <td style={{ ...STYLES.CELL, ...STYLES.HALF_SECTION, ...STYLES.ALIGN_TOP }}>
                {
                  props.quote.charges.notes ?
                    <table>
                      <tbody>
                        <tr>
                          <td style={{ ...STYLES.CELL, ...STYLES.SECTION_HEADER, ...STYLES.HALF_SECTION }}>
                            NOTES
                          </td>
                        </tr>
                        <tr>
                          <td style={STYLES.CELL}>
                            <pre style={STYLES.CELL}>{props.quote.charges.notes}</pre>
                          </td>
                        </tr>
                      </tbody>
                    </table> :
                    null
                }
              </td>
              <td style={STYLES.CELL} />
              <td style={{ ...STYLES.CELL, ...STYLES.HALF_SECTION, ...STYLES.ALIGN_TOP }}>
                {FXRates()}
              </td>
            </tr>
          </tbody>
        </table>
        <table style={{ ...STYLES.TABLE, ...STYLES.SECTION }}>
          <tbody>
            <tr>
              <td style={{ ...STYLES.CELL, ...STYLES.TOTAL_SPACER }} />
              <td style={{ ...STYLES.CELL, ...STYLES.TOTAL_ROW_CELL }}>TOTAL PRICE</td>
              <td style={{ ...STYLES.CELL, ...STYLES.TOTAL_ROW_CELL, ...STYLES.ALIGN_RIGHT }}>
                {currencyFormat(props.quote.charges.totalCharges)} {props.quote.charges.currency}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

QuoteEmail.propTypes = {
  message: PropTypes.string,
  quote: PropTypes.object,
};

QuoteEmail.defaultProps = {
  message: '',
  quote: {
    movement: {
      pickup: {
        locationName: '',
        isPort: false,
      },
      delivery: {
        locationName: '',
        isPort: false,
      },
    },
    otherServices: {
      insurance: false,
      customsClearance: false,
    },
    charges: {
      chargeLines: [],
    },
    cargo: {},
  },
};

export default QuoteEmail;
