const access_token = '9d71d8d7b14918442128536e34cbb349';
const Vimeo = require('vimeo');
const lib = new Vimeo('', '', access_token);

module.exports = () => {
    return {
        upload(filePath, onResponse, onProgress) {
            lib.streamingUpload(filePath, onResponse, onProgress);
        }
    };
};

