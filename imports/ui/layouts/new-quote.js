import { ReactiveVar } from 'meteor/reactive-var';
import { Template } from 'meteor/templating';

import { Rates } from '../../api/rates/rates.js';

import './new-quote.html';
import './new-quote.less';

const searchQuery = new ReactiveVar('');
const product = new ReactiveVar('');
const quoteType = new ReactiveVar('');
const multiRoutes = new ReactiveVar([
  { from: '', to: '' },
  { from: '', to: '' },
  { from: '', to: '' },
]);
const matrixFroms = new ReactiveVar(['', '', '']);
const matrixTos = new ReactiveVar(['', '', '']);

Template.NewQuote.helpers({
  multiRoutes: () => multiRoutes.get(),
  matrixFroms: () => matrixFroms.get(),
  matrixTos: () => matrixTos.get(),
  rates: () => {
    // return Rates.find({ originPort: 'NOSVG', destinationPort: 'MGTOA' });
    return Rates.find(searchQuery.get());
  },
});

Template.NewQuote.events({
  'click #air' () {
    product.set('air');

    $('#air').addClass('active');
    $('#ocean').removeClass('active');
    $('#road').removeClass('active');
  },
  'click #ocean' () {
    product.set('ocean');

    $('#air').removeClass('active');
    $('#ocean').addClass('active');
    $('#road').removeClass('active');
  },
  'click #road' () {
    product.set('road');

    $('#air').removeClass('active');
    $('#ocean').removeClass('active');
    $('#road').addClass('active');
  },
  'click #single' () {
    quoteType.set('single');

    $('#single-input').show();
    $('#multi-input').hide();
    $('#matrix-input').hide();

    $('#single').addClass('active');
    $('#multi').removeClass('active');
    $('#matrix').removeClass('active');
  },
  'click #multi' () {
    quoteType.set('multi');

    $('#single-input').hide();
    $('#multi-input').show();
    $('#matrix-input').hide();

    $('#single').removeClass('active');
    $('#multi').addClass('active');
    $('#matrix').removeClass('active');

  },
  'click #matrix' () {
    quoteType.set('matrix');

    $('#single-input').hide();
    $('#multi-input').hide();
    $('#matrix-input').show();

    $('#single').removeClass('active');
    $('#multi').removeClass('active');
    $('#matrix').addClass('active');
  },
  'click #add-multi-route' () {
    const temp = multiRoutes.get();
    temp.push({ from: '', to: '' });
    multiRoutes.set(temp);
  },
  'click #add-matrix-from' () {
    const temp = matrixFroms.get();
    temp.push('');
    matrixFroms.set(temp);
  },
  'click #add-matrix-to' () {
    const temp = matrixTos.get();
    temp.push('');
    matrixTos.set(temp);
  },
  'click #get-rates' () {
    if (quoteType.get() === 'single') {
      const originPort = $('#single-from').find('input')[0].value;
      const destinationPort = $('#single-to').find('input')[0].value;
      searchQuery.set({ originPort, destinationPort });

    } else if (quoteType.get() === 'multi') {
      const rows = $('#multi-input .row');
      const routes = [];
      console.log(rows);
      for (let i = 0; i < rows.length; i += 1) {
        console.log(i);
        routes.push({
          originPort: $(rows[i]).find('input')[0].value,
          destinationPort: $(rows[i]).find('input')[1].value,
        });
      }
      console.log(routes);
      searchQuery.set({ $or: routes });


    } else if (quoteType.get() === 'matrix') {
    }

  },
});