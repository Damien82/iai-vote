module.exports = (db_partis) => {
  if (db_partis.models.PartisInfos) {
    return db_partis.models.PartisInfos;
  }

  const mongoose = require('mongoose');

  const PartiSchema = new mongoose.Schema({
    nom: { type: String, required: true, trim: true },
    proprietaire: { type: String, required: true, trim: true },
    imageUrl: { type: String, required: true },
  });

  return db_partis.model('PartiInfos', PartiSchema);
};
