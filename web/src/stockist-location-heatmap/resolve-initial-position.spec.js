const expect = require('chai').expect;

const resolveInitialMapCenter = require('./resolve-initial-position');

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
