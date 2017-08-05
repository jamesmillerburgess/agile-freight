import {} from 'meteor/pascoual:pdfkitx';

import { weightFormat } from '../ui/formatters/numberFormatters';
import { fitLines } from './documentUtils';


const PDFDocument = global.PDFDocument;
const blobStream = global.blobStream;

export const AirWaybill = (shipment, cb) => {
  if (!shipment) {
    return;
  }

  // create a document and pipe to a blob
  const doc = new PDFDocument({
    // size: [595.28, 841.89], // PDFunit
    size: 'letter',
    dpi: 400,
    margins: {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    },
  });
  const stream = doc.pipe(blobStream());
  // AWBUnit * (mm / AWBunit) = mm
  // mm * (PDFunit / mm) = PDFunit
  const mmx = 210; // mm
  const mmy = 297; // mm
  const PDFUnitPerMMx = 595.28 / mmx;
  const PDFUnitPerMMy = 841.89 / mmy;
  const AWBunitx = 2.54; // mm / AWBunit  215.90 mm max
  const AWBunity = 4.23418; // mm / AWBunit  308.79 mm max
  const PDFUnitPerAWBUnitx = AWBunitx * PDFUnitPerMMx;
  const PDFUnitPerAWBUnity = AWBunity * PDFUnitPerMMy;
  const rect = (x1, y1, x2, y2) =>
    doc.rect(
      x1 * PDFUnitPerAWBUnitx,
      y1 * PDFUnitPerAWBUnity,
      (x2 - x1) * PDFUnitPerAWBUnitx,
      (y2 - y1) * PDFUnitPerAWBUnity,
    );
  const trap = (x1, y1, x2) =>
    doc
      .polygon(
        [x1 * PDFUnitPerAWBUnitx, y1 * PDFUnitPerAWBUnity],
        [(x1 + 1.2) * PDFUnitPerAWBUnitx, (y1 + 0.8) * PDFUnitPerAWBUnity],
        [(x2 - 1.2) * PDFUnitPerAWBUnitx, (y1 + 0.8) * PDFUnitPerAWBUnity],
        [x2 * PDFUnitPerAWBUnitx, y1 * PDFUnitPerAWBUnity],
      );
  const line = (x1, y1, x2, y2) =>
    doc
      .moveTo(x1 * PDFUnitPerAWBUnitx, y1 * PDFUnitPerAWBUnity)
      .lineTo(x2 * PDFUnitPerAWBUnitx, y2 * PDFUnitPerAWBUnity);
  const label = (text, x1, y1, x2, align) =>
    doc
      .text(
        text,
        (x1 + 0.5) * PDFUnitPerAWBUnitx,
        (y1 + 0.2) * PDFUnitPerAWBUnity,
        {
          align: align || 'left',
          width: (x2 - x1 - 1) * PDFUnitPerAWBUnitx || null,
        },
      );

  doc
    .registerFont('value', 'Courier')
    .registerFont('title', 'Helvetica-Bold')
    .registerFont('label', 'Helvetica')
    .fontSize(7);

  doc.lineWidth(0.25);

  rect(8, 2.5, 82, 62.5);
  line(12, 1, 12, 2.5);
  line(16, 1, 16, 2.5);

  rect(8, 2.5, 44, 8.5);
  label('Shipper\'s Name and Address', 8, 2.5);
  rect(26, 2.5, 44, 4.5);
  label('Shipper\'s Account Number', 26, 2.5, 44, 'center');
  rect(44, 7, 82, 8.5);
  label('Not Negotiable', 44, 2.5);
  doc.font('title')
     .fontSize(14);
  label('Air Waybill', 44, 4.2);
  doc.font('label')
     .fontSize(7);
  label('Issued by', 44, 5.4);
  label(
    'Copies 1, 2 and 3 of thie Air Waybill are originals and have the same ' +
    'validity.',
    44,
    7.3,
  );

  rect(8, 8.5, 44, 14.5);
  label('Consignee\'s Name and Address', 8, 8.5);
  rect(26, 8.5, 44, 10.5);
  label('Consignee\'s Account Number', 26, 8.5, 44, 'center');
  rect(44, 8.5, 82, 20.5);
  doc.fontSize(6);
  label(
    'It is agreed that the goods described herein are accepted in apparent ' +
    'good order and condition (except as noted) for carriage SUBJECT TO THE ' +
    'CONDITIONS OF CONTRACT ON THE REVERSE HEREOF. ALL GOODS MAY BE CARRIED ' +
    'BY ANY OTHER MEANS INCLUDING ROAD OR ANY OTHER CARRIER UNLESS SPECIFIC ' +
    'CONTRARY INSTRUCTIONS ARE GIVEN HEREON BY THE SHIPPER, AND SHIPPER ' +
    'AGREES THAT THE SHIPMENT MAY BE CARRIED VIA INTERMEDIATE STOPPING ' +
    'PLACES WHICH THE CARRIER DEEMS APPROPRIATE. THE SHIPPER\'S ATTENTION IS ' +
    'DRAWN TO THE NOTICE CONCERNING CARRIER\'S LIMITATION OF LIABILITY. ' +
    'Shipper may increase such limitation of liability by declaring a higher ' +
    'value for carriage and paying a supplemental charge if required.',
    44,
    8.5,
    82,
  );
  doc.fontSize(7);

  rect(8, 14.5, 44, 18.5);
  label('Issuing Carrier\'s Agent Name and City', 8, 14.5);
  rect(44, 14.5, 82, 20.5);
  label('Accounting Information', 44, 14.5);

  rect(8, 18.5, 26, 20.5);
  label('Agent\'s IATA Code', 8, 18.5);
  rect(26, 18.5, 44, 20.5);
  label('Account No.', 26, 18.5);

  rect(8, 20.5, 44, 22.5);
  label(
    'Airport of Departure (Addr. of First Carrier) and Requested Routing',
    8,
    20.5,
  );
  rect(44, 20.5, 82, 22.5);
  label('Reference Number', 44, 20.5, 55, 'center');
  trap(55, 20.5, 73);
  label('Optional Shipping Information', 55, 20.5, 73, 'center');
  line(58, 21.3, 58, 22.5);
  line(70, 21.3, 70, 22.5);

  rect(8, 22.5, 12, 24.5);
  label('To', 8, 22.5);
  rect(12, 22.5, 30, 24.5);
  doc.fontSize(6);
  label('By First Carrier', 11.7, 22.5);
  trap(17.5, 22.5, 29.75);
  doc.fontSize(6.5);
  label('Routing and Destination', 17.5, 22.5, 29.75, 'center');
  doc.fontSize(7);
  rect(30, 22.5, 34, 24.5);
  label('to', 30, 22.5);
  rect(34, 22.5, 37, 24.5);
  label('by', 34, 22.5);
  rect(37, 22.5, 41, 24.5);
  label('to', 37, 22.5);
  rect(41, 22.5, 44, 24.5);
  label('by', 41, 22.5);
  rect(44, 22.5, 48, 24.5);
  doc.fontSize(6);
  label('Currency', 43.85, 22.5);
  rect(48, 22.5, 50, 24.5);
  doc.fontSize(4);
  label('CHGS\nCode', 47.5, 22.5, 50.5, 'center');
  doc.fontSize(7);
  rect(50, 22.5, 54, 23.3);
  label('WT/VAL', 49.5, 22.5, 54.5, 'center');
  rect(50, 23.3, 52, 24.5);
  doc.fontSize(4);
  label('PPD', 50, 23.3);
  rect(52, 23.3, 54, 24.5);
  label('COLL', 51.75, 23.3);
  rect(54, 23.3, 58, 23.3);
  doc.fontSize(7);
  label('Other', 54, 22.5);
  rect(54, 23.3, 56, 24.5);
  doc.fontSize(4);
  label('PPD', 54, 23.3);
  rect(56, 23.3, 58, 24.5);
  label('COLL', 55.75, 23.3);
  rect(58, 22.5, 70, 24.5);
  doc.fontSize(6);
  label('Declared Value for Carriage', 58, 22.5);
  rect(70, 22.5, 82, 24.5);
  label('Declared Value for Customs', 70, 22.5);

  doc.stroke();
  doc.lineWidth(1.5);
  rect(8.1, 24.57, 25.9, 26.43);
  label('Airport of Destination', 8, 24.5, 26, 'center');
  doc.stroke();
  doc.lineWidth(0.25);
  rect(26, 24.5, 44, 26.5);
  trap(29, 24.5, 41);
  label('Requested Flight/Date', 29, 24.5, 41, 'center');
  line(35, 25.3, 35, 26.5);
  rect(44, 24.5, 55, 26.5);
  label('Amount of Insurance', 44, 24.5, 55, 'center');
  rect(55, 24.5, 82, 26.5);
  label(
    'INSURANCE – If carrier offers insurance, and such insurance is ' +
    'requested in accordance with the conditions thereof, indicate amount to ' +
    'be insured in figures in box marked "Amount of Insurance".',
    55,
    24.5,
    82,
  );

  rect(8, 26.5, 82, 30.5);
  label('Handling Information', 8, 26.5);
  rect(70, 28.5, 82, 30.5);
  label('SCI', 70, 28.5, 82, 'center');

  rect(8, 30.5, 82, 46.5);
  doc.fontSize(6);
  label('No. of Pieces RCP', 8, 30.5, 12);
  doc.fontSize(7);
  label('Gross\nWeight', 12, 30.7, 19, 'center');
  doc.fontSize(5);
  label('kg\n\nlb', 18.65, 30.5);
  doc.fontSize(7);
  rect(8, 30.5, 20, 46.5);
  rect(8, 30.5, 20, 32.5);
  rect(12, 30.5, 19, 46.5);
  rect(8, 44.5, 19, 46.5);
  rect(21, 30.5, 29, 46.5);
  label('Rate Class', 21, 30.5);
  rect(22, 31.5, 29, 46.5);
  doc.fontSize(5);
  label('Commodity\nItem No.', 22, 31.4, 29, 'center');
  doc.fontSize(7);
  rect(22, 31.5, 29, 32.5);
  rect(30, 30.5, 37, 46.5);
  label('Chargeable Weight', 30, 30.7, 37, 'center');
  rect(30, 32.5, 37, 46.5);
  rect(38, 30.5, 46, 46.5);
  label('Rate', 38, 30.5);
  label('Charge', 42, 31.5);
  rect(38, 32.5, 46, 46.5);
  rect(47, 30.5, 59, 46.5);
  label('Total', 47, 31, 59, 'center');
  rect(47, 32.5, 59, 44.5);
  rect(60, 30.5, 82, 46.5);
  label(
    'Nature and Quantity of Goods\n(incl. Dimensions or Volume',
    60,
    30.7,
    82,
    'center',
  );
  rect(60, 32.5, 82, 46.5);

  rect(8, 46.5, 36, 48.5);
  trap(9, 46.5, 16);
  label('Prepaid', 9, 46.5, 16, 'center');
  trap(16, 46.5, 28);
  label('Weight Charge', 16, 46.5, 28, 'center');
  trap(28, 46.5, 35);
  label('Collect', 28, 46.5, 35, 'center');
  line(22, 47.3, 22, 48.5);
  label('Other Charges', 36, 46.5);

  rect(8, 48.5, 36, 50.5);
  trap(15, 48.5, 29);
  label('Valuation Charge', 15, 48.5, 29, 'center');
  line(22, 49.3, 22, 50.5);

  rect(8, 50.5, 36, 52.5);
  trap(18, 50.5, 26);
  label('Tax', 18, 50.5, 26, 'center');
  line(22, 51.3, 22, 52.5);

  rect(8, 52.5, 36, 54.5);
  trap(11, 52.5, 33);
  label('Total Other Charges Due Agent', 11, 52.5, 33, 'center');
  line(22, 53.3, 22, 54.5);
  rect(36, 52.5, 82, 58.5);
  doc
    .text(
      'Shipper certifies that the particulars on the face hereof are correct ' +
      'and that ',
      (36 + 0.5) * PDFUnitPerAWBUnitx,
      (52.5 + 0.2) * PDFUnitPerAWBUnity,
      { width: (82 - 36 - 1) * PDFUnitPerAWBUnitx, continued: true },
    )
    .font('title')
    .text(
      'insofar as any part of the consignment contains dangerous goods, ' +
      'such part is properly described by name and is in proper condition ' +
      'for carriage by air according to the applicable Dangerous Goods ' +
      'Regulations.',
    )
    .font('label');
  label('Signature of Shipper or his Agent', 36, 57.5, 82, 'center');

  rect(8, 54.5, 36, 56.5);
  trap(11, 54.5, 33);
  label('Total Other Charges Due Carrier', 11, 54.5, 33, 'center');
  line(22, 55.3, 22, 56.5);

  rect(8, 56.5, 22, 58.5);
  rect(22, 56.5, 36, 58.5);

  rect(8, 58.5, 22, 60.5);
  trap(9, 58.5, 21, 58.5);
  label('Total Prepaid', 9, 58.5, 21, 'center');
  rect(22, 58.5, 36, 60.5);
  trap(23, 58.5, 35);
  label('Total Collect', 23, 58.5, 35, 'center');
  rect(36, 58.5, 82, 62.5);

  rect(8, 60.5, 22, 62.5);
  trap(8, 60.5, 22);
  label('Currency Conversion Rates', 8, 60.5, 22, 'center');
  rect(22, 60.5, 36, 62.5);
  trap(22, 60.5, 36);
  label('CC Charges in Dest. Currency', 22, 60.5, 36, 'center');

  label('Executed on (date)', 36, 61.5);
  label('at (place)', 36, 61.5, 74, 'center');
  label('Signature of Issuing Carrier or its Agent', 63.5, 61.5);

  rect(8, 62.5, 22, 64.5);
  label('For Carrier\'s Use only\nat Destination', 8, 62.7, 22, 'center');
  rect(22, 62.5, 36, 64.5);
  trap(23, 62.5, 35);
  label('Charges at Destination', 23, 62.5, 35, 'center');
  rect(36, 62.5, 50, 64.5);
  trap(37, 62.5, 49);
  label('Total Collect Charges', 37, 62.5, 49, 'center');

  doc.stroke();

  line(36.5, 61.4, 81.5, 61.4);
  line(36.5, 57.4, 81.5, 57.4);
  doc
    .dash(1)
    .lineWidth(0.1)
    .stroke();

  doc
    .font('Courier')
    .fontSize(10);
  const shipper = fitLines(
    `${shipment.shipper}\n${shipment.shipperAddress}`,
    35 * PDFUnitPerAWBUnitx,
    4,
    'Courier',
    10,
  );
  label(shipper, 8, 4.5);
  const consignee = fitLines(
    `${shipment.consignee}\n${shipment.consigneeAddress}`,
    35 * PDFUnitPerAWBUnitx,
    4,
    'Courier',
    10,
  );
  label(consignee, 8, 10.5);
  label(shipment.movement.departure.locationCode, 8, 21.3);
  label(shipment.movement.arrival.locationCode, 8, 25.3);
  let numPackages = '';
  let weight = '';
  shipment.cargo.packageLines.forEach((packageLine) => {
    numPackages += `${packageLine.numPackages}\n`;
    weight += `${packageLine.totalWeight}\n`;
  });
  label(numPackages, 8, 32.5, 12, 'right');
  label(weight, 12, 32.5, 19, 'right');
  label(shipment.cargo.weightUOM[0].toUpperCase(), 18.6, 32.5);
  const description = fitLines(
    shipment.cargo.description,
    21 * PDFUnitPerAWBUnitx,
    12,
    'Courier',
    10,
  );
  label(description, 60, 32.5, 82);
  label(shipment.cargo.totalPackages, 8, 45, 12, 'right');
  label(shipment.cargo.totalWeight, 12, 45, 19, 'right');
  label(
    Math.round(shipment.cargo.chargeableWeight * 10) / 10,
    30,
    45,
    37,
    'right',
  );
  doc.end();
  stream.on(
    'finish',
    () => cb(stream.toBlobURL('application/pdf')),
  );
};
