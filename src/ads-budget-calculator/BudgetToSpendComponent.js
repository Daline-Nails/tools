module.exports = budgetResult => {
  if (budgetResult.budgetForMonth.isZero()) {
    return 'ROI was too low, book a meeting to discuss';
  }
  return `${budgetResult.budgetForMonth.toFormat()}<br>(commission: ${budgetResult.commission.toFormat()})`
};
