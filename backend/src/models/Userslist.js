module.exports = (db) => {
  if (db.models.User) {
    return db.models.User;
  }

  const mongoose = require("mongoose");

  const UserSchema = new mongoose.Schema({
    matricule: { type: String, required: true, unique: true },
    nom: { type: String, required: true },
    prenom: { type: String, required: true },
    classe: { type: String, required: true },
  });

  return db.model("User", UserSchema);
};
