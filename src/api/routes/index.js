'use strict';

module.exports = (server, handlers) => {
  return {
    wowza: require('./wowza.routes')(server, handlers)
  };
};
