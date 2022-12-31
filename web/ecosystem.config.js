// pm2 ecosystem file
module.exports = {
  apps : [{
    script: 'start-server.js',
    watch: '.'
  }]
};
