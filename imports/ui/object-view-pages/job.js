import { Template } from 'meteor/templating';

import { Customers } from '../../api/customers/customers';
import { Jobs } from '../../api/jobs/jobs';

import { APIGlobals } from '../../api/api-globals';

import './job.html';
import './job.less';

Template.job.onCreated(function onCreated() {
  this.data.APIGlobals = APIGlobals;
});

Template.job.onRendered(() => $(() => $('[data-toggle="tooltip"]').tooltip()));

Template.job.helpers({
  job() {
    Jobs.findOne(this.job._id);
  },
  shipper() {
    return {
      type: 'reference',
      field: {
        label: 'Shipper',
        collection: Customers,
        id: this.job.shipper,
        display: 'name',
      },
      update: {
        method: 'jobs.updateField',
        id: this.job._id,
        path: 'shipper',
      },
    };
  },
  consignee() {
    return {
      type: 'reference',
      field: {
        label: 'Consignee',
        collection: Customers,
        id: this.job.consignee,
        display: 'name',
      },
      update: {
        method: 'jobs.updateField',
        id: this.job._id,
        path: 'consignee',
      },
    };
  },
  incoterm() {
    return {
      type: 'select',
      field: {
        label: 'Incoterm',
        options: APIGlobals.incotermOptions,
        value: this.job.incoterm,
      },
      update: {
        method: 'jobs.updateField',
        id: this.job._id,
        path: 'incoterm',
      },
    };
  },
});

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
