// VideoService, gestionnaire de Video (en relation avec le modèle VideoStats)

'use strict';

module.exports = ({ VideoStats }) => {
  return {

    // Creation d'une entité vidéo
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

    // Setting de la video en fin de d'upload
    setUploaded(video, location, f) {
      video.status = 'UPLOADED';
      video.uploadDuration = _.now() - video.uploadedAt;
      video.progress = 100;
      video.url = location;
      video.save(f);
    },


    // Setting de la video en fin pendant l'upload
    setUploading(video, progress, f) {
      video.status = 'UPLOADING';
      video.progress = progress;
      video.save(f);
    }
  };
};
