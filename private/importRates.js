const SELL_RATES = [
  {
    type: 'sell',
    chargeCode: 'ITP',
    level: 'country',
    route: 'GBGB',
    isSplitByCargoType: true,
    anyBasis: 'Shipment',
    anyRanges: [],
    anyMinimumAmount: 0,
    isAnyPriceFixed: false,
    looseBasis: 'KG',
    looseRanges: ['a', 'b', 'c', 'd'],
    looseMinimumAmount: NaN,
    isLoosePriceFixed: true,
    containerizedBasis: 'Container',
    containerizedRanges: ['e'],
    containerizedMinimumAmount: undefined,
    isContainerizedPriceFixed: false,
    ranges: {
      a: { maximumUnits: 50, unitPrice: 35 },
      b: { maximumUnits: 500, unitPrice: 45 },
      c: { maximumUnits: 1000, unitPrice: 65 },
      d: { maximumUnits: NaN, unitPrice: 100 },
      e: { maximumUnits: NaN, unitPrice: 450 },
    },
    currency: 'GBP',
  },
];

// var db = connect('localhost:3001/meteor');

db.Rates.remove({});

db.Rates.createIndex(
  { type: 1, chargeCode: 1, level: 1, route: 1 },
  { unique: true }
);

SELL_RATES.forEach(function (sellRate) {
  sellRate._id = ObjectId().str;
  db.Rates.insert(sellRate);
});
