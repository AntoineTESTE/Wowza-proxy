'use strict';

const Wreck = require('wreck');
const { host, port } = config.wowza;
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
          reply(payload).headers = res.headers;
        });
      }
    });
  }
};

module.exports = () => {
  return {
    default (request, reply) {
      const fAction = actions[request.query.action];
      if (!fAction) {
        return reply(Boom.badRequest(`please provide as parameter one of the following actions: ${_.keys(actions).join(', ')}`));
      }
      fAction(request, reply);
    }
  };
}
