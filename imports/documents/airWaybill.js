import {} from 'meteor/pascoual:pdfkitx';
import { HTTP } from 'meteor/http';

global.Buffer = global.Buffer || require("buffer").Buffer;

const PDFDocument = global.PDFDocument;
const blobStream = global.blobStream;

export const AirWaybill = (shipment, cb) => {
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

  // const xhr = new XMLHttpRequest;
  // xhr.responseType = 'arraybuffer';
  // xhr.onload = () => {
  //   console.log('hello');
  //   doc.image(new Buffer(xhr.response));
  // };
  // xhr.open('GET', 'img/air-waybill.png', true);
  // xhr.send();

  HTTP.call('GET', 'img/air-waybill.png', (err, res) => {
    console.log(err);
    console.log(res);
  });

  // const arrayBuffer = 'img/air-waybill.jpg';
  // doc.image(new Buffer(arrayBuffer), 0, 15, { width: 300 });

  doc.end();
  stream.on(
    'finish',
    () => cb(stream.toBlobURL('application/pdf')),
  );
};
