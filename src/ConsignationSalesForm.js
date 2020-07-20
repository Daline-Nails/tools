const HandleBars = require('handlebars');
const root = require('app-root-path');
const readFile = require('./read-file');

module.exports = querystring => {
  return {
    to: async (mediaType) => {
      if (mediaType !== 'text/html') {
        throw new Error(`Invalid media type ${mediaType}`);
      }
      return HandleBars.compile(
        await readFile(`${root}/src/ConsignationSalesForm.html`, { encoding: 'UTF-8' })
      )(querystring);
    }
  };
};
