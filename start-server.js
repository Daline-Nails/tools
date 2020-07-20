const express = require('express');
const ConsignationSalesAgreement = require('./src/ConsignationSalesAgreement');

const app = express();

app.get('/:company', async (req, res) => {
  res.redirect(`/${req.params.company}/consignation`);
});

app.get('/:company/consignation', async (req, res) => {
  const page = ConsignationSalesAgreement(req.query);
  res.send(await page.to('text/html'));
});

app.listen(8080, () => {
  process.stdout.write(`Listening on http://localhost:8080\n`);
});
