'use strict';

const app = require('express')();
app.get('/liveestreamrecord', (req, res) => {
  res.send('OK');
});
app.listen(8087, () => {
  console.log('ready');
});
