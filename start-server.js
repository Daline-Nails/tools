const express = require('express');
const root = require('app-root-path');

const app = express();

app.use('/static', express.static('./static'))

app.use(require(`${root}/src/init/app`)());
app.use(require(`${root}/src/consignation/app`)());
app.use(require(`${root}/src/influencer/app`)());
app.use(require(`${root}/src/internal-room-lease/app`)());
app.use(require(`${root}/src/casual-internal-room-lease/app`)());
app.use(require(`${root}/src/manicure-agreement/app`)());
app.use(require(`${root}/src/mutual-nda/app`)());
app.use(require(`${root}/src/commission-contractor/app`)());

app.listen(8080, () => {
  process.stdout.write(`Listening on http://localhost:8080\n`);
});
