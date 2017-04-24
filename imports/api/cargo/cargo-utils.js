import SimpleSchema from 'simpl-schema';

exports.packageLineSchema = new SimpleSchema({
  num: { type: Number, optional: true },
  type: { type: String, optional: true },
  grossWeight: { type: Number, optional: true },
  volume: { type: Number, optional: true },
});

exports.cargoSchema = new SimpleSchema({
  descriptionOfGoods: { type: String, optional: true },
  packageLines: Array,
  'packageLines.$': exports.packageLineSchema,
  totalPackages: { type: Number, optional: true },
  totalPackageType: { type: String, optional: true },
  totalGrossWeight: { type: Number, optional: true },
  totalVolume: { type: Number, optional: true },
});

exports.updateCargo = ({
  descriptionOfGoods = '',
  packageLines = [],
}) => {
  return {
    descriptionOfGoods,
    packageLines,
    totalPackages: packageLines.reduce((acc, val) => acc + (val.num || 0), 0),
    totalPackageType: packageLines.reduce((acc, val) => {
      if (val.type !== '' && val.type) {
        if (acc === '' || acc === val.type) {
          return val.type;
        }
        return 'Mixed Types';
      }
      return acc;
    }, ''),
    totalGrossWeight: packageLines.reduce((acc, val) => acc + (val.grossWeight || 0), 0),
    totalVolume: packageLines.reduce((acc, val) => acc + (val.volume || 0), 0),
  };
};
