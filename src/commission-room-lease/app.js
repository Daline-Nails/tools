const express = require('express');
const root = require('app-root-path');

const CommissionRoomLeaseForm = require(`${root}/src/commission-room-lease/CommissionRoomLeaseForm`);
const CommissionRoomLeaseAgreement = require(`${root}/src/commission-room-lease/CommissionRoomLeaseAgreement`);

const readFile = require(`${root}/read-file`);

module.exports = () => {
  const app = express();

  app.get('/:company/commission-room-lease', async (req, res) => {
    let page = CommissionRoomLeaseForm(req.query);

    if (Object.keys(req.query).length === 0) {
      page = CommissionRoomLeaseForm({ querystring: req.query });
      res.send(await page.to('text/html'));
      return;
    }

    if (req.query.edit === 'y') {
      page = CommissionRoomLeaseForm({ querystring: req.query });
      res.send(await page.to('text/html'));
      return;
    }

    page = CommissionRoomLeaseAgreement({
      querystring: req.query,
      manufacturerSignatureBase64: await readFile(`${root}/src/signature.base64`, { encoding: 'UTF-8' }),
      signatureInstructionsBase64: await readFile(`${root}/src/signature-instructions.base64`, { encoding: 'UTF-8' })
    });
    res.send(await page.to('text/html'));
  });

  return app;
};
