const express = require('express');
const root = require('app-root-path');

const ManicureAgreementForm = require(`${root}/src/manicure-agreement/ManicureAgreementForm`);
const ManicureAgreement = require(`${root}/src/manicure-agreement/ManicureAgreement`);

const readFile = require(`${root}/read-file`);

module.exports = () => {
  const app = express();

  app.get('/:company/manicure-agreement', async (req, res) => {
    let page = ManicureAgreementForm(req.query);

    if (Object.keys(req.query).length === 0) {
      page = ManicureAgreementForm({ querystring: req.query });
      res.send(await page.to('text/html'));
      return;
    }

    if (req.query.edit === 'y') {
      page = ManicureAgreementForm({ querystring: req.query });
      res.send(await page.to('text/html'));
      return;
    }

    page = ManicureAgreement({
      querystring: req.query,
      manufacturerSignatureBase64: await readFile(`${root}/src/signature.base64`, { encoding: 'UTF-8' }),
      signatureInstructionsBase64: await readFile(`${root}/src/signature-instructions.base64`, { encoding: 'UTF-8' })
    });
    res.send(await page.to('text/html'));
  });

  return app;
};
