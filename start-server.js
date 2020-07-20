const express = require('express');
const ConsignationSalesAgreement = require('./src/ConsignationSalesAgreement');
const ConsignationSalesForm = require('./src/ConsignationSalesForm');

const app = express();

app.get('/:company', async (req, res) => {
  res.redirect(`/${req.params.company}/consignation`);
});

app.get('/:company/consignation', async (req, res) => {
  let page = ConsignationSalesForm(req.query);

  if (Object.keys(req.query).length === 0) {
    page = ConsignationSalesForm(req.query);
    res.send(await page.to('text/html'));
    return;
  }

  if (req.query.edit === 'y') {
    page = ConsignationSalesForm(req.query);
    res.send(await page.to('text/html'));
    return;
  }

  page = ConsignationSalesAgreement(req.query);
  res.send(await page.to('text/html'));
  return;
});

app.listen(8080, () => {
  process.stdout.write(`Listening on http://localhost:8080\n`);
});
