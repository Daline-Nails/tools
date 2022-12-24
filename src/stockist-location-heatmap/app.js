const express = require('express');
const fs = require('fs');
const root = require('app-root-path');

const heatMapHTMLContent = fs.readFileSync(`${root}/src/stockist-location-heatmap/index.html`, { encoding: 'UTF-8' });
const testInjectHTMLContent = fs.readFileSync(`${root}/src/stockist-location-heatmap/test-inject.html`, { encoding: 'UTF-8' });
const injectJsContent = fs.readFileSync(`${root}/src/stockist-location-heatmap/inject.js`, { encoding: 'UTF-8' });

module.exports = () => {
  const app = express();

  app.get('/charts/stockist-location-heatmap', (req, res) => {
    res.send(heatMapHTMLContent);
  });

  app.get('/charts/stockist-location-heatmap/inject.js', (req, res) => {
    res
      .header('Content-Type', 'application/javascript')
      .send(injectJsContent);
  });

  app.get('/charts/stockist-location-heatmap/test-inject.html', (req, res) => {
    res.send(testInjectHTMLContent);
  });

  return app;
};
