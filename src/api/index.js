'use strict';

module.exports = (server, services, models) => {
  const handlers = require('./handlers')(services, models);
  require('./routes')(server, handlers);
};
