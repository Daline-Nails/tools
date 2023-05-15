const expect = require('chai').expect;

const resolveInitialMapCenter = require('./resolve-initial-position');

/*
 * Some sample data from logs for future reference:
 *
 * GEODATA: City "Townsville" found for IP 180.216.125.100. Geo lat: -19.3029, lon: 146.638, accuracy: 10km
 * GEODATA: City "Townsville" found for IP 101.162.79.238. Geo lat: -19.3029, lon: 146.638, accuracy: 200km
 * GEODATA: City "Londonderry" found for IP 58.164.79.23. Geo lat: -33.6516, lon: 150.749, accuracy: 50
 * GEODATA: City "Nowra" found for IP 120.159.51.249. Geo lat: -34.8794, lon: 150.6039, accuracy: 100km
 * GEODATA: City "Coffs Harbour" found for IP 49.189.45.225. Geo lat: -30.294, lon: 153.1192, accuracy: 100km
 * GEODATA: City "Melbourne" found for IP 106.71.0.76. Geo lat: -37.8411, lon: 144.9799, accuracy: 200km
 * GEODATA: City "Melbourne" found for IP 59.102.39.47. Geo lat: -37.8159, lon: 144.9669, accuracy: 5km
 * GEODATA: City "Caulfield South" found for IP 115.69.41.87. Geo lat: -37.8939, lon: 145.0251, accuracy: 1000km
 */

describe('Initial Map Center', () => {
  it('returns Australia-wide map center by default when arguments are empty', () => {
    const initialMapCenter = resolveInitialMapCenter({});
    expect(initialMapCenter).to.eql({ lat: -29.830709201476697, lng: 134.6193490235566, zoom: 3 });
  });
  describe('Sydney', () => {
    it('returns Australia-wide if accuracy is more than 100km', () => {
      const initialMapCenter = resolveInitialMapCenter({
        latitude: -33.8478052,
        longitude: 150.6023138,
        city: 'Sydney',
        accuracy: 101
      });
      expect(initialMapCenter).to.eql({ lat: -29.830709201476697, lng: 134.6193490235566, zoom: 3 });
    });
    it('returns higher zoom if and accuracy is exactly 100km', () => {
      const initialMapCenter = resolveInitialMapCenter({
        latitude: -33.8478052,
        longitude: 150.6023138,
        city: 'Sydney',
        accuracy: 100
      });
      expect(initialMapCenter).to.eql({ lat: -33.8478052, lng: 150.6023138, zoom: 9 });
    });
    it('returns higher zoom if accuracy is less than 100km', () => {
      const initialMapCenter = resolveInitialMapCenter({
        latitude: -33.8478052,
        longitude: 150.6023138,
        city: 'Sydney',
        accuracy: 99
      });
      expect(initialMapCenter).to.eql({ lat: -33.8478052, lng: 150.6023138, zoom: 9 });
    });
  });

  describe('Brisbane', () => {
    it('returns Australia-wide if accuracy is more than 100km', () => {
      const initialMapCenter = resolveInitialMapCenter({
        latitude: -27.4679,
        longitude: 153.0325,
        city: 'Brisbane',
        accuracy: 101
      });
      expect(initialMapCenter).to.eql({ lat: -29.830709201476697, lng: 134.6193490235566, zoom: 3 });
    });
    it('returns higher zoom if and accuracy is exactly 100km', () => {
      const initialMapCenter = resolveInitialMapCenter({
        latitude: -27.4679,
        longitude: 153.0325,
        city: 'Brisbane',
        accuracy: 100
      });
      expect(initialMapCenter).to.eql({ lat: -27.4679, lng: 153.0325, zoom: 9 });
    });
    it('returns higher zoom if accuracy is less than 100km', () => {
      const initialMapCenter = resolveInitialMapCenter({
        latitude: -27.4679,
        longitude: 153.0325,
        city: 'Brisbane',
        accuracy: 99
      });
      expect(initialMapCenter).to.eql({ lat: -27.4679, lng: 153.0325, zoom: 9 });
    });
  });

  describe('Gold Coast', () => {
    it('returns Australia-wide if accuracy is more than 100km', () => {
      const initialMapCenter = resolveInitialMapCenter({
        latitude: -28.0211,
        longitude: 153.309,
        city: 'Gold Coast',
        accuracy: 101
      });
      expect(initialMapCenter).to.eql({ lat: -29.830709201476697, lng: 134.6193490235566, zoom: 3 });
    });
    it('returns higher zoom if and accuracy is exactly 100km', () => {
      const initialMapCenter = resolveInitialMapCenter({
        latitude: -28.0211,
        longitude: 153.309,
        city: 'Gold Coast',
        accuracy: 100
      });
      expect(initialMapCenter).to.eql({ lat: -28.0211, lng: 153.309, zoom: 9 });
    });
    it('returns higher zoom if accuracy is less than 100km', () => {
      const initialMapCenter = resolveInitialMapCenter({
        latitude: -28.0211,
        longitude: 153.309,
        city: 'Gold Coast',
        accuracy: 99
      });
      expect(initialMapCenter).to.eql({ lat: -28.0211, lng: 153.309, zoom: 9 });
    });
  });

  describe('Perth', () => {
    it('returns Australia-wide if accuracy is more than 100km', () => {
      const initialMapCenter = resolveInitialMapCenter({
        latitude: -31.9474,
        longitude: 115.8648,
        city: 'Perth',
        accuracy: 101
      });
      expect(initialMapCenter).to.eql({ lat: -29.830709201476697, lng: 134.6193490235566, zoom: 3 });
    });
    it('returns higher zoom if and accuracy is exactly 100km', () => {
      const initialMapCenter = resolveInitialMapCenter({
        latitude: -31.9474,
        longitude: 115.8648,
        city: 'Perth',
        accuracy: 100
      });
      expect(initialMapCenter).to.eql({ lat: -31.9474, lng: 115.8648, zoom: 9 });
    });
    it('returns higher zoom if accuracy is less than 100km', () => {
      const initialMapCenter = resolveInitialMapCenter({
        latitude: -31.9474,
        longitude: 115.8648,
        city: 'Perth',
        accuracy: 99
      });
      expect(initialMapCenter).to.eql({ lat: -31.9474, lng: 115.8648, zoom: 9 });
    });
  });
});
