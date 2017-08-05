import {} from 'meteor/pascoual:pdfkitx';

import { weightFormat } from '../ui/formatters/numberFormatters';
import { fitLines } from './documentUtils';

const PDFDocument = global.PDFDocument;
const blobStream = global.blobStream;

export const BillOfLading = (shipment, cb) => {
  if (!shipment) {
    return;
  }

  // create a document and pipe to a blob
  const doc = new PDFDocument({
    size: [595.28, 841.89],
    margins: {
      top: 18,
      bottom: 18,
      left: 18,
      right: 18,
    },
  });
  const stream = doc.pipe(blobStream());

  const page = {
    width: 595.28,
    height: 841.89,
    contentWidth: 595.28 - (18 * 2),
    contentHeight: 841.89 - (18 * 2),
    columnWidth: ((595.28 - (18 * 2)) / 2) - (18 / 2),
    leftColumnStart: 18,
    rightColumnStart: (595.28 / 2) + (18 / 2),
    leftColumnEnd: (18 + ((595.28 - (18 * 2)) / 2)) - (18 / 2),
    rightColumnEnd: 595.28 - 18,
    margin: 18,
  };

  doc
    .registerFont('label', 'Helvetica-Bold')
    .registerFont('value', 'Courier')
    .registerFont('title', 'Helvetica-Bold')
    .registerFont('static', 'Helvetica');

  // *** Parties ***
  function drawParty(x, y, label, value) {
    doc
      .moveTo(x, y)
      .lineTo(x + page.columnWidth, y)
      .stroke();

    doc
      .moveTo(x, y - 0.5)
      .lineTo(x, y + 6.5)
      .stroke();

    doc
      .moveTo(x + page.columnWidth, y - 0.5)
      .lineTo(x + page.columnWidth, y + 6.5)
      .stroke();

    doc
      .font('label')
      .fontSize(7)
      .text(label, x + 1, y + 1);

    doc
      .font('value')
      .fontSize(10)
      .text(value, x + 1, y + 9);
  }

  drawParty(
    page.margin,
    page.margin,
    'SHIPPER',
    `${shipment.shipper}\n${shipment.shipperAddress}`,
  );
  drawParty(
    page.margin,
    page.margin + 70,
    'CONSIGNEE',
    `${shipment.consignee}\n${shipment.consigneeAddress}`,
  );
  drawParty(
    page.margin,
    page.margin + 140,
    'NOTIFY PARTY',
    `${shipment.notifyParty}\n${shipment.notifyPartyAddress}`,
  );

  function drawField(x, y, label, value) {
    doc
      .moveTo(x, y)
      .lineTo(x + (page.columnWidth / 2), y)
      .stroke();

    doc
      .moveTo(x, y - 0.5)
      .lineTo(x, y + 6.5)
      .stroke();

    doc
      .moveTo(x + (page.columnWidth / 2), y - 0.5)
      .lineTo(x + (page.columnWidth / 2), y + 6.5)
      .stroke();

    doc
      .font('label')
      .fontSize(7)
      .text(label, x + 1, y + 1);

    doc
      .font('value')
      .fontSize(10)
      .text(value, x + 1, y + 9, { width: page.columnWidth / 2 });
  }

  drawField(
    page.margin,
    page.margin + 210,
    'PRE-CARRIAGE BY',
    shipment.movement.preCarriageBy,
  );
  let receipt = '';
  if (shipment.movement.receipt && shipment.movement.receipt.name) {
    receipt = shipment.movement.receipt.name;
  }
  drawField(
    page.margin + (page.columnWidth / 2),
    page.margin + 210,
    'PLACE OF RECEIPT',
    receipt,
  );

  drawField(
    page.margin,
    page.margin + 240,
    'VESSEL',
    shipment.movement.vessel,
  );
  let departure = '';
  if (shipment.movement.departure && shipment.movement.departure.name) {
    departure = shipment.movement.departure.name;
  }
  drawField(
    page.margin + (page.columnWidth / 2),
    page.margin + 240,
    'PORT OF LOADING',
    departure,
  );
  let arrival = '';
  if (shipment.movement.arrival && shipment.movement.arrival.name) {
    arrival = shipment.movement.arrival.name;
  }
  drawField(
    page.margin,
    page.margin + 270,
    'PORT OF DISCHARGE',
    arrival,
  );
  let delivery = '';
  if (shipment.movement.delivery && shipment.movement.delivery.name) {
    delivery = shipment.movement.delivery.name;
  }
  drawField(
    page.margin + (page.columnWidth / 2),
    page.margin + 270,
    'PLACE OF DELIVERY',
    delivery,
  );

  drawField(
    page.rightColumnStart,
    page.margin,
    'CUSTOMER REFERENCE',
    shipment.customerReference || '',
  );
  drawField(
    page.rightColumnStart + (page.columnWidth / 2),
    page.margin,
    'BILL OF LADING NUMBER',
    shipment.billOfLadingNumber || '',
  );

  doc
    .font('title')
    .fontSize(26)
    .text(
      'Agile Freight',
      page.rightColumnStart,
      page.margin + 30,
      { width: page.columnWidth, align: 'center' },
    );

  doc
    .font('title')
    .fontSize(18)
    .text(
      shipment.blType,
      page.rightColumnStart,
      page.margin + 60,
      { width: page.columnWidth, align: 'center' },
    );
  if (shipment.blType === 'Waybill') {
    doc.text(
      'NON-NEGOTIABLE',
      page.rightColumnStart,
      page.margin + 78,
      {
        width: page.columnWidth,
        align: 'center',
      },
    );
  }

  const legalText = 'Received by the Carrier from the Shipper on the terms ' +
                    'hereof the total number of Containers or packages said to ' +
                    'contain Goods enumerated below in the box marked "Total ' +
                    'No. of Containers or Packages (in words)" in apparent ' +
                    'good order and condition (unless otherwise indicated ' +
                    'herein) for Carriage from the Place of Receipt or the ' +
                    'Port of Loading to the Port of Discharge or the Place ' +
                    'of Delivery.\n' +
                    'In consideration of Carrier\'s acceptance of the ' +
                    'Containers or packages, the Shipper (on its own behalf ' +
                    'and on behalf of all persons included in the definition ' +
                    'of "Merchant" contained in the applicable Freight For All ' +
                    'standard from bill of lading) agrees that all terms on ' +
                    'the face and back hereof apply. THE MERCHANT SPECIFICALLY ' +
                    'AGREES THAT ITS ATTENTION HAS BEEN DRAWN TO AND THAT IT ' +
                    'HAS ACCEPTED THE APPLICABLE FREIGHT FOR ALL STANDARD FORM ' +
                    'BILL OF LADING ("THE CARRIER\'S B/L"), THE CARRIER\'S ' +
                    'APPLICABLE TARIFF(S), AND THE CMI UNIFORM RULES FOR SEA ' +
                    'WAYBILLS AS REFERRED TO IN AND INCORPORATED HEREIN BY ' +
                    'CLAUSE 1 ON THE REVERSE HEREOF.\n' +
                    'This waybill supersedes any prior arrangements, ' +
                    'agreements or representations by the Carrier, its agent ' +
                    'or any other person, save for service contracts between ' +
                    'the parties, and where applicable valid under the United ' +
                    'States Shipping Act.';

  doc
    .font('static')
    .fontSize(8)
    .text(
      legalText,
      page.rightColumnStart,
      page.margin + 110,
      { width: page.columnWidth, align: 'justify', indent: 10 },
    );

  doc
    .moveTo(page.margin, page.margin + 300)
    .lineTo(page.rightColumnEnd, page.margin + 300)
    .stroke();

  doc
    .font('label')
    .fontSize(7)
    .text(
      'DESCRIPTION OF GOODS, MARKS AND NUMBERS, CONTAINER NUMBERS, NUMBER ' +
      'AND KIND OF PACKAGES',
      page.margin + 1,
      page.margin + 301,
    )
    .font('value')
    .fontSize(10);

  let description = '';
  if (shipment.cargo.totalContainers) {
    shipment.cargo.containerLines.forEach((line) => {
      description += `${line.numContainers} ${line.containerType}\n`;
    });
  }
  description += shipment.cargo.description;

  let remainingDesc = fitLines(
    description,
    300,
    17,
    'Courier',
    10,
  );
  doc.text(remainingDesc, page.margin + 1, page.margin + 320, { width: 300 });
  remainingDesc = description.slice(remainingDesc.length);

  doc
    .fontSize(7)
    .font('label')
    .text(
      'GROSS WEIGHT',
      page.margin + 410,
      page.margin + 301,
    )
    .text(
      'MEASUREMENT',
      page.margin + 500,
      page.margin + 301,
    );

  doc
    .fontSize(10)
    .font('value');

  let totalWeight = '';
  let measurement = '';
  shipment.cargo.packageLines.forEach((line) => {
    totalWeight += `${weightFormat(line.totalWeight)} ${line.weightUOM}\n`;
    measurement += `${weightFormat(line.volume)} ${line.volumeUOM}\n`;
  });

  doc.text(
    totalWeight,
    page.margin + 395,
    page.margin + 320,
    { width: 70, align: 'right' },
  );
  doc.text(
    measurement,
    page.margin + 485,
    page.margin + 320,
    { width: 70, align: 'right' },
  );

  doc
    .fontSize(7)
    .font('label')
    .text(
      'DECLARED VALUE US$',
      page.margin + 1,
      page.margin + 500,
    )
    .fontSize(6)
    .text(
      'IF SHIPPER ENTERS A VALUE, THE AD VALOREM RATE WILL BE CHARGED (SEE ' +
      'CLAUSE 24 OF CARRIERS STANDARD BILL OF LADING)',
      page.margin + 140,
      page.margin + 500,
    )
    .fontSize(8)
    .text(
      'TOTAL NO. OF CONTAINERS\nOR PACKAGES (IN WORDS)',
      page.margin + 1,
      page.margin + 510,
    );

  doc
    .moveTo(page.margin, page.margin + 530)
    .lineTo(page.rightColumnEnd, page.margin + 530)
    .stroke()
    .fontSize(7)
    .text(
      'FREIGHT AND CHARGES',
      page.margin + 1,
      page.margin + 531,
    )
    .text(
      'REVENUE TONS',
      page.margin + 140,
      page.margin + 531,
    )
    .text(
      'RATE',
      page.margin + 230,
      page.margin + 531,
    )
    .text(
      'PER',
      page.margin + 290,
      page.margin + 531,
    )
    .text(
      'PREPAID',
      page.margin + 360,
      page.margin + 531,
    )
    .text(
      'COLLECT',
      page.margin + 460,
      page.margin + 531,
    )
    .moveTo(page.margin, page.margin + 630)
    .lineTo(page.rightColumnEnd, page.margin + 630)
    .stroke()
    .text(
      'EXCHANGE RATE',
      page.margin + 1,
      page.margin + 631,
    )
    .text(
      'PREPAID AT',
      page.margin + 80,
      page.margin + 631,
    )
    .text(
      'PAYABLE AT',
      page.margin + 220,
      page.margin + 631,
    )
    .text(
      'PLACE AND DATE OF ISSUE',
      page.margin + 360,
      page.margin + 631,
    )
    .moveTo(page.margin + 80, page.margin + 660)
    .lineTo(page.rightColumnEnd, page.margin + 660)
    .stroke()
    .text(
      'TOTAL PREPAID IN LOCAL CURRENCY',
      page.margin + 80,
      page.margin + 661,
    )
    .text(
      'NUMBER OF WAYBILLS',
      page.margin + 220,
      page.margin + 661,
    )
    .moveTo(page.margin, page.margin + 690)
    .lineTo(page.margin + 360, page.margin + 690)
    .stroke()
    .text(
      'SHIPPED ON BOARD THE VESSEL',
      page.margin + 1,
      page.margin + 691,
    )
    .text(
      'DATE',
      page.margin + 1,
      page.margin + 721,
    )
    .text(
      'BY',
      page.margin + 1,
      page.margin + 751,
    );

  if (remainingDesc.length > 0) {
    doc
      .addPage()
      .font('value')
      .fontSize(10)
      .text('-----CONTINUATION PAGE-----', { align: 'center' })
      .text(remainingDesc);
  }

  doc.end();
  stream.on(
    'finish',
    () => cb(stream.toBlobURL('application/pdf')),
  );
};
