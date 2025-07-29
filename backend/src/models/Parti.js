const mongoose = require('mongoose');

const PartiSchema = new mongoose.Schema({
  nom: { type: String, required: true, trim: true },
  proprietaire: { type: String, required: true, trim: true },
  imageUrl: { type: String, required: true },
  imagePublicId: { type: String, required: true },
});

// Cette fonction vérifie si le modèle existe déjà dans la connexion personnalisée
module.exports = (db_partis) => {
  return db_partis.models.PartiInfos || db_partis.model('PartiInfos', PartiSchema);
};
