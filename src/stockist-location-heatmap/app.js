const express = require('express');
const fs = require('fs');
const root = require('app-root-path');

const htmlContents = fs.readFileSync(`${root}/src/stockist-location-heatmap/index.html`, { encoding: 'UTF-8' });

module.exports = () => {
  const app = express();

  // app.use('/stockist-location-heatmap', express.static('./public'));
  app.get('/charts/stockist-location-heatmap', (req, res) => {
    res.send(htmlContents);
  });

  return app;
};
