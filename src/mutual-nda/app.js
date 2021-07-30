const express = require('express');
const root = require('app-root-path');

const MutualNDAForm = require('./MutualNDAForm');
const MutualNDAAgreement = require('./MutualNDAAgreement');
const readFile = require(`${root}/read-file`);

module.exports = () => {
  const app = express();

  app.get('/:company/mutual-nda', async (req, res) => {
    let page = MutualNDAForm(req.query);

    if (Object.keys(req.query).length === 0) {
      page = MutualNDAForm({ querystring: req.query });
      res.send(await page.to('text/html'));
      return;
    }

    if (req.query.edit === 'y') {
      page = MutualNDAForm({ querystring: req.query });
      res.send(await page.to('text/html'));
      return;
    }

    page = MutualNDAAgreement({
      querystring: req.query,
      manufacturerSignatureBase64: await readFile(`${root}/src/signature.base64`, { encoding: 'UTF-8' }),
      signatureInstructionsBase64: await readFile(`${root}/src/signature-instructions.base64`, { encoding: 'UTF-8' })
    });
    res.send(await page.to('text/html'));
  });

  return app;
};
