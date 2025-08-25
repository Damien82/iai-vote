const mongoose = require("mongoose");

const SystemSchema = new mongoose.Schema({
  isActive: { type: Boolean, default: false },
});

// Fonction qui retourne le modèle avec la bonne connexion
module.exports = (db_status) => {
  if (!db_status) {
    throw new Error("❌ db_status n’a pas été fourni à SystemState.js");
  }
  return db_status.models.status || db_status.model("status", SystemSchema);
};
