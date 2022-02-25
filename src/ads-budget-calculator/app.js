const express = require('express');
const bodyParser = require('body-parser');

const InputBudgetPage = require('./InputBudgetPage');

const BudgetToSpendComponent = require('./BudgetToSpendComponent');
const BudgetResultPage = require('./BudgetResultsPage');

const calculateBudgetToSpend = require('./calculate-budget-to-spend');
const convertedBRLToAUD = require('./convert-brl-to-aud');
const AUD = require('./AUD');

module.exports = () => {
  const app = express();

  app.get('/budget/facebook', async (req, res) => {
    res.send(InputBudgetPage().to('text/html'));
  });
  app.post('/budget/facebook', bodyParser.urlencoded({ extended: true }), async (req, res) => {
    const budgetToSpend = BudgetToSpendComponent(calculateBudgetToSpend({
      previousBudget: AUD(+req.body.previousBudget),
      totalAdReturn: AUD(+req.body.totalSales),
      adsManagementCostInAUD: await convertedBRLToAUD(1600),
      adsDesignCost: await convertedBRLToAUD(1000)
    }));
    res.send(BudgetResultPage({ budgetToSpend }).to('text/html'));
  });

  return app;
};
