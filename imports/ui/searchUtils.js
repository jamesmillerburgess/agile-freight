export const buildSearchRegExp = (search = '') => {
  if (typeof search !== 'string') {
    throw new Error(`Expected string, but got ${search.typeof}`);
  }
  const parts = search.split(/ +/);
  let pattern = '^';

  parts.forEach((part) => { pattern += `(?=.*?${part})`; });
  return new RegExp(pattern, 'i');
};
