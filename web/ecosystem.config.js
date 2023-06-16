// pm2 ecosystem file
module.exports = {
  apps : [{
    script: 'start-server.js',
    watch: '.',
    ignore_watch : [
      './access.txt' // Prevent restarting the server on page load, Load Balancer gets 503 status
    ],
  }]
};
