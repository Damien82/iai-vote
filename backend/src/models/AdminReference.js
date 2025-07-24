module.exports = (db_admin) => {
  const mongoose = require("mongoose");

  const AdminSchema = new mongoose.Schema({
    matricule: { type: String, required: true, unique: true },
    nom: String,
    prenom: String,
  });

  return db_admin.model("AdminReference", AdminSchemaSchema, "allowed");
};
