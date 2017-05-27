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
  airServiceOptions: ['Premier', 'Expedited', 'Express', ''],
  oceanServiceOptions: ['FCL', 'LCL', 'Breakbulk', ''],
  roadServiceOptions: ['FTL', 'LTL', ''],

  // Common
  currencyOptions: [
    { value: 'AED', label: 'AED' },
    { value: 'AFN', label: 'AFN' },
    { value: 'ALL', label: 'ALL' },
    { value: 'AMD', label: 'AMD' },
    { value: 'ANG', label: 'ANG' },
    { value: 'AOA', label: 'AOA' },
    { value: 'ARS', label: 'ARS' },
    { value: 'AUD', label: 'AUD' },
    { value: 'AZN', label: 'AZN' },
    { value: 'BAM', label: 'BAM' },
    { value: 'BBD', label: 'BBD' },
    { value: 'BDT', label: 'BDT' },
    { value: 'BGN', label: 'BGN' },
    { value: 'BHD', label: 'BHD' },
    { value: 'BIF', label: 'BIF' },
    { value: 'BMD', label: 'BMD' },
    { value: 'BND', label: 'BND' },
    { value: 'BOB', label: 'BOB' },
    { value: 'BRL', label: 'BRL' },
    { value: 'BSD', label: 'BSD' },
  ],
  chargeUOMOptions: ['kg', 'cbm', 'lb', 'cu ft', 'km', 'mile', 'container', ''],

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

  // UNLocations
  unLocationsMaxResults: 10,

  // TEMP!!!!
  cityOptions: ['Shanghai', 'Basel', 'Seoul', ''],
  airportOptions: ['Shanghai Hongquiao - SHA', 'Shanghai Pudong - PVG', 'Frankfurt - FRA', 'Basel Mulhouse - BSL'],
  portOptions: ['Rotterdam - NLROT', 'Hamburg - DEHAM', 'Singapore - SGSIN', ''],
  indiaPortOptions: ['INNSA', 'INMAA', 'INBOM'],
  ukPortOptions: ['GBFXT', 'GBSOU', 'GBLGW'],

  // Functions
  noop: () => null,
};
