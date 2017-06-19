const access_token = config.vimeo.token;
const { Vimeo } = require('vimeo');
const lib = new Vimeo('', '', access_token);

module.exports = () => {
  return {
    upload(filePath, onResponse, onProgress) {
      lib.streamingUpload(filePath, onResponse, onProgress);
    }
  };
};
