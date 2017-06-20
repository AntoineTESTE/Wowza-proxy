'use strict';

const app = require('express')();
// Call to livestream service
app.get('/liveestreamrecord', (req, res) => {
  res.send('OK');
});
// Call localhost
app.listen(8087, () => {
  console.log('ready');
});
