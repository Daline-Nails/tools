const HandleBars = require('handlebars');
const readFile = require('../../read-file');

module.exports = viewModel => {
  return {
    to: async (mediaType) => {
      if (mediaType !== 'text/html') {
        throw new Error(`Invalid media type ${mediaType}`);
      }
      return HandleBars.compile(
        await readFile(`${__dirname}/ConsignationSalesForm.html`, { encoding: 'UTF-8' })
      )(viewModel);
    }
  };
};
