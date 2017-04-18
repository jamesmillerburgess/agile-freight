import SimpleSchema from 'simpl-schema';

exports.rateSchema = new SimpleSchema({
  amount: { type: Number, optional: true },
  currency: { type: String, optional: true },
  unit: { type: String, optional: true },
}, {
  clean: {
    removeEmptyStrings: false,
  },
});

exports.chargeLineSchema = new SimpleSchema({
  description: { type: String, optional: true },
  rate: { type: exports.rateSchema, optional: true },
  units: { type: Number, optional: true },
  amount: { type: Number, optional: true },
  currency: { type: String, optional: true },
}, {
  clean: {
    removeEmptyStrings: false,
  },
});

exports.chargesSchema = new SimpleSchema({
  chargeLines: Array,
  'chargeLines.$': exports.chargeLineSchema,
  totalAmount: { type: Number, optional: true },
  totalCurrency: { type: String, optional: true },
}, {
  clean: {
    removeEmptyStrings: false,
  },
});

exports.updateCharges = (charges) => {
  const chargeLines = charges.chargeLines.map(val => (
    {
      description: val.description || '',
      rate: {
        amount: val.rate ? val.rate.amount || 0 : 0,
        currency: val.rate ? val.rate.currency || '' : '',
        unit: val.rate ? val.rate.unit || '' : '',
      },
      units: val.units || '',
      amount: (val.rate ? val.rate.amount || 0 : 0) * (val.units || 0),
      currency: val.rate ? val.rate.currency || '' : '',
    }),
  );
  const totalAmount = chargeLines.reduce((acc, val) => acc + val.amount, 0);
  const totalCurrency = chargeLines.reduce((acc, val) => {
    if (val.currency !== '' && val.currency) {
      if (acc === '' || acc === val.currency) {
        return val.currency;
      }
      return 'N/A';
    }
    return acc;
  }, '');

  return {
    chargeLines,
    totalAmount,
    totalCurrency,
  };
};
