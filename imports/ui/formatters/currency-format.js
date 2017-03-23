import { Template } from 'meteor/templating';

Template.registerHelper('currencyFormat', (query, minimumFractionDigits = 0) =>
  parseInt(+query, 10).toLocaleString('en', {
    style: 'decimal',
    minimumFractionDigits,
  }),
);
