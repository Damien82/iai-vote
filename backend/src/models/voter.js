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

// Ici on force le nom de la collection à 'votercollection'
module.exports = (db_voter) => {
  if (!db_voter) throw new Error("Connexion MongoDB pour Voter non définie !");
  return db_voter.models.Voter || db_voter.model("Voter", VoterSchema, "votercollection");
};
