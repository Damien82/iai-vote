module.exports = (db) => {
  const mongoose = require("mongoose");

  const EtudiantSchema = new mongoose.Schema({
    matricule: { type: String, required: true, unique: true },
    nom: String,
    prenom: String,
  });

  return db.model("EtudiantReference", EtudiantSchema, "allowed");
};
