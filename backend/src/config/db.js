const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = () => {
  const refConnection = mongoose.createConnection(process.env.DB_URI_ACCES_USERS, {
    // options actuelles de mongoose 8+ (plus besoin useNewUrlParser etc)
  });

  refConnection.on("connected", () => {
    console.log("Connexion base référence établie");
  });

  refConnection.on("error", (err) => {
    console.error("Erreur connexion base référence :", err);
  });

  const mainConnection = mongoose.createConnection(process.env.DB_URI_REGISTERED_USERS);

  mainConnection.on("connected", () => {
    console.log("Connexion base principale établie");
  });

  mainConnection.on("error", (err) => {
    console.error("Erreur connexion base principale :", err);
  });

  return { refConnection, mainConnection };
};

module.exports = connectDB;
