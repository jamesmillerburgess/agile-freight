export const changeProp = (obj, prop, val) => Object.assign({}, obj, { [prop]: val });

export const changePropAtIndex = (arr, prop, index, val) => [
  ...arr.slice(0, index),
  changeProp(arr[index], prop, val),
  ...arr.slice(index + 1),
];

export const removeAtIndex = (arr, index) => [
  ...arr.slice(0, index),
  ...arr.slice(index + 1),
];

export const addToEnd = (arr, val) => [
  ...arr,
  val,
];
