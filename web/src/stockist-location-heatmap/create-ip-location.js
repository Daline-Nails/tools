module.exports = ipResponse => {
  const maxMindResponse = ipResponse.maxMindResponse;
  const city = maxMindResponse.city ? maxMindResponse.city.names.en : '';
  const latitude = maxMindResponse.location && maxMindResponse.location.latitude ? maxMindResponse.location.latitude : 0;
  const longitude = maxMindResponse.location && maxMindResponse.location.longitude ? maxMindResponse.location.longitude : 0;
  const accuracy = maxMindResponse.location && maxMindResponse.location.accuracyRadius ? maxMindResponse.location.accuracyRadius : 9999999;

  process.stdout.write(`GEODATA MAXMIND RESPONSE: ${JSON.stringify(ipResponse.maxMindResponse, null, 4)}\n`);
  process.stdout.write(`GEODATA: City "${city}" found for IP ${ipResponse.ipAddress}. Geo lat: ${latitude}, lon: ${longitude}, accuracy: ${accuracy}km\n`);

  return {
    latitude: latitude,
    longitude: longitude,
    city: city,
    accuracy: accuracy,
  };
};
