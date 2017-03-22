import { Template } from 'meteor/templating';

import './job.html';
import './job.less';

Template.job.onCreated(function onCreated() {
  this.data.incotermOptions = ['CFR', 'CIF', 'CIP', 'CPT', 'DAF', 'DAP', 'DAT', 'DDP', 'DDU', 'EXW', 'FAS', 'FCA', 'FOB', ''];
  this.data.mblTypeOptions = ['Waybill', 'Original', ''];
  this.data.mblTermsOptions = ['Prepaid', 'Collect', ''];
  this.data.seaquestTypeOptions = ['Original', 'Express', ''];
  this.data.originHaulageByOptions = ['Agility', 'Customer', ''];
  this.data.originCustomsByOptions = ['Agility', 'Customer', ''];
  this.data.destinationHaulageByOptions = ['Agility', 'Customer', ''];
  this.data.destinationCustomsByOptions = ['Agility', 'Customer', ''];
});

Template.job.onRendered(() => $(() => $('[data-toggle="tooltip"]').tooltip()));

Template.job.events({
  'click .shipping-instructions-task': function handleShippingInstructionsTaskClick() {
    const alert = $('#mbl-alerts').append(
      `<div class="alert alert-warning alert-dismissible fade show" role="alert" data-dismiss="alert">
      <strong>Booking</strong> must be completed before starting <strong>Master Bill of Lading</strong>!
      </div>`).children().last();
    setTimeout(() => alert.alert('close'), 5000);
  },
  'click .seaquest-draft-task': function handleSeaquestDraftTaskClick() {
    const alert = $('#seaquest-alerts').append(
      `<div class="alert alert-warning alert-dismissible fade show" role="alert" data-dismiss="alert">
      <strong>Booking</strong> must be completed before starting <strong>House Bill of Lading</strong>!
      </div>`).children().last();
    setTimeout(() => alert.alert('close'), 5000);
  },
});
