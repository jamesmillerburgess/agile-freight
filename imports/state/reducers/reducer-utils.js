// TODO: changeDeepProp

export const changeProp = (obj, prop, val) => Object.assign({}, obj, { [prop]: val });

export const changePropAtIndex = (arr, prop, index, val) => [
  ...arr.slice(0, index),
  changeProp(arr[index], prop, val),
  ...arr.slice(index + 1),
];

export const changePropAtId = (arr, prop, id, val) => arr.map((item) => {
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
