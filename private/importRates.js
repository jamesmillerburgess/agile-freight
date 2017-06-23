const SELL_RATES = [
  {
    type: 'sell',
    chargeCode: 'ITP',
    level: 'global',
    rate: {
      basis: 'Mile',
      unitPrice: 0.5,
      currency: 'USD',
    },
  },
  {
    type: 'sell',
    chargeCode: 'ITP',
    level: 'country',
    route: 'USUS',
    rate: {
      basis: 'Mile',
      unitPrice: 0.25,
      currency: 'USD',
    },
  },
  {
    type: 'sell',
    chargeCode: 'IFR',
    level: 'location',
    route: 'USTPACNSHA',
    rate: {
      basis: 'TEU',
      unitPrice: 550,
      currency: 'USD',
    },
  },
  {
    type: 'sell',
    chargeCode: 'IFR',
    level: 'supplier',
    route: 'MAEUUSTPACNSHA',
    rate: {
      basis: 'TEU',
      unitPrice: 850,
      currency: 'USD',
    },
  },
];

var db = connect('localhost:3001/meteor');

db.Rates.remove({});

db.collection.createIndex(
  { type: 1, chargeCode: 1, level: 1, route: 1 },
  { unique: true }
);

SELL_RATES.forEach(function (sellRate) {
  sellRate._id = ObjectId().str;
  db.Rates.insert(sellRate);
});
