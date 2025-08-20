module.exports = (db_status) => {
  const connection = db_status.mainConnection; // <-- utiliser la vraie connexion

  if (connection.models.status) {
    return connection.models.status;
  }

  const mongoose = require("mongoose");

  const SystemSchema = new mongoose.Schema({
    isActive: { type: Boolean, default: false },
  });

  return connection.model("status", SystemSchema);
};
