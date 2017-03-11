import './dropdown.html';

Template.Dropdown.onRendered(function onRendered() {

  let options = [];
  if (this.data.source === 'incoterm') {
    options = [
      '---',
      'CFR',
      'CIF',
      'CIP',
      'CPT',
      'DAF',
      'DAP',
      'DAT',
      'DDP',
      'DDU',
      'EXW',
      'FAS',
      'FCA',
      'FOB'
    ]
  } else if (this.data.source === 'seaquestType') {
    options = [
      'Original',
      'Express'
    ]
  } else if (this.data.source === 'mblType') {
    options = [
      'Waybill',
      'Original'
    ]
  } else if (this.data.source === 'mblTerms') {
    options = [
      'Prepaid',
      'Collect'
    ]
  }
});

Template.Dropdown.events({
  'click .field-dropdown a'(event) {
    event.target.parentNode.parentNode.childNodes[2].innerText = event.target.name;
  }
});