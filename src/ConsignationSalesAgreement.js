const HandleBars = require('handlebars');
const root = require('app-root-path');
const readFile = require(`${root}/read-file`);

module.exports = querystring => {
  return {
    to: async (mediaType) => {
      if (mediaType !== 'text/html') {
        throw new Error(`Invalid media type ${mediaType}`);
      }
      return HandleBars.compile(
        await readFile(`${root}/src/ConsignationSalesAgreement.html`, { encoding: 'UTF-8' })
      )({
        querystring,
        manufacturerSignatureBase64: await readFile(`${root}/src/signature.base64`, { encoding: 'UTF-8' })
      });
    }
  };
};
