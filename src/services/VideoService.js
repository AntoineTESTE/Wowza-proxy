'use strict';

module.exports = ({ VideoStats }) => {
  return {
    createEmpty(path, f) {
      VideoStats.create({
        name: path,
        uploadedAt: _.now(),
        uploadDuration: null,
        status: 'WAITING',
        progress: 0,
        url: ''
      }, f);
    },

    setUploaded(video, location, f) {
      video.status = 'UPLOADED'; // status "fin d'upload"
      video.uploadDuration = _.now() - video.uploadedAt; // calcul durée d'upload
      video.progress = 100;
      video.url = location; // url de la video
      video.save(f);
    },

    setUploading(video, progress, f) {
      video.status = 'UPLOADING'; // status "en cours"
      video.progress = progress;
      video.save(f);
    }
  };
};
