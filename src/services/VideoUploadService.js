// VideoUploadService, gestionnaire de requests/responses (en relation avec le service VimeoService)

'use strict';

module.exports = (VimeoService) => {
  return {

    // Fonction d'upload (défini par Vimeo)
    upload(path, onResponse, onProgress) {
      let uploadedSize = 0;
      let fileSize = 100;
      var interval = setInterval(function () {
        uploadedSize += 5;
        onProgress(uploadedSize, fileSize);
      }, 1000);

      setTimeout(function () {
        clearInterval(interval);
        onResponse(null, 'ici');
      }, 20000);

      // VimeoService.upload(path, (err, body, status, headers) => {
      //   if(err) {
      //     return onResponse(err);
      //   }
      //   onResponse(null, headers.location);
      // }, onProgress);
    }
  };
};
