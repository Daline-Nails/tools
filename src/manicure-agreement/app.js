const express = require('express');
const root = require('app-root-path');

const WorkAgreementForm = require(`${root}/src/manicure-agreement/WorkAgreementForm`);
const WorkAgreementPage = require(`${root}/src/manicure-agreement/WorkAgreementPage`);

const readFile = require(`${root}/read-file`);

module.exports = () => {
  const app = express();

  app.get('/:company/work-agreement', async (req, res) => {
    let page = WorkAgreementForm(req.query);

    if (Object.keys(req.query).length === 0) {
      page = WorkAgreementForm({ querystring: req.query });
      res.send(await page.to('text/html'));
      return;
    }

    if (req.query.edit === 'y') {
      page = WorkAgreementForm({ querystring: req.query });
      res.send(await page.to('text/html'));
      return;
    }

    page = WorkAgreementPage({
      querystring: req.query,
      manufacturerSignatureBase64: await readFile(`${root}/src/signature.base64`, { encoding: 'UTF-8' }),
      signatureInstructionsBase64: await readFile(`${root}/src/signature-instructions.base64`, { encoding: 'UTF-8' })
    });
    res.send(await page.to('text/html'));
  });

  return app;
};
