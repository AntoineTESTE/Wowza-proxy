'use strict';

// Export des Routes
module.exports = (server, handlers) => {

  server.route({
    method: 'GET',
    path: '/videos/stats',
    config: {
      description: 'routes for start and stop recording',
      notes: ['api'],
      tags: ['api'],
      handler: handlers.videos.getStats,
    }
  });
}

