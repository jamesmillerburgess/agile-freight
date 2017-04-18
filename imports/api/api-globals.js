export const APIGlobals = {
  incotermOptions: ['CFR', 'CIF', 'CIP', 'CPT', 'DAF', 'DAP', 'DAT', 'DDP', 'DDU', 'EXW', 'FAS', 'FCA', 'FOB', ''],
  mblTypeOptions: ['Waybill', 'Original', ''],
  mblTermsOptions: ['Prepaid', 'Collect', ''],
  seaquestTypeOptions: ['Original', 'Express', ''],
  originHaulageByOptions: ['Agility', 'Customer', ''],
  originCustomsByOptions: ['Agility', 'Customer', ''],
  destinationHaulageByOptions: ['Agility', 'Customer', ''],
  destinationCustomsByOptions: ['Agility', 'Customer', ''],
  volumetricRatioOptions: ['1:1', '1:2', '1:3', '1:4', '1:5', '1:6'],
  measurementSystemOptions: ['Metric', 'Imperial'],
  directionOptions: ['Export', 'Import'],
  modeOptions: ['Ocean', 'Air', 'Road'],
  airServiceOptions: ['Premier', 'Expedited', 'Express'],
  oceanServiceOptions: ['FCL', 'LCL', 'Breakbulk'],

  // Cargo
  packageTypeOptions: ['Packages', 'Boxes', 'Cartons', 'Bags', 'Bales', 'Bolts', 'Bottles', ''],

  // Quotes
  quoteStatusOptions: ['Issued', 'Expired', 'Draft', 'Canceled'],
  quoteTypeOptions: ['Single Route', 'Multi Route'],
  quoteRateTypeOptions: ['Rated', 'Itemized'],

  // Shipments
  shipmentStatusOptions: ['Received', 'Booked', 'Departed', 'Arrived', 'Released', 'Delivered', 'Closed', 'Canceled'],

  // Invoices
  invoiceStatusOptions: ['Issued', 'Draft', 'Canceled'],

  // TEMP!!!!
  cityOptions: ['Shanghai', 'Basel', 'Seoul', ''],
  indiaPortOptions: ['INNSA', 'INMAA', 'INBOM'],
  ukPortOptions: ['GBFXT', 'GBSOU', 'GBLGW'],
};
