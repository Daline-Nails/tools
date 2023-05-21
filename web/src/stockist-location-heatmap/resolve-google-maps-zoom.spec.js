const expect = require('chai').expect;

const resolveGoogleMapsZoom = require('./resolve-google-maps-zoom');

describe('Resolve Google Maps Zoom', () => {
  it('returns zoom 3 (Australia-Wide resolution) if accuracy data is not there', () => {
    const userLocation = {};
    const googleMapsZoom = resolveGoogleMapsZoom(userLocation);
    expect(googleMapsZoom).to.eql({ zoom: 3 });
  });

  describe('Accuracy 5km', () => {
    it('Accuracy: < 5km, Zoom: 19', () => {
      const userLocation = { accuracy: 4 };
      const googleMapsZoom = resolveGoogleMapsZoom(userLocation);
      expect(googleMapsZoom).to.eql({ zoom: 19 });
    });
    it('Accuracy: 5km, Zoom: 12', () => {
      const userLocation = { accuracy: 5 };
      const googleMapsZoom = resolveGoogleMapsZoom(userLocation);
      expect(googleMapsZoom).to.eql({ zoom: 12 });
    });
    it('Accuracy: > 5km, Zoom: 12', () => {
      const userLocation = { accuracy: 6 };
      const googleMapsZoom = resolveGoogleMapsZoom(userLocation);
      expect(googleMapsZoom).to.eql({ zoom: 12 });
    });
  });

  describe('Accuracy 10km', () => {
    it('Accuracy: < 10km, Zoom: 12', () => {
      const userLocation = { accuracy: 9 };
      const googleMapsZoom = resolveGoogleMapsZoom(userLocation);
      expect(googleMapsZoom).to.eql({ zoom: 12 });
    });
    it('Accuracy: 10km, Zoom: 11', () => {
      const userLocation = { accuracy: 10 };
      const googleMapsZoom = resolveGoogleMapsZoom(userLocation);
      expect(googleMapsZoom).to.eql({ zoom: 11 });
    });
    it('Accuracy: > 10km, Zoom: 11', () => {
      const userLocation = { accuracy: 11 };
      const googleMapsZoom = resolveGoogleMapsZoom(userLocation);
      expect(googleMapsZoom).to.eql({ zoom: 11 });
    });
  });

  describe('Accuracy 50km', () => {
    it('Accuracy: < 50km, Zoom: 11', () => {
      const userLocation = { accuracy: 49 };
      const googleMapsZoom = resolveGoogleMapsZoom(userLocation);
      expect(googleMapsZoom).to.eql({ zoom: 11 });
    });
    it('Accuracy: 50km, Zoom: 8', () => {
      const userLocation = { accuracy: 50 };
      const googleMapsZoom = resolveGoogleMapsZoom(userLocation);
      expect(googleMapsZoom).to.eql({ zoom: 8 });
    });
    it('Accuracy: > 50km, Zoom: 8', () => {
      const userLocation = { accuracy: 51 };
      const googleMapsZoom = resolveGoogleMapsZoom(userLocation);
      expect(googleMapsZoom).to.eql({ zoom: 8 });
    });
  });

  describe('Accuracy 100km', () => {
    it('Accuracy: < 100km, Zoom: 8', () => {
      const userLocation = { accuracy: 99 };
      const googleMapsZoom = resolveGoogleMapsZoom(userLocation);
      expect(googleMapsZoom).to.eql({ zoom: 8 });
    });
    it('Accuracy: 100km, Zoom: 7', () => {
      const userLocation = { accuracy: 100 };
      const googleMapsZoom = resolveGoogleMapsZoom(userLocation);
      expect(googleMapsZoom).to.eql({ zoom: 7 });
    });
    it('Accuracy: > 100km, Zoom: 7', () => {
      const userLocation = { accuracy: 101 };
      const googleMapsZoom = resolveGoogleMapsZoom(userLocation);
      expect(googleMapsZoom).to.eql({ zoom: 7 });
    });
  });

  describe('Accuracy 200km', () => {
    it('Accuracy: < 200km, Zoom: 7', () => {
      const userLocation = { accuracy: 199 };
      const googleMapsZoom = resolveGoogleMapsZoom(userLocation);
      expect(googleMapsZoom).to.eql({ zoom: 7 });
    });
    it('Accuracy: 200km, Zoom: 6', () => {
      const userLocation = { accuracy: 200 };
      const googleMapsZoom = resolveGoogleMapsZoom(userLocation);
      expect(googleMapsZoom).to.eql({ zoom: 6 });
    });
    it('Accuracy: > 200km, Zoom: 6', () => {
      const userLocation = { accuracy: 201 };
      const googleMapsZoom = resolveGoogleMapsZoom(userLocation);
      expect(googleMapsZoom).to.eql({ zoom: 6 });
    });
  });

  describe('Accuracy 1000km', () => {
    it('Accuracy: 1000km, Zoom: 6', () => {
      const userLocation = { accuracy: 999 };
      const googleMapsZoom = resolveGoogleMapsZoom(userLocation);
      expect(googleMapsZoom).to.eql({ zoom: 6 });
    });
    it('Accuracy: 1000km, Zoom: 4', () => {
      const userLocation = { accuracy: 1000 };
      const googleMapsZoom = resolveGoogleMapsZoom(userLocation);
      expect(googleMapsZoom).to.eql({ zoom: 4 });
    });
    it('Accuracy: > 1000km, Zoom: 4', () => {
      const userLocation = { accuracy: 1001 };
      const googleMapsZoom = resolveGoogleMapsZoom(userLocation);
      expect(googleMapsZoom).to.eql({ zoom: 4 });
    });
  });
});
