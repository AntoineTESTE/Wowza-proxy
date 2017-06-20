'use strict';

module.exports = (server) => {
  const services = require('./services')();
  const models = require('./models')();
  require('./api')(server, services, models);
};
