import { Template } from 'meteor/templating';

Template.registerHelper('currencyFormat', query => parseInt(query, 10).toLocaleString());
