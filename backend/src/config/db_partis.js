const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = () => {
  const refConnection = mongoose.createConnection(process.env.DB_URI_PARTIS, {
    // options actuelles de mongoose 8+ (plus besoin useNewUrlParser etc)
  });

  refConnection.on("connected", () => {
    console.log("Connexion base référence établie");
  });

  refConnection.on("error", (err) => {
    console.error("Erreur connexion base référence :", err);
  });
};

module.exports = connectDB;
