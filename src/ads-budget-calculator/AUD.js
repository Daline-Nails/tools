const Money = require('dinero.js');

module.exports = unit => Money({ amount: unit * 100, currency: 'AUD' });
