module.exports = ipResponse => {
  const maxMindResponse = ipResponse.maxMindResponse;
  const city = maxMindResponse.city ? maxMindResponse.city.names.en : '';
  const latitude = maxMindResponse.location && maxMindResponse.location.latitude ? maxMindResponse.location.latitude : 0;
  const longitude = maxMindResponse.location && maxMindResponse.location.longitude ? maxMindResponse.location.longitude : 0;
  const accuracy = maxMindResponse.location && maxMindResponse.location.accuracyRadius ? maxMindResponse.location.accuracyRadius : 9999999;
  const continentCode = maxMindResponse.continent && maxMindResponse.continent.code ? maxMindResponse.continent.code : '';

  // Only log cities that I haven't yet seen in the logs
  const isCityBlacklisted = ['', 'Montenegro', 'Sydney', 'Brisbane', 'Gold Coast', 'Perth'].includes(city);

  // Ignore logging continents in which we have no stockists
  const isContinentBlacklisted = ['EU', 'NA', 'AS'].includes(continentCode);

  if (!isCityBlacklisted && !isContinentBlacklisted) {
    process.stdout.write(`GEODATA MAXMIND RESPONSE: ${JSON.stringify(ipResponse.maxMindResponse, null, 4)}\n`);
    process.stdout.write(`GEODATA: City "${city}" found for IP ${ipResponse.ipAddress}. Geo lat: ${latitude}, lon: ${longitude}, accuracy: ${accuracy}km\n`);
  }

  return {
    latitude: latitude,
    longitude: longitude,
    city: city,
    accuracy: accuracy,
  };
};
