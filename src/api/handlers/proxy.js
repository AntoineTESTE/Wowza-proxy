'use strict';

const Wreck = require('wreck');
const { host, port } = config.wowza;

module.exports = ({ VimeoService }) => {
  const actions = {
    startRecording(request, reply) {
      reply.proxy({
        host,
        port,
        passThrough: true
      });
    },

    stopRecording(request, reply) {
      const videoPath = request.query.outputFile;
      reply.proxy({
        host,
        port,
        passThrough: true,
        onResponse(err, res, request, reply, settings, ttl) {
          Wreck.read(res, { json: true }, (err, payload) => {
            const replyOnce = _.once(reply);
            const onResponse = (err, body, status, headers) => {
              if(err) {
                return replyOnce(err);
              }
              logger.info('onResponse from upload:', err, body, headers);
            };
            const onProgress = (uploaded_size, file_size) => {
              replyOnce(payload);
              Math.round((uploaded_size / file_size) * 100);
            };
            VimeoService.upload(`${config.videos.src}/${videoPath}`, onResponse, onProgress);
          });
        }
      });
    }
  };

  return {
    default(request, reply) {
      const fAction = actions[request.query.action];
      if (!fAction) {
        return reply(Boom.badRequest(`please provide as parameter one of the following actions: ${_.keys(actions).join(', ')}`));
      }
      fAction(request, reply);
    }
  };
}
