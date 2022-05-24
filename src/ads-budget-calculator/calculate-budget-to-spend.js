const Money = require('dinero.js');

const MINIMUM_BUDGET_LIMIT = Money({ amount: 3000 * 100, currency: 'AUD' });
const UNACCEPTABLE_THRESHOLD = Money({ amount: 2000 * 100, currency: 'AUD' });

module.exports = ({ previousBudget, totalAdReturn, adsManagementCostInAUD, adsDesignCost }) => {
  const totalCost = totalAdReturn
    .subtract(adsManagementCostInAUD)
    .subtract(adsDesignCost);

  let commission = previousBudget.multiply(2).greaterThan(totalAdReturn)
    ? Money({ amount: 0, currency: 'AUD' })
    : totalAdReturn.percentage(5);
  let budgetForNextMonth = totalCost.percentage(60);

  if (totalAdReturn.lessThanOrEqual(UNACCEPTABLE_THRESHOLD)) {
    budgetForNextMonth = Money({ amount: 0, currency: 'AUD' });
    commission = Money({ amount: 0, currency: 'AUD' });
  } else if (budgetForNextMonth.lessThanOrEqual(MINIMUM_BUDGET_LIMIT)) {
    budgetForNextMonth = MINIMUM_BUDGET_LIMIT;
    commission = Money({ amount: 0, currency: 'AUD' });
  }

  return {
    budgetForMonth: budgetForNextMonth,
    commission: commission
  }
};
