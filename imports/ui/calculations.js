import moment from 'moment';

exports.ltmStart = (date = undefined) =>
  moment(date)
    .subtract(1, 'years')
    .subtract(moment().date(), 'days');

exports.ytdStart = (date) =>
  moment(date)
    .subtract(moment().month(), 'months')
    .subtract(moment().date(), 'days');

exports.allTimeStart = () =>
  moment(0);

