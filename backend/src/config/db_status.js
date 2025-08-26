const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = () => {

  const mainConnection = mongoose.createConnection(process.env.DB_URI_PAGESTATUS);

  mainConnection.on("connected", () => {
    console.log("Connexion base principale établie");
  });

  mainConnection.on("error", (err) => {
    console.error("Erreur connexion base principale :", err);
  });

  return {mainConnection };
};

module.exports = connectDB;

