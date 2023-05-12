const { expect } = require('chai');
const createIPLocation = require('./create-ip-location');

describe('Create IPLocation from IP Response', () => {
  it('don\'t error out when none fo the properties of IP Response are gone', () => {
    const ipResponse = {
      maxMindResponse: { /* Nothing here */ },
      ipAddress: ''
    };
    expect(createIPLocation(ipResponse)).to.eql({
      city: '',
      latitude: 0,
      longitude: 0,
      accuracy: 9999999
    });
  });
});
