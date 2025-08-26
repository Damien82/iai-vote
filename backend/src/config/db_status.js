// config/db_status.js
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const mainConnection = mongoose.createConnection(process.env.DB_URI_PAGESTATUS, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mainConnection.on("connected", () => {
  console.log("Connexion base principale établie");
});

mainConnection.on("error", (err) => {
  console.error("Erreur connexion base principale :", err);
});

module.exports = mainConnection;
