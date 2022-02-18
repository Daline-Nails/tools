module.exports = ({ totalAdReturn, adsManagementCostInAUD, adsDesignCost }) => {
  const totalCost = totalAdReturn
    .subtract(adsManagementCostInAUD)
    .subtract(adsDesignCost);
  return totalCost.percentage(60).toFormat();
};
