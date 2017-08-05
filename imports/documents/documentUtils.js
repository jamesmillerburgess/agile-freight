import {} from 'meteor/pascoual:pdfkitx';

const PDFDocument = global.PDFDocument;

export const calculateRealLineHeight = (font, fontSize) => {
  const doc = new PDFDocument({
    size: [500, 841.89],
    margins: {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    },
  });
  if (font) {
    doc
      .registerFont(font, font)
      .font(font);
  }
  if (fontSize) {
    doc.fontSize(fontSize);
  }
  return doc.text('.').y;
};

export const calculateLines = (text, colWidth, font, fontSize) => {
  const lineHeight = calculateRealLineHeight(font, fontSize);
  const doc = new PDFDocument({
    size: [colWidth, 841.89],
    margins: {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    },
  });
  if (font) {
    doc
      .registerFont(font, font)
      .font(font);
  }
  if (fontSize) {
    doc.fontSize(fontSize);
  }
  doc.text(text);
  return Math.round(doc.y / lineHeight);
};

export const removeLastWord = (text) => {
  const words = text.split(/[\s,]+/);
  return text.slice(0, (words[words.length - 1].length * -1) - 1);
};

export const fitLines = (text, colWidth, numLines, font, fontSize) => {
  if (numLines < 1) {
    return '';
  }
  let fittedText = text;
  let linesTaken = calculateLines(fittedText, colWidth, font, fontSize);
  while (linesTaken > numLines) {
    fittedText = removeLastWord(fittedText);
    linesTaken = calculateLines(fittedText, colWidth, font, fontSize);
  }
  return fittedText;
};
