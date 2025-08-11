module.exports = (db_superadmin) => {
  if (db_superadmin.models.Admins) {
    return db_superadmin.models.Admins;
  }

  const mongoose = require("mongoose");

  const superAdminSchema = new mongoose.Schema({
    matricule: { type: String, required: true, unique: true },
    nom: { type: String, required: true },
    prenom: { type: String, required: true },
    classe: { type: String, required: true },
    motDePasse: { type: String, required: true },
  });

  return db_admin.model("Admins", superAdminSchema);
};
