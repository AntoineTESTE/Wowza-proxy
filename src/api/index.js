'use strict';

module.exports = (server, services) => {
  const handlers = require('./handlers')(services);
  require('./routes')(server, handlers);
};
