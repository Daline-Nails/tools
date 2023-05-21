const { getDistance } = require('geolib');
module.exports = stores => userLocation => {
  const distanceInMetersFromStores = stores.map(store => getDistance(
    { latitude: store.lat, longitude: store.lon },
    { latitude: userLocation.lat, longitude: userLocation.lon }
  ));
  const indexOfNearestStore = distanceInMetersFromStores.indexOf(Math.min(...distanceInMetersFromStores));
  const nearestStore = stores[indexOfNearestStore];
  if (!nearestStore) {
    throw new Error('List of stores is empty');
  }
  return nearestStore;
};
