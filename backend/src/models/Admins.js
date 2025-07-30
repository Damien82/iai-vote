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
  });

  return db_admin.model("Admins", AdminSchema);
};
