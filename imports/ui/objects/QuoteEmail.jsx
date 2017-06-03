import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

const STYLES = {
  MESSAGE: { backgroundColor: '#FFFFFF' },
  QUOTE: { width: '600px', backgroundColor: '#CCD4D2', padding: '7px' },
  TABLE: { width: '586px' },
  HEADER: { fontSize: '28px' },
  TITLE: { fontSize: '18px' },
  ALIGN_RIGHT: { textAlign: 'right' },
  TOTAL_SPACER: { width: '320px' },
  TOTAL_ROW_CELL: {
    borderBottom: 'double',
    fontSize: '18px',
    lineHeight: '18px',
  },
  SECTION_HEADER: {
    borderBottom: '1px dashed',
    fontSize: '18px',
    lineHeight: '18px',
  },
  SECTION: { marginBottom: '10px' },
};

const QuoteEmail = (props) => {
  const PackageLines   = () => (
    <tbody>
      {props.quote.cargo.packageLines.map((packageLine, index) => (
        <tr key={index}>
          <td>{packageLine.numPackages} {packageLine.packageType}</td>
          <td>{packageLine.length}x{packageLine.width}x{packageLine.height}</td>
          <td>{packageLine.weight} {packageLine.weightUOM} / pkg</td>
          <td style={STYLES.ALIGN_RIGHT}>
            {packageLine.numPackages} pkgs,&nbsp;
            {packageLine.volume} {packageLine.volumeUOM},&nbsp;
            {packageLine.totalWeight} {packageLine.weightUOM}
          </td>
        </tr>
      ))}
    </tbody>
  );

  const ContainerLines = () => <tr>container lines</tr>;

  const PackageTotals = () => (
    <tbody>
      <tr>
        <td style={STYLES.TOTAL_SPACER} />
        <td>TOTAL</td>
        <td style={STYLES.ALIGN_RIGHT}>
          {props.quote.cargo.totalPackages} pkgs,&nbsp;
          {props.quote.cargo.totalVolume} {props.quote.cargo.volumeUOM},&nbsp;
          {props.quote.cargo.totalWeight} {props.quote.cargo.weightUOM}
        </td>
      </tr>
    </tbody>
  );

  return (
    <div>
      <pre>{props.message}</pre>
      <div style={STYLES.QUOTE}>
        <table style={{ ...STYLES.TABLE, ...STYLES.SECTION }}>
          <tbody>
            <tr>
              <td style={STYLES.HEADER}>AGILITY FREIGHT QUOTATION</td>
              <td style={{ ...STYLES.TITLE, ...STYLES.ALIGN_RIGHT }}>
                EXPIRES {moment(props.quote.expiryDate).format('DD MMM YYYY').toUpperCase()}
              </td>
            </tr>
          </tbody>
        </table>
        <table style={{ ...STYLES.TABLE, ...STYLES.SECTION }}>
          <tbody>
            <tr>
              <td style={STYLES.TOTAL_SPACER} />
              <td style={STYLES.TOTAL_ROW_CELL}>TOTAL PRICE</td>
              <td style={{ ...STYLES.TOTAL_ROW_CELL, ...STYLES.ALIGN_RIGHT }}>
                {props.quote.charges.totalCharges} {props.quote.charges.currency}
              </td>
            </tr>
          </tbody>
        </table>
        <table style={STYLES.TABLE}>
          <tbody>
            <tr style={STYLES.SECTION_HEADER}>
              CARGO
            </tr>
          </tbody>
        </table>
        <table style={STYLES.TABLE}>
          {props.quote.cargo.cargoType === 'Loose' ? PackageLines() : ContainerLines()}
        </table>
        <table style={STYLES.TABLE}>
          {props.quote.cargo.cargoType === 'Loose' ? PackageTotals() : ContainerTotals()}
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
    charges: {},
    cargo: {},
  },
};

export default QuoteEmail;
