'use strict';

module.exports = (server, services, models) => {
  return {
    proxy: require('./proxy')(server, services, models),
    videos: require('./videos')(models)
  };
};
