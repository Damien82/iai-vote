module.exports = (connection) => {
  if (!connection) {
    throw new Error("Connexion à la base manquante !");
  }

  if (connection.models.status) {
    return connection.models.status;
  }

  const mongoose = require("mongoose");

  const SystemSchema = new mongoose.Schema({
    isActive: { type: Boolean, default: false },
  });

  return connection.model("status", SystemSchema);
};
