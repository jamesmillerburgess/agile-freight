import moment from 'moment';

export const getDeepVal = (obj, path) => {
  let val = obj;
  let splitPath = path;
  if (typeof path === 'string') {
    splitPath = path.split('.');
  }
  splitPath
    .forEach((key) => {
      val = val[key];
    });
  return val;
};

exports.groupByDate = (data = [], valuePath = 'value', datePath = 'date', timePeriod = 'day') => {
  const splitValuePath = valuePath.split('.');
  const splitDatePath = datePath.split('.');
  return data.reduce((acc, val) => {
    const value = getDeepVal(val, splitValuePath);
    const date = moment(getDeepVal(val, splitDatePath))
      .format('DD-MMM-YYYY');
    return {
      ...acc,
      [date]: (acc[date] || 0) + value,
    };
  }, {});
};

exports.uniqueValues = (data = [], path) => {
  if (!path) {
    return {};
  }
  const splitPath = path.split('.');
  return data.reduce((acc, val) => {
    const key = getDeepVal(val, splitPath);
    const res = [...acc];
    if (acc.indexOf(key) === -1) {
      res.push(key);
    }
    return res;
  }, []);
};

exports.countByValue = (data = [], path) => {
  if (!path) {
    return {};
  }
  const splitPath = path.split('.');
  return data.reduce((acc, val) => {
    const key = getDeepVal(val, splitPath);
    return {
      ...acc,
      [key]: (acc[key] || 0) + 1,
    };
  }, {});
};

exports.ltmStart = (date = undefined) =>
  moment(date)
    .subtract(1, 'years')
    .subtract(moment().date(), 'days');

exports.ytdStart = date =>
  moment(date)
    .subtract(moment().month(), 'months')
    .subtract(moment().date(), 'days');

exports.allTimeStart = () =>
  moment(0);

exports.timeSeriesBarOptions = {
  scales: {
    yAxes: [
      {
        ticks: {
          callback: label => (+label).toLocaleString(),
        },
      },
    ],
  },
  maintainAspectRatio: false,
  legend: { display: false },
};
