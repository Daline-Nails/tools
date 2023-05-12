const AUSTRALIA_WIDE = { lat: -29.830709201476697, lng: 134.6193490235566, zoom: 3 };

module.exports = ({ city, latitude, longitude, accuracy }) => {
  if (accuracy >= 100) {
    return AUSTRALIA_WIDE;
  }
  return city === 'Sydney'
    ? { lat: latitude, lng: longitude, zoom: 9 }
    : AUSTRALIA_WIDE;
};
