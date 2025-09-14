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

// Cette fonction vérifie si le modèle existe déjà dans la connexion personnalisée
module.exports = (db_voter) => {
  return db_voter.models.votercollection || db_voter.model("votercollection", VoterSchema);
};
