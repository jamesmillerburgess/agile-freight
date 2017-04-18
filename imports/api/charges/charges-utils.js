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

exports.updateCharges = ({
  chargeLines = [],
}) => {
  const updatedChargeLines = chargeLines.map(val => (
    {
      description: val.description || '',
      rate: {
        amount: val.rate ? val.rate.amount || 0 : 0,
        currency: val.rate ? val.rate.currency || '' : '',
        unit: val.rate ? val.rate.unit || '' : '',
      },
      units: val.units || 0,
      amount: (val.rate ? val.rate.amount || 0 : 0) * (val.units || 0),
      currency: val.rate ? val.rate.currency || '' : '',
    }),
  );
  const totalAmount = updatedChargeLines.reduce((acc, val) => acc + val.amount, 0);
  const totalCurrency = updatedChargeLines.reduce((acc, val) => {
    if (acc === '') {
      return val.currency;
    }
    if (acc === 'N/A') {
      return 'N/A';
    }
    if (acc === val.currency || val.currency === '') {
      return acc;
    }
    return 'N/A';
  }, '');

  return {
    chargeLines: updatedChargeLines,
    totalAmount,
    totalCurrency,
  };
};
