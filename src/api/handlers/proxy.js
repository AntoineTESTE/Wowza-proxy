'use strict';

const Wreck = require('wreck');
const { host, port } = config.wowza;

module.exports = (server, { VimeoService }, { VideoStats }) => {

  server.subscription('/videos/progress');
  const sendToFront = (progress) => {
    if(progress > 100) return;
    setTimeout(() => {
      console.log('sending...')
      server.publish('/videos/progress', { _id: '594a2cd1af55590e8b11eae8', progress: progress + 3 });
      sendToFront(progress + 3);
    }, 2000);
  };
  sendToFront(0);

  server.subscription('/videos/response');
  setTimeout(() => {
    server.publish('/videos/reponse', { _id: '594a2cd1af55590e8b11eae8', err: null });
  }, 15000);


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
          Wreck.read(res, { json: true }, (err, payload) => { // Tamponne la reponse en JSON
            if (err) {
              return reply(err);
            }
            const replyOnce = _.once(reply); // Répond qu'une seule fois

            // Creation de la stat
            VideoStats.create({
              name: videoPath,
              uploadedAt: _.now(),
              uploadDuration: null,
              status: 'WAITING',
              url: ''
            }, (err, videoStats) => { // callback (erreur ou instance : videoStats)
              if (err) {
                return replyOnce(err);
              }
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
                  videoStats.url = headers.location; // url de la video
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
