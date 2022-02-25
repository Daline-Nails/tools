const { expect } = require('chai');

const calculateBudgetToSpend = require('./calculate-budget-to-spend');
const convertedBRLToAUD = require('./convert-brl-to-aud');
const AUD = require('./AUD');

const BudgetToSpendComponent = require('./BudgetToSpendComponent');

describe('Calculate Budget To Spend', () => {
  it('returns 60% of the total FB Ad return + Ad Management Cost + Design Cost', async () => {
    const budgetResult = calculateBudgetToSpend({
      previousBudget: AUD(5000),
      totalAdReturn: AUD(10000),
      adsManagementCostInAUD: await convertedBRLToAUD(1600),
      adsDesignCost: await convertedBRLToAUD(1000)
    });
    expect(budgetResult.budgetForMonth.toFormat()).to.eql('A$5,578.80');
    expect(budgetResult.commission.toFormat()).to.eql('A$500.00');
  });
  it('keeps a minimum of $1000/month ($32/day) if 60% budget would be less than $1000', async () => {
    const budgetResult = calculateBudgetToSpend({
      previousBudget: AUD(0),
      totalAdReturn: AUD(1599),
      adsManagementCostInAUD: await convertedBRLToAUD(1600),
      adsDesignCost: await convertedBRLToAUD(1000)
    });
    expect(budgetResult.budgetForMonth.toFormat()).to.eql('A$1,000.00');
    expect(budgetResult.commission.toFormat()).to.eql('A$0.00');
  });
  it('DOES NOT pay 5% commission on the current Ad return for 1.9x ROI from the previous budget', async () => {
    const budgetResult = calculateBudgetToSpend({
      previousBudget: AUD(3000),
      totalAdReturn: AUD(5999),
      adsManagementCostInAUD: await convertedBRLToAUD(1600),
      adsDesignCost: await convertedBRLToAUD(1000)
    });
    expect(budgetResult.commission.toFormat()).to.eql('A$0.00');
  });
  it('DOES pay 5% commission on the current Ad return for 2x ROI from the previous budget', async () => {
    const budgetResult = calculateBudgetToSpend({
      previousBudget: AUD(3000),
      totalAdReturn: AUD(6000),
      adsManagementCostInAUD: await convertedBRLToAUD(1600),
      adsDesignCost: await convertedBRLToAUD(1000)
    });
    expect(budgetResult.commission.toFormat()).to.eql('A$300.00');
  });

  it('shows a message to talk to Daline Nails if return of Ads is less tan $1000 in any given month', async () => {
    const budgetResult = calculateBudgetToSpend({
      previousBudget: AUD(0),
      totalAdReturn: AUD(999),
      adsManagementCostInAUD: await convertedBRLToAUD(1600),
      adsDesignCost: await convertedBRLToAUD(1000)
    });
    expect(BudgetToSpendComponent(budgetResult)).to.eql('ROI was too low, book a meeting to discuss');
  });
});
