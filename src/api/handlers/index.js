'use strict';

module.exports = (services) => {
  return {
    proxy: require('./proxy')(services)
  };
};
