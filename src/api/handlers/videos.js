// Gestionnaire de stats (appel au modèle VideoStats)

'use strict';

module.exports = (models) => {

  return {
    getStats(request, reply) {
      models.VideoStats.find({}, (err, stats) => {
        reply(err || stats);
      })
    }
  }
};
