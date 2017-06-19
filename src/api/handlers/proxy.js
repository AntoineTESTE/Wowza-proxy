'use strict';

const Wreck = require('wreck');
const { host, port } = config.wowza;
const



const actions = {
  startRecording(request, reply) {
    reply.proxy({
      host,
      port,
      passThrough: true
    });
  },


  stopRecording(request, reply) {
    reply.proxy({
      host,
      port,
      passThrough: true,
      onResponse(err, res, request, reply, settings, ttl) {
        Wreck.read(res, { json: true }, (err, payload) => {
          const onResponse = (err, body, status, headers) => {
            if (err) {
              return console.log(err);
            }
            console.log(status);
            console.log(headers.location);
            reply();
          };

          const onProgress = (uploaded_size, file_size) => {
            var percentage = Math.round((uploaded_size / file_size) * 100);
          };

          upload(__dirname + './${videoPath}', onResponse, onProgress);

        });
      }
    });
  }
}


module.exports = () => {
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
