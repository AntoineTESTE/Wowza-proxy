// Routes Wowza

'use strict';

// Export des Routes
module.exports = (server, handlers) => {
  //Add the route to Start record
  server.route({
    method: 'GET',
    path: '/livestreamrecord',
    config: {
      description: 'routes for start and stop recording',
      notes: ['api'],
      tags: ['api'],
      handler: handlers.proxy.default,
    }
  });
}

