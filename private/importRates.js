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
    looseBasis: 'Weight Measure',
    looseRanges: ['a', 'b', 'c', 'd'],
    looseMinimumAmount: 0,
    isLoosePriceFixed: false,
    containerizedBasis: 'Mile',
    containerizedRanges: ['e'],
    containerizedMinumumAmount: 0,
    isContainerizedPriceFixed: false,
    ranges: {
      a: { maximumUnits: 50, unitPrice: 7 },
      b: { maximumUnits: 200, unitPrice: 5 },
      c: { maximumUnits: 500, unitPrice: 4.5 },
      d: { unitPrice: 4 },
      e: { unitPrice: 0.5 },
    },
    currency: 'GBP',
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
