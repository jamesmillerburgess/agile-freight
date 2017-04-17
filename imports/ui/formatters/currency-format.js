export function currencyFormat(query = 0) {
  return parseInt(query, 10).toLocaleString();
}
