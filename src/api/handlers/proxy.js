'use strict';

const Wreck = require('wreck');
const { host, port } = config.wowza;

module.exports = (server, { VideoService, VideoUploadService }) => {
  server.subscription('/videos/progress');
  server.subscription('/videos/response');

  // Objet d'actions
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
          VideoService.createEmpty(videoPath, (err, videoStats) => {
            VideoUploadService.upload(`${config.videos.src}/${videoPath}`, (err, location) => {
              if(err) {
                return replyOnce(err);
              }
              VideoService.setUploaded(videoStats, location, (err, updatedVideoStats) => {
                server.publish('/videos/response', updatedVideoStats);
              });
            }, (progress) => {
              replyOnce();
              VideoService.setUploading(videoStats, progress, (err, updatedVideoStats) => {
                server.publish('/videos/progress', updatedVideoStats);
              });
            });
          });
        }
      });
    }
  };

  return {
    default (request, reply) {
      const fAction = actions[request.query.action]; // tableau d'actions
      if (!fAction) { // Si pas d'actions
        return reply(Boom.badRequest(`please provide as parameter one of the following actions: ${_.keys(actions).join(', ')}`));
      }
      fAction(request, reply); // sinon action
    }
  };
}
