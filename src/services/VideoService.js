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
      video.uploadedSize = video.fileSize;
      video.url = location;
      video.save(f);
    },


    // Setting de la video en fin pendant l'upload
    setUploading(video, uploadedSize, fileSize, f) {
      video.status = 'UPLOADING';
      video.uploadedSize = uploadedSize;
      video.fileSize = fileSize;
      video.save(f);
    }
  };
};
