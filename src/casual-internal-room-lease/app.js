const express = require('express');
const root = require('app-root-path');

const CasualInternalRoomLeaseForm = require(`${root}/src/casual-internal-room-lease/CasualInternalRoomLeaseForm`);
const CasualInternalRoomLeaseAgreement = require(`${root}/src/casual-internal-room-lease/CasualInternalRoomLeaseAgreement`);

const readFile = require(`${root}/read-file`);

module.exports = () => {
  const app = express();

  app.get('/:company/casual-internal-room-lease', async (req, res) => {
    let page = CasualInternalRoomLeaseForm(req.query);

    if (Object.keys(req.query).length === 0) {
      page = CasualInternalRoomLeaseForm({ querystring: req.query });
      res.send(await page.to('text/html'));
      return;
    }

    if (req.query.edit === 'y') {
      page = CasualInternalRoomLeaseForm({ querystring: req.query });
      res.send(await page.to('text/html'));
      return;
    }

    page = CasualInternalRoomLeaseAgreement({
      querystring: req.query,
      manufacturerSignatureBase64: await readFile(`${root}/src/signature.base64`, { encoding: 'UTF-8' }),
      signatureInstructionsBase64: await readFile(`${root}/src/signature-instructions.base64`, { encoding: 'UTF-8' })
    });
    res.send(await page.to('text/html'));
  });

  return app;
};
