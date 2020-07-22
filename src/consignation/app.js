const express = require('express');
const root = require('app-root-path');

const ConsignationSalesAgreement = require(`${root}/src/consignation/ConsignationSalesAgreement`);
const ConsignationSalesForm = require(`${root}/src/consignation/ConsignationSalesForm`);
const readFile = require(`${root}/read-file`);

module.exports = () => {
  const app = express();

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

  return app;
};
