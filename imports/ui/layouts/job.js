import { Template } from 'meteor/templating';

import './job.html';
import './job.less';

Template.job.onCreated(function onRendered() {
  this.data.shipper = 'Alstom Power Boilers Limited';
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
});

Template.job.helpers({});
