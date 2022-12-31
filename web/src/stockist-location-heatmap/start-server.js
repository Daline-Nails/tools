const express = require('express');

const app = express();

app.use(express.static('public'))

app.listen('8787', () => {
  process.stdout.write(`http://localhost:8787\n`);
});