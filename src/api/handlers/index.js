'use strict';

module.exports = (server, services, models) => {
  return {
    proxy: require('./proxy')(server, services),
    videos: require('./videos')(models)
  };
};
