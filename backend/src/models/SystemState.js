// Exemple avec une connexion spécifique
module.exports = (db_status) => {
    const mongoose = require("mongoose");
  const SystemSchema = new mongoose.Schema({
    isActive: { type: Boolean, default: false },
  });
  return db_status.models.status || db_status.model("status", SystemSchema);
};
