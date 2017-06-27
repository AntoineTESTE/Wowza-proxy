'use strict';

module.exports = (VimeoService) => {
  return {
    upload(path, onResponse, onProgress) {
      let progress = 0;
      var interval = setInterval(function(){
        progress += 5;
        onProgress(progress);
      }, 1000);

      setTimeout(function(){
        clearInterval(interval);
        onResponse(null, 'ici');
      }, 20000);

      // VimeoService.upload(path, (err, body, status, headers) => {
      //   if(err) {
      //     return onResponse(err);
      //   }
      //   onResponse(null, headers.location);
      // }, (uploaded_size, file_size) => {
      //   const progress = Math.round((uploaded_size / file_size) * 100);
      //   onProgress(progress);
      // });
    }
  };
};
