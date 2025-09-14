const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = () => {

  const votersConnection = mongoose.createConnection(process.env.DB_URI_VOTERS);

  votersConnection.on("connected", () => {
    console.log("Connexion base principale établie");
  });

  votersConnection.on("error", (err) => {
    console.error("Erreur connexion base principale :", err);
  });

  return {votersConnection };
};

module.exports = connectDB;
