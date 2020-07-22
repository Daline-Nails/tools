const express = require('express');
const bodyParser = require('body-parser');
const root = require('app-root-path');

const SelectCompanyForm = require('./SelectCompanyForm');
const SelectContract = require(`${root}/src/SelectContract`);

const consignationApp = require(`${root}/src/consignation/app`);

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

app.use(consignationApp());

app.listen(8080, () => {
  process.stdout.write(`Listening on http://localhost:8080\n`);
});
