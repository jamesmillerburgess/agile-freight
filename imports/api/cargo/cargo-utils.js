exports.updateCargo = (cargo) => {
  const { descriptionOfGoods, packageLines } = cargo;
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
