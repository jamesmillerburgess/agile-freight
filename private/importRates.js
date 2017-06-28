const SELL_RATES = [
  {
    type: 'sell',
    chargeCode: 'ITP',
    level: 'country',
    route: 'GBGB',
    anyBasis: 'Shipment',
    anyRanges: [],
    anyMinimumAmount: 0,
    looseBasis: 'Weight Measure',
    looseRanges: ['a', 'b', 'c', 'd'],
    looseMinimumAmount: 0,
    containerizedBasis: 'Mile',
    containerizedRanges: ['e'],
    containerizedMinumumAmount: 0,
    ranges: {
      a: { maximumUnits: 50, unitPrice: 7 },
      b: { maximumUnits: 200, unitPrice: 5 },
      c: { maximumUnits: 500, unitPrice: 4.5 },
      d: { unitPrice: 4 },
      e: { unitPrice: 0.5 },
    },
    currency: 'GBP',
  },
  {
    type: 'sell',
    chargeCode: 'ITP',
    level: 'country',
    route: ['US', 'US'],
    basis: 'Mile',
    unitPrice: 0.25,
    currency: 'USD',
  },
  {
    type: 'sell',
    chargeCode: 'IFR',
    level: 'location',
    route: 'USTPACNSHA',
    basis: 'TEU',
    unitPrice: 550,
    currency: 'USD',
  },
  {
    type: 'sell',
    chargeCode: 'IFR',
    level: 'carrier',
    route: 'MAEUUSTPACNSHA',
    basis: 'TEU',
    unitPrice: 850,
    currency: 'USD',
  },
];

var db = connect('localhost:3001/meteor');

db.Rates.remove({});

db.Rates.createIndex(
  { type: 1, chargeCode: 1, level: 1, route: 1 },
  { unique: true },
);

SELL_RATES.forEach(function (sellRate) {
  sellRate._id = ObjectId().str;
  db.Rates.insert(sellRate);
});
