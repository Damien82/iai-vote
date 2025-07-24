module.exports = (db) => {
  if (db.models.Admin) {
    return db.models.Admin;
  }

  const mongoose = require("mongoose");

  const AdminSchema = new mongoose.Schema({
    matricule: { type: String, required: true, unique: true },
    nom: { type: String, required: true },
    prenom: { type: String, required: true },
    classe: { type: String, required: true },
    motDePasse: { type: String, required: true },
  });

  return db.model("Admin", AdminSchemaSchema);
};
