'use strict';

module.exports = (server, handlers) => {
  require('./wowza.routes')(server, handlers)
  require('./videostats.routes')(server, handlers)
};
