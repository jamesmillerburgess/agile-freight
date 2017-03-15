import { Template } from 'meteor/templating';

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
  this.data.detention = '';
  this.data.demurrage = '';
  this.data.originHaulageBy = 'Customer';
  this.data.originHaulageByOptions = ['Agility', 'Customer', ''];
  this.data.originCustomsBy = 'Customer';
  this.data.originCustomsByOptions = ['Agility', 'Customer', ''];
  this.data.destinationHaulageBy = '';
  this.data.destinationHaulageByOptions = ['Agility', 'Customer', ''];
  this.data.destinationCustomsBy = '';
  this.data.destinationCustomsByOptions = ['Agility', 'Customer', ''];
});

Template.job.events({
  'click #shipping-instructions-task': function handleShippingInstructionsTaskClick() {
    const alert = $('#mbl-alerts').append(
      `<div class="alert alert-warning alert-dismissible fade show" role="alert" data-dismiss="alert">
      <strong>Booking</strong> must be completed before starting <strong>Master Bill of Lading</strong>!
      </div>`).children().last();
    setTimeout(() => alert.alert('close'), 5000);
  },
  'click #seaquest-draft-task': function handleSeaquestDraftTaskClick() {
    const alert = $('#seaquest-alerts').append(
      `<div class="alert alert-warning alert-dismissible fade show" role="alert" data-dismiss="alert">
      <strong>Booking</strong> must be completed before starting <strong>House Bill of Lading</strong>!
      </div>`).children().last();
    setTimeout(() => alert.alert('close'), 5000);
  },
});
