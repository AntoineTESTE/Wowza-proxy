'use strict';

const Wreck = require('wreck');
const { host, port } = config.wowza;

module.exports = ({ VimeoService }, { VideoStats }) => {

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
          Wreck.read(res, { json: true }, (err, payload) => { // Tamponne la reponse en JSON
            const replyOnce = _.once(reply); // Répond qu'une seule fois

            // Creation de la stat
            VideoStats.create({
              name: videoPath,
              uploadedAt: _.now(),
              uploadDuration: null,
              status: 'WAITING',
            }, (err, videoStats) => { // callback (erreur ou instance : videoStats)
              // Lancement de l'upload
              VimeoService.upload(`${config.videos.src}/${videoPath}`,
                // callback de l'upload (le cas ou c'est fini)
                function onResponse(err, body, status, headers) {
                  if (err) {
                    // cas d'erreur
                    return replyOnce(err);
                  }
                  // OK
                  videoStats.status = 'UPLOADED'; // status "fin d'upload"
                  videoStats.uploadDuration = _.now() - videoStats.uploadedAt; // calcul durée d'upload 
                  videoStats.save((err, updatedVideoStats) => { // enregistrement dans la collection VideoStats
                    logger.info('onResponse from upload:', err, body, headers);
                  });
                },
                // Avancement de l'upload (le cas ou c'est en cours)
                function onProgress(uploaded_size, file_size) {
                  Math.round((uploaded_size / file_size) * 100);
                  videoStats.status = 'UPLOADING'; // status "en cours"
                  videoStats.save((err, updatedVideoStats) => {
                    replyOnce(201);
                  });
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
