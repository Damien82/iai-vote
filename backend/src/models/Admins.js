module.exports = (db_admin) => {
  if (db_admin.models.Admins) {
    return db_admin.models.Admins;
  }

  const mongoose = require("mongoose");

  const AdminSchema = new mongoose.Schema({
    matricule: { type: String, required: true, unique: true },
    nom: { type: String, required: true },
    prenom: { type: String, required: true },
    classe: { type: String, required: true },
    motDePasse: { type: String, required: true },
    questiondesecurite: { 
    type: String, 
    enum: [
      "Quel est le prénom de votre mère ?",
      "Quel est le nom de votre premier animal ?",
      "Quelle est votre ville de naissance ?",
      "Quel est le nom de votre meilleur ami d’enfance ?"
    ],
    required: true
  },
  reponsedesecurite: {
    type: String,
    required: true,
  }
  });

  return db_admin.model("Admins", AdminSchema);
};
