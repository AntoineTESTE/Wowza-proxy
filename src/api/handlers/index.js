'use strict';

module.exports = (services, models) => {
  return {
    proxy: require('./proxy')(services, models),
    video: require('./videos')(models)
  };
};
