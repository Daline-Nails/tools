const resolveGoogleMapsZoom = require('./resolve-google-maps-zoom');
const resolveNearestStore = require('./resolve-nearest-store');

const STORES = require('./STORES.json');

module.exports = ({ latitude, longitude, accuracy }) => {
  const userLocation = { lat: latitude, lon: longitude };
  const stores = STORES.map(store => ({ name: store.name, lat: store.latLng[0], lon: store.latLng[1] }));

  let nearestStore;
  try {
    nearestStore = resolveNearestStore(stores)(userLocation);
  } catch(e) {
    // eslint-disable-next-line no-console
    console.error(`Failed to resolve initial position: ${e.message}`);
  }

  const zoom = resolveGoogleMapsZoom({ accuracy }).zoom;

  return nearestStore
    ? { lat: nearestStore.lat, lng: nearestStore.lon, zoom }
    : { lat: userLocation.lat, lng: userLocation.lon, zoom };
};
