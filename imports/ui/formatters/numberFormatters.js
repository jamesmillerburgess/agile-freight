exports.currencyFormat = (query = 0) =>
  query.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

exports.weightFormat = (query = 0) =>
  query.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 3 });

exports.integerFormat = (query = 0) =>
  query.toLocaleString(undefined, { maximumFractionDigits: 0 });
