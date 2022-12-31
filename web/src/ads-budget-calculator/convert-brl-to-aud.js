const Money = require('dinero.js');

module.exports = async unit => {
  return await Money({ amount: unit * 100, currency: 'BRL' }).convert('AUD', {
    endpoint: new Promise(resolve => resolve({
      rates: {
        AUD: 0.27
      }
    }))
  });
};
