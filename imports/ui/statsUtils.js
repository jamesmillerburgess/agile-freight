import moment from 'moment';

exports.uniqueValues = (data = [], path) => {
  if (!path) {
    return {};
  }
  return data.reduce((acc, val) => {
    let key = val;
    path
      .split('.')
      .forEach((prevKey) => {
        key = key[prevKey];
      });
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
  return data.reduce((acc, val) => {
    let key = val;
    path
      .split('.')
      .forEach((prevKey) => {
        key = key[prevKey];
      });
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
