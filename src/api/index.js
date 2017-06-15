'use strict';

module.exports = (server) => {
  const handlers = require('./handlers')();
  require('./routes')(server, handlers);
};
