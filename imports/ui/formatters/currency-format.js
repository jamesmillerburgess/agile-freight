exports.currencyFormat = (query = 0) => parseInt(query, 10).toLocaleString();

exports.grossWeightFormat = (query = 0) => parseInt(query, 10).toLocaleString('', { minimumFractionDigits: 3 });
