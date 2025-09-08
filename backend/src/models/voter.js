const mongoose = require("mongoose");

const VoterSchema = new mongoose.Schema(
  {
    matricule: { type: String, required: true, trim: true, unique: true },
    nom: { type: String, required: true, trim: true },
    prenom: { type: String, required: true, trim: true },
    classe: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

module.exports = (db) => {
  if (!db || !db.models) {
    throw new Error("La connexion MongoDB pour Voter n'est pas définie !");
  }
  return db.models.Voter || db.model("Voter", VoterSchema);
};
