const Money = require('dinero.js');

const MINIMUM_BUDGET = Money({ amount: 1000 * 100, currency: 'AUD' });

module.exports = ({ previousBudget, totalAdReturn, adsManagementCostInAUD, adsDesignCost }) => {
  const totalCost = totalAdReturn
    .subtract(adsManagementCostInAUD)
    .subtract(adsDesignCost);

  let commission = previousBudget.multiply(2).greaterThan(totalAdReturn)
    ? Money({ amount: 0, currency: 'AUD' })
    : totalAdReturn.percentage(5);
  let budgetForNextMonth = totalCost.percentage(60);

  if (totalAdReturn.lessThanOrEqual(MINIMUM_BUDGET)) {
    budgetForNextMonth = Money({ amount: 0, currency: 'AUD' });
    commission = Money({ amount: 0, currency: 'AUD' });
  } else if (budgetForNextMonth.lessThanOrEqual(MINIMUM_BUDGET)) {
    budgetForNextMonth = Money({ amount: 1000 * 100, currency: 'AUD' });
    commission = Money({ amount: 0, currency: 'AUD' });
  }

  return {
    budgetForMonth: budgetForNextMonth,
    commission: commission
  }
};
