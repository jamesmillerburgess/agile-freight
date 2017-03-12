import './new-quote.html';
import './new-quote.less';

import { ReactiveVar } from 'meteor/reactive-var';

let multiRoutes = new ReactiveVar([
  { from: '', to: '' },
  { from: '', to: '' },
  { from: '', to: '' },
]);

let matrixFroms = new ReactiveVar([
  '',
  '',
  '',
]);

let matrixTos = new ReactiveVar([
  '',
  '',
  '',
]);

Template.NewQuote.onRendered(function onRendered() {
});

Template.NewQuote.helpers({
  multiRoutes: function () {
    return multiRoutes.get();
  },
  matrixFroms: function () {
    return matrixFroms.get();
  },
  matrixTos: function () {
    return matrixTos.get();
  },
});

Template.NewQuote.events({
  'click #air' () {
    $('#air').addClass('active');
    $('#ocean').removeClass('active');
    $('#road').removeClass('active');
  },
  'click #ocean' () {
    $('#air').removeClass('active');
    $('#ocean').addClass('active');
    $('#road').removeClass('active');
  },
  'click #road' () {
    $('#air').removeClass('active');
    $('#ocean').removeClass('active');
    $('#road').addClass('active');
  },
  'click #single' () {
    $('#singleInput').show();
    $('#multiInput').hide();
    $('#matrixInput').hide();

    $('#single').addClass('active');
    $('#multi').removeClass('active');
    $('#matrix').removeClass('active');
  },
  'click #multi' () {
    $('#singleInput').hide();
    $('#multiInput').show();
    $('#matrixInput').hide();

    $('#single').removeClass('active');
    $('#multi').addClass('active');
    $('#matrix').removeClass('active');

  },
  'click #matrix' () {
    $('#singleInput').hide();
    $('#multiInput').hide();
    $('#matrixInput').show();
    $('#single').removeClass('active');
    $('#multi').removeClass('active');
    $('#matrix').addClass('active');
  },
  'click #add-multi-route' () {
    let temp = multiRoutes.get();
    temp.push({from: '', to: ''});
    multiRoutes.set(temp);
  },
  'click #add-matrix-from' () {
    let temp = matrixFroms.get();
    temp.push('');
    matrixFroms.set(temp);
  },
  'click #add-matrix-to' () {
    let temp = matrixTos.get();
    temp.push('');
    matrixTos.set(temp);
  },
});