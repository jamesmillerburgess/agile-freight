// TODO: changeDeepProp

export const itemAtId = (arr, id) => {
  let match = null;
  arr.forEach((item) => {
    if (item.id === id) {
      match = item;
    }
  });
  return match;
};

export const setProp = (obj, prop, val) => Object.assign(
  {},
  obj,
  { [prop]: val },
);

export const setPropAtIndex = (arr, prop, index, val) => [
  ...arr.slice(0, index),
  setProp(arr[index], prop, val),
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

export const removeAtId = (arr, id) => arr.filter(val => val.id !== id);

export const addToEnd = (arr, val) => [
  ...arr,
  val,
];
