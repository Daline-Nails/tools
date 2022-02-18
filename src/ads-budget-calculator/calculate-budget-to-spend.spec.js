const { expect } = require('chai');

const calculateBudgetToSpend = require('./calculate-budget-to-spend');
const convertedBRLToAUD = require('./convert-brl-to-aud');
const AUD = require('./AUD');

describe('Calculate Budget To Spend', () => {
  it('returns 60% of the total FB Ad return + Ad Management Cost + Design Cost', async () => {
    const params = { totalAdsReturn: 10000 };
    const totalBudgetToSpend = calculateBudgetToSpend({
      totalAdReturn: AUD(params.totalAdsReturn),
      adsManagementCostInAUD: await convertedBRLToAUD(1600),
      adsDesignCost: await convertedBRLToAUD(1000)
    });
    expect(totalBudgetToSpend).to.eql('A$5,578.80');
  });
});
