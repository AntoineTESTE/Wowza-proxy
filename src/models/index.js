'use strict';

//require de mongoose
const mongoose = require('mongoose');

// Connexion à la base Mongo
mongoose.connect(config.mongodb.connectionString);
// En cas d'erreur
mongoose.connection.on('error', function(err) {
  console.error(`MongoDB Connection Error: ${err}`);
  process.exit(1);
});

// Exportation du modèle VideoStat
module.exports = () => {
  return {
    VideoStats: require('./stats')(mongoose)
  }
}
