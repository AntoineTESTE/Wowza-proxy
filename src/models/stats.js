// Modèle de schema Mongoose d'une stat

'use strict';

module.exports = function (mongoose) {

  // Creation du schema (table)
  const statsSchema = mongoose.Schema({
    name: String,
    uploadedAt: Date,
    uploadDuration: Number,
    status: String,
    url: String,
    uploadedSize: Number,
    fileSize: Number
  });

  // retour du modèle 'stats' basé sur le schéma
  return mongoose.model('VideoStats', statsSchema);
}
