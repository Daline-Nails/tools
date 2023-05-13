const express = require('express');
const fs = require('fs');
const root = require('app-root-path');

if (!process.env.MAXMIND_LICENSE_KEY) throw new Error('MAXMIND_LICENSE_KEY environment variable is required');

const WebServiceClient = require('@maxmind/geoip2-node').WebServiceClient;
const maxMindGeoIPClient = new WebServiceClient('843123', process.env.MAXMIND_LICENSE_KEY);

const StockistsMapPage = require('./StockistsMapPage');
const resolveInitialPosition = require('./resolve-initial-position');
const createIpLocation = require('./create-ip-location');

const testInjectHTMLContent = fs.readFileSync(`${root}/src/stockist-location-heatmap/test-inject.html`, { encoding: 'UTF-8' });
const injectJsContent = fs.readFileSync(`${root}/src/stockist-location-heatmap/inject.js`, { encoding: 'UTF-8' });

module.exports = () => {
  const app = express();

  const extractForwardedForHeader = headerValue => {
    if (!headerValue) return '';
    const ipAddresses = headerValue.split(',').map(value => value.trim());
    return ipAddresses[0];
  };

  const getRequestIP = req => {
    process.stdout.write(`Request received from remoteAddress: ${req.socket.remoteAddress} / x-forwarded-for: ${req.headers['x-forwarded-for']}\n`);
    try {
      const forwardedForHeader = extractForwardedForHeader(req.headers['x-forwarded-for']);
      const isLocal = req.socket.remoteAddress === '::1';
      return isLocal
        ? '101.176.150.225' // Use a Sydney IP address for local development
        : forwardedForHeader || req.socket.remoteAddress;
    } catch(e) {
      process.stdout.write(`Error trying to get IP for request: ${e.message}\n`);
      return '';
    }
  };

  const fetchIPResponse = async ipAddress => {
    const ipResponse = {
      ipAddress: ipAddress,
      maxMindResponse: {}
    };

    try {
      ipResponse.maxMindResponse = await maxMindGeoIPClient.city(ipAddress);
    } catch(e) {
      process.stdout.write(`Error trying to fetch response for IP ${ipAddress}: ${e.message}\n`);
    }

    return ipResponse;
  };

  app.get('/charts/stockist-location-heatmap', async (req, res) => {
    const ipResponse = await fetchIPResponse(getRequestIP(req));

    res.send(StockistsMapPage({
      initialPosition: resolveInitialPosition(createIpLocation(ipResponse)),
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
