'use strict';

// Export des Routes
module.exports = (server, handlers) => {

  server.route({
    method: 'GET',
    path: '/videos/stats',
    config: {
      description: 'routes to get all videos stats',
      notes: ['api'],
      tags: ['api'],
      handler: handlers.videos.getStats,
    }
  });
}

