'use strict';

module.exports = (models) => {
  const VimeoService = require('./VimeoService')();
  return {
    VideoService: require('./VideoService')(models),
    VideoUploadService: require('./VideoUploadService')(VimeoService)
  };
};
