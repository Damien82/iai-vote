module.exports = (db) => {
  const mongoose = require("mongoose");

  const AdminSchema = new mongoose.Schema({
    matricule: { type: String, required: true, unique: true },
    nom: String,
    prenom: String,
  });

  return db.model("AdminReference", AdminSchemaSchema, "allowed");
};
