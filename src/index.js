'use strict';

module.exports = (server) => {
  const services = require('./services')();
  require('./api')(server, services);
};
