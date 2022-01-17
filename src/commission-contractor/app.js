const express = require('express');
const root = require('app-root-path');

const CommissionContractorForm = require(`${root}/src/commission-contractor/CommissionContractorForm`);
const CommissionContractorAgreement = require(`${root}/src/commission-contractor/CommissionContractorAgreement`);

const readFile = require(`${root}/read-file`);

module.exports = () => {
  const app = express();

  app.get('/:company/commission-contractor', async (req, res) => {
    let page = CommissionContractorForm(req.query);

    if (Object.keys(req.query).length === 0) {
      page = CommissionContractorForm({ querystring: req.query });
      res.send(await page.to('text/html'));
      return;
    }

    if (req.query.edit === 'y') {
      page = CommissionContractorForm({ querystring: req.query });
      res.send(await page.to('text/html'));
      return;
    }

    page = CommissionContractorAgreement({
      querystring: req.query,
      manufacturerSignatureBase64: await readFile(`${root}/src/signature.base64`, { encoding: 'UTF-8' }),
      signatureInstructionsBase64: await readFile(`${root}/src/signature-instructions.base64`, { encoding: 'UTF-8' })
    });
    res.send(await page.to('text/html'));
  });

  return app;
};
