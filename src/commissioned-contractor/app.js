const express = require('express');
const root = require('app-root-path');

const CommissionedContractorForm = require(`${root}/src/commissioned-contractor/CommissionedContractorForm`);
const CommissionedContractorAgreement = require(`${root}/src/commissioned-contractor/CommissionedContractorAgreement`);

const readFile = require(`${root}/read-file`);

module.exports = () => {
  const app = express();

  app.get('/:company/commissioned-contractor', async (req, res) => {
    let page = CommissionedContractorForm(req.query);

    if (Object.keys(req.query).length === 0) {
      page = CommissionedContractorForm({ querystring: req.query });
      res.send(await page.to('text/html'));
      return;
    }

    if (req.query.edit === 'y') {
      page = CommissionedContractorForm({ querystring: req.query });
      res.send(await page.to('text/html'));
      return;
    }

    page = CommissionedContractorAgreement({
      querystring: req.query,
      manufacturerSignatureBase64: await readFile(`${root}/src/signature.base64`, { encoding: 'UTF-8' }),
      signatureInstructionsBase64: await readFile(`${root}/src/signature-instructions.base64`, { encoding: 'UTF-8' })
    });
    res.send(await page.to('text/html'));
  });

  return app;
};
