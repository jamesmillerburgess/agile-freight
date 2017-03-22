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
  rates: () => Rates.find(searchQuery.get()),
  // return Rates.find({ originPort: 'NOSVG', destinationPort: 'MGTOA' });
});

Template.NewQuote.events({
  'click #air': function clickAirHandler() {
    product.set('air');

    $('#air').addClass('active');
    $('#ocean').removeClass('active');
    $('#road').removeClass('active');
  },
  'click #ocean': function clickOceanHandler() {
    product.set('ocean');

    $('#air').removeClass('active');
    $('#ocean').addClass('active');
    $('#road').removeClass('active');
  },
  'click #road': function clickRoadHandler() {
    product.set('road');

    $('#air').removeClass('active');
    $('#ocean').removeClass('active');
    $('#road').addClass('active');
  },
  'click #single': function clickSingleHandler() {
    quoteType.set('single');

    $('#single-input').show();
    $('#multi-input').hide();
    $('#matrix-input').hide();

    $('#single').addClass('active');
    $('#multi').removeClass('active');
    $('#matrix').removeClass('active');
  },
  'click #multi': function clickMultiHandler() {
    quoteType.set('multi');

    $('#single-input').hide();
    $('#multi-input').show();
    $('#matrix-input').hide();

    $('#single').removeClass('active');
    $('#multi').addClass('active');
    $('#matrix').removeClass('active');
  },
  'click #matrix': function clickMatrixHandler() {
    quoteType.set('matrix');

    $('#single-input').hide();
    $('#multi-input').hide();
    $('#matrix-input').show();

    $('#single').removeClass('active');
    $('#multi').removeClass('active');
    $('#matrix').addClass('active');
  },
  'click #add-multi-route': function clickAddMultiRouteHandler() {
    const temp = multiRoutes.get();
    temp.push({ from: '', to: '' });
    multiRoutes.set(temp);
  },
  'click #add-matrix-from': function clickAddMatrixFromHandler() {
    const temp = matrixFroms.get();
    temp.push('');
    matrixFroms.set(temp);
  },
  'click #add-matrix-to': function clickGetAddMatrixToHandler() {
    const temp = matrixTos.get();
    temp.push('');
    matrixTos.set(temp);
  },
  'click #get-rates': function clickGetRatesHandler() {
    if (quoteType.get() === 'single') {
      const originPort = $('#single-from').find('input')[0].value;
      const destinationPort = $('#single-to').find('input')[0].value;
      searchQuery.set({ originPort, destinationPort });
    } else if (quoteType.get() === 'multi') {
      const rows = $('#multi-input .row');
      const routes = [];
      for (let i = 0; i < rows.length; i += 1) {
        routes.push({
          originPort: $(rows[i]).find('input')[0].value,
          destinationPort: $(rows[i]).find('input')[1].value,
        });
      }
      searchQuery.set({ $or: routes });
    } // else if (quoteType.get() === 'matrix') {}
  },
});
