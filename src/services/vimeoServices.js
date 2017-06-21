const access_token = config.vimeo.token;
const { Vimeo } = require('vimeo');
const lib = new Vimeo('', '', access_token);

module.exports = () => {
  return {
    // onProgress(0, 0);
    // setTimeout(() => {
    //   onResponse(null, {}, {}, {});
    // }, 1000);
    upload(filePath, onResponse, onProgress) {
      lib.streamingUpload(filePath, onResponse, onProgress);
    }
  };
};
