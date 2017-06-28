const SELL_RATES = [
  {
    type: 'sell',
    chargeCode: 'ITP',
    level: 'country',
    route: 'GBGB',
    rates: {
      loose: {
        basis: 'Weight Measure',
        ranges: [
          { max: 50, unitPrice: 7 },
          { max: 200, unitPrice: 5 },
          { max: 500, unitPrice: 4.5 },
          { unitPrice: 4 },
        ],
      },
      containerized: {
        basis: 'Mile',
        unitPrice: 0.5,
      },
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
