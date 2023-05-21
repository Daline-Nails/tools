const expect = require('chai').expect;

const resolveNearestStore = require('./resolve-nearest-store');

describe('Resolve Nearest Store', () => {
  it('returns user location if list of stores is empty', () => {
    const userLocation = { lat: -31.455814, lon: 152.922177 };

    const stores = [];
    expect(() => resolveNearestStore(stores)(userLocation)).to.throw(Error, 'List of stores is empty');
  });
  it('returns "Coffs Harbour Store" when stores are "Coffs, Melbourne" and user is in "Port Macquarie"', () => {
    const coffsStoreLocation = { name: 'Coffs Harbour Store', lat: -30.295536, lon: 153.109332 };
    const melbourneStoreLocation = { name: 'Melbourne Store', lat: -37.930462, lon: 145.015518 };
    const portMacquarieUserLocation = { lat: -31.455814, lon: 152.922177 };

    const stores = [melbourneStoreLocation, coffsStoreLocation];
    const nearestStore = resolveNearestStore(stores)(portMacquarieUserLocation);
    expect(nearestStore).to.equal(coffsStoreLocation);
  });

  it('returns "Perth Store" when stores are "Perth, Adelaide" and user is in "Margaret River"', () => {
    const perthStoreLocation = { name: 'Perth Store', lat: -32.038358, lon: 115.961239 };
    const adelaideStoreLocation = { name: 'Melbourne Store', lat: -34.976693, lon: 138.591654 };
    const margaretRiverUserLocation = { lat: -33.967883, lon: 115.021698 };

    const stores = [perthStoreLocation, adelaideStoreLocation];
    const nearestStore = resolveNearestStore(stores)(margaretRiverUserLocation);
    expect(nearestStore).to.equal(perthStoreLocation);
  });

  it('returns "Dee Why Store" when stores are "Dee Why, Wheeler Heights" and user is in "Narraweena"', () => {
    const deeWhyStore = { name: 'Dee Why Store', lat: -33.754412, lon: 151.284576 };
    const wheelerHeightsStore = { name: 'Wheeler Heights Store', lat: -33.727745, lon: 151.279855 };
    const narraweenaUserLocation = { lat: -33.749657, lon: 151.272860 };
    const stores = [deeWhyStore, wheelerHeightsStore];
    const nearestStore = resolveNearestStore(stores)(narraweenaUserLocation);
    expect(nearestStore).to.equal(deeWhyStore);
  });
});
