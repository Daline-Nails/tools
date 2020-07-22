const HandleBars = require('handlebars');
const root = require('app-root-path');
const readFile = require(`${root}/read-file`);

module.exports = viewModel => {
  return {
    to: async (mediaType) => {
      if (mediaType !== 'text/html') {
        throw new Error(`Invalid media type ${mediaType}`);
      }
      return HandleBars.compile(
        await readFile(`${root}/src/influencer/IndividualAdvertisingForm.html`, { encoding: 'UTF-8' })
      )(viewModel);
    }
  };
};
