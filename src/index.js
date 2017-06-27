'use strict';

module.exports = (server) => {
  const models = require('./models')();
  const services = require('./services')(models);
  require('./api')(server, services, models);
};
