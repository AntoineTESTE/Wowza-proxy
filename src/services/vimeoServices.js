const access_token = config.vimeo.token;
const { Vimeo } = require('vimeo');
const lib = new Vimeo('', '', access_token);

module.exports = () => {
  return {
    upload(filePath, onResponse, onProgress) {
      onProgress(0, 0);
      setTimeout(() => {
        onResponse(null, {}, {}, {});
      }, 1000);

      // lib.streamingUpload(filePath, onResponse, onProgress);
    }
  }
}