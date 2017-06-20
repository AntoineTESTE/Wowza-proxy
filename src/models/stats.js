'use strict';

module.exports = function (mongoose) {

    // Creation du schema (table)
    const statsSchema = mongoose.Schema({
        name: String,
        uploadedAt: Date,
        uploadDuration: Date,
        status: String
    });

    // retour du modèle 'stats' basé sur le schéma
    return mongoose.model('VideoStatsModel', statsSchema);
}




