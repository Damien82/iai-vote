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
    validate: {
      validator: function (v) {
        return /^[A-Za-z0-9\s-]*$/.test(v); // Regex : lettres & chiffres, min 3 max 30
      },
      message: props => `${props.value} n'est pas une réponse valide !`
    }
  }
});

  return db.model("User", UserSchema);
};
