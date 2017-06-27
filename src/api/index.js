'use strict';

module.exports = (server, services, models) => {
  const handlers = require('./handlers')(server, services, models);
  require('./routes')(server, handlers);
};
