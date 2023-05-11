module.exports = ({ city, latitude, longitude }) => {
  return city === 'Sydney'
    ? { lat: latitude, lng: longitude, zoom: 9 }
    : { lat: -29.830709201476697, lng: 134.6193490235566, zoom: 3 };
};
