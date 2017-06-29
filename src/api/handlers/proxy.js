// Gestionnaire Proxy (interface Front - Services)

'use strict';

const Wreck = require('wreck');
const { host, port } = config.wowza;

module.exports = (server, { VideoService, VideoUploadService }) => {
  server.subscription('/videos/progress');
  server.subscription('/videos/response');

  // Creation d'un objet d'actions
  const actions = {
    // Démarrage d'enregistrement
    startRecording(request, reply) {
      reply.proxy({
        host,
        port,
        passThrough: true
      });
    },

    // Arret d'enregistrement
    stopRecording(request, reply) {
      const videoPath = request.query.outputFile; // Nom du fichier
      reply.proxy({
        host,
        port,
        passThrough: true,

        // Reponse de Wowza
        onResponse(err, res, request, reply, settings, ttl) {
          if (err) {
            return reply(err);
          }
          const replyOnce = _.once(reply); // Répond qu'une seule fois
          // Creation d'une video vide (path, fichier)
          VideoService.createEmpty(videoPath, (err, videoStats) => { // Chemin, fichier
            // Démarrage de l'upload (path, onResponse, On Progress)
            // On Response : (2 : appel au service Vimeo quand fin d'upload)
            VideoUploadService.upload(`${config.videos.src}/${videoPath}`, (err, location) => {
              if (err) {
                return replyOnce(err);
              }
              // Setting de la video en fin de d'upload
              VideoService.setUploaded(videoStats, location, (err, updatedVideoStats) => {
                server.publish('/videos/response', updatedVideoStats);
              });
            },
              // OnProgress : (1 : appel au service Vimeo pour l'upload)
              (uploadedSize, fileSize) => {
                replyOnce();
                // Setting de la video pendant l'upload
                VideoService.setUploading(videoStats, uploadedSize, fileSize, (err, updatedVideoStats) => {
                  server.publish('/videos/progress', updatedVideoStats);
                });
              });
          });
        }
      });
    }
  };

  return {
    default(request, reply) {
      const fAction = actions[request.query.action]; // tableau d'actions
      if (!fAction) { // Si pas d'actions
        return reply(Boom.badRequest(`please provide as parameter one of the following actions: ${_.keys(actions).join(', ')}`));
      }
      fAction(request, reply); // sinon action
    }
  };
}
