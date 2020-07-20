const express = require('express');
const bodyParser = require('body-parser');
const root = require('app-root-path');

const ConsignationSalesAgreement = require('./src/ConsignationSalesAgreement');
const ConsignationSalesForm = require('./src/ConsignationSalesForm');
const SelectCompanyForm = require('./SelectCompanyForm');

const readFile = require(`${root}/read-file`);

const app = express();

app.get('/', async (req, res) => {
  const page = SelectCompanyForm();
  res.send(await page.to('text/html'));
});

app.post('/', bodyParser.urlencoded({ extended: true }), (req, res) => {
  res.redirect(`/${req.body.companyName}`);
});

app.get('/:company', async (req, res) => {
  res.redirect(`/${req.params.company}/consignation`);
});

app.get('/:company/consignation', async (req, res) => {
  let page = ConsignationSalesForm(req.query);

  const AVAILABLE_PRODUCTS = [{
    text: 'Daline Nails Repair & Growth',
    productId: '1x',
    selected: req.query.productName === 'Daline Nails Repair & Growth'
  }, {
    text: 'Daline Nails Repair & Growth - Buy 4 Get 5',
    productId: '5x',
    selected: req.query.productName === 'Daline Nails Repair & Growth - Buy 4 Get 5'
  }];

  if (Object.keys(req.query).length === 0) {
    page = ConsignationSalesForm({
      querystring: req.query,
      availableProducts: AVAILABLE_PRODUCTS
    });
    res.send(await page.to('text/html'));
    return;
  }

  if (req.query.edit === 'y') {
    page = ConsignationSalesForm({
      querystring: req.query,
      availableProducts: AVAILABLE_PRODUCTS
    });
    res.send(await page.to('text/html'));
    return;
  }

  page = ConsignationSalesAgreement({
    querystring: req.query,
    manufacturerSignatureBase64: await readFile(`${root}/src/signature.base64`, { encoding: 'UTF-8' }),
  });
  res.send(await page.to('text/html'));
  return;
});

app.listen(8080, () => {
  process.stdout.write(`Listening on http://localhost:8080\n`);
});
