const express = require('express');
const fs = require('fs');
const root = require('app-root-path');

if (!process.env.MAXMIND_LICENSE_KEY) throw new Error('MAXMIND_LICENSE_KEY environment variable is required');

const WebServiceClient = require('@maxmind/geoip2-node').WebServiceClient;
const maxMindGeoIPClient = new WebServiceClient('843123', process.env.MAXMIND_LICENSE_KEY);

const StockistsMapPage = require('./StockistsMapPage');
const resolveInitialPosition = require('./resolve-initial-position');

const testInjectHTMLContent = fs.readFileSync(`${root}/src/stockist-location-heatmap/test-inject.html`, { encoding: 'UTF-8' });
const injectJsContent = fs.readFileSync(`${root}/src/stockist-location-heatmap/inject.js`, { encoding: 'UTF-8' });

module.exports = () => {
  const app = express();

  app.get('/charts/stockist-location-heatmap', async (req, res) => {
    process.stdout.write(`Request received from ${req.socket.remoteAddress} / ${req.headers['x-forwarded-for']}\n`);
    const isLocal = req.socket.remoteAddress === '::1';
    const requestIP = isLocal
      ? '220.236.183.148' // Use a Sydney IP address for local development
      : req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const response = await maxMindGeoIPClient.city(requestIP);

    const ipLocation = {
      latitude: response.location.latitude,
      longitude: response.location.longitude,
      city: response.city.names.en,
    };

    process.stdout.write(`City "${ipLocation.city}" found for IP ${remoteAddress}\n`);

    res.send(StockistsMapPage({
      initialPosition: resolveInitialPosition(ipLocation),
    }).to('text/html'));
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
