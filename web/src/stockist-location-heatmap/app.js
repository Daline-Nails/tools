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

  const extractForwardedForHeader = headerValue => {
    if (!headerValue) return '';
    const ipAddresses = headerValue.split(',').map(value => value.trim());
    return ipAddresses[0];
  };

  const fetchIPLocation = async req => {
    try {
      const forwardedForHeader = extractForwardedForHeader(req.headers['x-forwarded-for']);
      const isLocal = req.socket.remoteAddress === '::1';
      const requestIP = isLocal
        ? '220.236.183.148' // Use a Sydney IP address for local development
        : forwardedForHeader || req.socket.remoteAddress;
      const response = await maxMindGeoIPClient.city(requestIP);
      process.stdout.write(`GEODATA: City "${response.city.names.en}" found for IP ${requestIP}. Geo lat: ${response.latitude}, lon: ${response.longitude}, accuracy: ${response.location.accuracyRadius}\n`);
      return response;
    } catch(e) {
      process.stdout.write(`Error trying to get IP for request: ${e.message}\n`);
      return {};
    }
  };

  app.get('/charts/stockist-location-heatmap', async (req, res) => {
    process.stdout.write(`Request received from remoteAddress: ${req.socket.remoteAddress} / x-forwarded-for: ${req.headers['x-forwarded-for']}\n`);

    const ipLocationResponse = await fetchIPLocation(req);

    res.send(StockistsMapPage({
      initialPosition: resolveInitialPosition({
        latitude: ipLocationResponse.location.latitude,
        longitude: ipLocationResponse.location.longitude,
        city: ipLocationResponse.city.names.en,
      }),
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
