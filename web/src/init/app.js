const bodyParser = require('body-parser');
const express = require('express');

const SelectCompanyForm = require('./SelectCompanyForm');
const SelectContract = require('./SelectContract');

module.exports = () => {
  const app = express();

  app.get('/', async (req, res) => {
    const page = SelectCompanyForm();
    res.send(await page.to('text/html'));
  });

  app.post('/', bodyParser.urlencoded({ extended: true }), (req, res) => {
    res.redirect(`/${req.body.companyName}`);
  });

  app.get('/:company', async (req, res) => {
    const page = SelectContract();
    res.send(await page.to('text/html'));
  });

  app.post('/:company', bodyParser.urlencoded({ extended: true }), async (req, res) => {
    res.redirect(`${req.params.company}/${req.body.contractName}`)
  });

  return app;
};
