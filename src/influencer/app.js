const express = require('express');
const root = require('app-root-path');

const IndividualAdvertisingForm = require('./IndividualAdvertisingForm');
const IndividualAdvertisingAgreement = require('./IndividualAdvertisingAgreement');
const readFile = require(`${root}/read-file`);

module.exports = () => {
  const app = express();

  app.get('/:company/individual', async (req, res) => {
    let page = IndividualAdvertisingForm(req.query);

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
      page = IndividualAdvertisingForm({
        querystring: req.query,
        availableProducts: AVAILABLE_PRODUCTS
      });
      res.send(await page.to('text/html'));
      return;
    }

    if (req.query.edit === 'y') {
      page = IndividualAdvertisingForm({
        querystring: req.query,
        availableProducts: AVAILABLE_PRODUCTS
      });
      res.send(await page.to('text/html'));
      return;
    }

    page = IndividualAdvertisingAgreement({
      querystring: req.query,
      manufacturerSignatureBase64: await readFile(`${root}/src/signature.base64`, { encoding: 'UTF-8' }),
    });
    res.send(await page.to('text/html'));
    return;
  });

  return app;
};
