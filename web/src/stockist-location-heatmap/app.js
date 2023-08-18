const express = require('express');
const fs = require('fs');
const root = require('app-root-path');
const HandleBars = require('handlebars');

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
        ? '220.236.183.148' // Default IP address for local development
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

  app.get('/charts/access', (req, res) => {
    const accessHTMLContent = fs.readFileSync(`${root}/src/stockist-location-heatmap/access.html`, { encoding: 'UTF-8' });
    const accessTxtJSONObjects = fs.readFileSync(`${root}/access.txt`, { encoding: 'UTF-8' });
    const lines = accessTxtJSONObjects.trim().split('\n');
    const points = lines.reduce((acc, jsonString) => {
      try {
        return acc.concat(JSON.parse(jsonString));
      } catch(e) {
        return acc;
      }
    }, []).reduce((acc, point) => {
      const found = acc.find(thisPoint => thisPoint.latitude === point.latitude && thisPoint.longitude === point.longitude);
      if (found) {
        found.count++;
      } else {
        acc.push({ ...point, count: 1 });
      }
      return acc;
    }, [])
    // .filter(point => {
    //   return (
    //       // Sydney
    //       !(point.latitude === -33.8715 && point.longitude === 151.2006) &&
    //       // Northern Beaches
    //       !(point.latitude === -33.7707 && point.longitude === 151.2495)
    //     );
    // })
    .map(point => {
      return {
        latLng: [point.latitude, point.longitude],
        count: point.count
      };
    });
    res.send(
      HandleBars.compile(accessHTMLContent)({
        points: JSON.stringify(points)
      })
     );
  });

  app.get('/charts/stockist-location-heatmap', async (req, res) => {
    const ipResponse = await fetchIPResponse(getRequestIP(req));

    res.send(StockistsMapPage({
      initialPosition: resolveInitialPosition(createIpLocation(ipResponse)),
      stores: JSON.stringify(require('./STORES.json'))
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
