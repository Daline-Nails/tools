const expect = require('chai').expect;

const resolveInitialMapCenter = require('./resolve-initial-position');

describe('Initial Map Center', () => {
  it('returns Australia-wide map center by default when arguments are empty', () => {
    const initialMapCenter = resolveInitialMapCenter({});
    expect(initialMapCenter).to.eql({ lat: -29.830709201476697, lng: 134.6193490235566, zoom: 3 });
  });
  it('returns higher zoom if city is Sydney', () => {
    const initialMapCenter = resolveInitialMapCenter({
      latitude: -33.8478052,
      longitude: 150.6023138,
      city: 'Sydney'
    });
    expect(initialMapCenter).to.eql({ lat: -33.8478052, lng: 150.6023138, zoom: 9 });
  });
});
