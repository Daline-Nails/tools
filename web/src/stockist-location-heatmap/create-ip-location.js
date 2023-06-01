const fs = require('fs');

const readFileSyncIfExists = (filePath) => {
  try {
    return fs.readFileSync(filePath, { encoding: 'UTF-8' });
  } catch(e) {
    if (e.code !== 'ENOENT') throw e;
    return '';
  }
};

module.exports = ipResponse => {
  const maxMindResponse = ipResponse.maxMindResponse;
  const city = maxMindResponse.city ? maxMindResponse.city.names.en : '';
  const latitude = maxMindResponse.location && maxMindResponse.location.latitude ? maxMindResponse.location.latitude : 0;
  const longitude = maxMindResponse.location && maxMindResponse.location.longitude ? maxMindResponse.location.longitude : 0;
  const accuracy = maxMindResponse.location && maxMindResponse.location.accuracyRadius ? maxMindResponse.location.accuracyRadius : 9999999;
  const continentCode = maxMindResponse.continent && maxMindResponse.continent.code ? maxMindResponse.continent.code : '';

  // Only log cities that I haven't yet seen in the logs
  const isCityBlacklisted = ['', 'Montenegro'].includes(city);

  // Ignore logging continents in which we have no stockists
  const isContinentBlacklisted = ['EU', 'NA', 'AS'].includes(continentCode);

  if (!isCityBlacklisted && !isContinentBlacklisted) {
    // Store all access logs so we can use in a heatmap to identify where people are coming from
    // to see the map and where we have to foxus on getting stockists
    const filePath = './access.txt';
    const newData = JSON.stringify({ city: city, ipAddress: ipResponse.ipAddress, latitude: latitude, longitude: longitude, accuracy: accuracy });
    const existingData = readFileSyncIfExists(filePath);
    fs.writeFileSync(filePath, existingData + '\n' + newData, { encoding: 'UTF-8' });

    // process.stdout.write(`GEODATA MAXMIND RESPONSE: ${JSON.stringify(ipResponse.maxMindResponse, null, 4)}\n`);
    process.stdout.write(`GEODATA: City "${city}" found for IP ${ipResponse.ipAddress}. Geo lat: ${latitude}, lon: ${longitude}, accuracy: ${accuracy}km\n`);
  }

  return {
    latitude: latitude,
    longitude: longitude,
    city: city,
    accuracy: accuracy,
  };
};
