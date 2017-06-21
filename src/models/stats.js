'use strict';

module.exports = function(mongoose) {

  // Creation du schema (table)
  const statsSchema = mongoose.Schema({
    name: String,
    uploadedAt: Date,
    uploadDuration: Number, // in ms
    status: String
  });

  // retour du modèle 'stats' basé sur le schéma
  return mongoose.model('VideoStats', statsSchema);
}
