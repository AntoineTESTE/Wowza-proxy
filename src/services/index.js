'use strict';

module.exports = (models) => {
  const VimeoService = require('./VimeoServices')();
  return {
    VideoService: require('./VideoService')(models),
    VideoUploadService: require('./VideoUploadService')(VimeoService)
  };
};
