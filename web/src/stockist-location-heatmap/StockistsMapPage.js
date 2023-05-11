const fs = require('fs');
const HandleBars = require('handlebars');
const root = require('app-root-path');

const heatMapHTMLContent = fs.readFileSync(`${root}/src/stockist-location-heatmap/index.html`, { encoding: 'UTF-8' });

module.exports = viewModel => {
  return {
    to: mediaType => {
      if (mediaType === 'text/html') {
        return HandleBars.compile(heatMapHTMLContent)(viewModel);
      }
      return `Unsupported Media Type: ${mediaType}`;
    }
  };
};
