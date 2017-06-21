'use strict';

module.exports = (logger) => {
  return require('common-env/withLogger')(logger).getOrElseAll({
    api: {
      port: 8086
    },
    wowza: {
      host: 'localhost',
      port: 8087
    },
    vimeo: {
      token: 'dev'
    },
    videos: {
      src: ''
    },
    mongodb: {
      connectionString: 'localhost'
    },
  });
};
