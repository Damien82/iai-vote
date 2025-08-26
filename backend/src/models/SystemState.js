const mongoose = require("mongoose");
const mainConnection = require("../config/db_status");

const SystemSchema = new mongoose.Schema({
  isActive: { type: Boolean, default: false },
});

// Fonction qui retourne le modèle avec la bonne connexion
module.exports =
  mainConnection.models.status ||
  mainConnection.model("status", SystemSchema);