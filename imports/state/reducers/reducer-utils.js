import { set } from 'lodash/fp';

export const setPropAtIndex = (arr, prop, index, val) => [
  ...arr.slice(0, index),
  set(prop, val, arr[index]),
  ...arr.slice(index + 1),
];

export const setPropAtId = (arr, prop, id, val) => arr.map((item) => {
  const res = { ...item };
  if (item.id === id) {
    res[prop] = val;
  }
  return res;
});

export const removeAtIndex = (arr, index) => [
  ...arr.slice(0, index),
  ...arr.slice(index + 1),
];
