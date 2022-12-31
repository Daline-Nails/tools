const express = require('express');
const root = require('app-root-path');

const InternalRoomLeaseForm = require(`${root}/src/internal-room-lease/InternalRoomLeaseForm`);
const InternalRoomLeaseAgreement = require(`${root}/src/internal-room-lease/InternalRoomLeaseAgreement`);

const readFile = require(`${root}/read-file`);

module.exports = () => {
  const app = express();

  app.get('/:company/internal-room-lease', async (req, res) => {
    let page = InternalRoomLeaseForm(req.query);

    if (Object.keys(req.query).length === 0) {
      page = InternalRoomLeaseForm({ querystring: req.query });
      res.send(await page.to('text/html'));
      return;
    }

    if (req.query.edit === 'y') {
      page = InternalRoomLeaseForm({ querystring: req.query });
      res.send(await page.to('text/html'));
      return;
    }

    page = InternalRoomLeaseAgreement({
      querystring: req.query,
      manufacturerSignatureBase64: await readFile(`${root}/src/signature.base64`, { encoding: 'UTF-8' }),
      signatureInstructionsBase64: await readFile(`${root}/src/signature-instructions.base64`, { encoding: 'UTF-8' })
    });
    res.send(await page.to('text/html'));
  });

  return app;
};
