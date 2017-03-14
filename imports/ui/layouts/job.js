import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './job.html';
import './job.less';

Template.job.onCreated(function onRendered() {
  this.data.shipper = 'Alstom Power Boilers Limited';
  this.data.consignee = 'Presspart Manufacturing Ltd';
  this.data.incoterm = 'FOB';
  this.data.incotermOptions = ['CFR', 'CIF', 'CIP', 'CPT', 'DAF', 'DAP', 'DAT', 'DDP', 'DDU', 'EXW', 'FAS', 'FCA', 'FOB', ''];
  this.data.contract = 'MyContract';
  this.data.bookingReference = 'ABC1234';
  this.data.mblNumber = 'MAEU12345';
  this.data.mblType = 'Waybill';
  this.data.mblTypeOptions = ['Waybill', 'Original', ''];
  this.data.mblTerms = 'Prepaid';
  this.data.mblTermsOptions = ['Prepaid', 'Collect', ''];
  this.data.seaquestType = 'Original';
  this.data.seaquestTypeOptions = ['Original', 'Express', ''];
  this.data.numOriginals = 3;

  this.data.mblAlerts = new ReactiveVar([]);
});

Template.job.onRendered(function onRendered() {
});

Template.job.helpers({
  getMBLAlerts: function getMBLAlerts() {
    console.log(this.mblAlerts.get());
    this.mblAlerts.get();
  },
});

Template.job.events({
  'click #shipping-instructions-task' (event) {
    const alert = $('#mbl-alerts').append(
      `<div class="alert alert-warning alert-dismissible fade show" role="alert" data-dismiss="alert">
      <strong>Booking</strong> must be completed before starting <strong>Master Bill of Lading</strong>!
      </div>`).children().last();
    setTimeout(() => {
      alert.alert('close');
    }, 5000);
  },
  'click #seaquest-draft-task' (event) {
    const alert = $('#seaquest-alerts').append(
      `<div class="alert alert-warning alert-dismissible fade show" role="alert" data-dismiss="alert">
      <strong>Booking</strong> must be completed before starting <strong>House Bill of Lading</strong>!
      </div>`).children().last();
    setTimeout(() => {
      alert.alert('close');
    }, 5000);
  },
});
