const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const connectDB = () => {
  const db_voters = mongoose.createConnection(process.env.DB_URI_VOTERS);

  db_voters.on("connected", () => console.log("✅ Connexion base votants établie"));
  db_voters.on("error", (err) => console.error("❌ Erreur base votants:", err));

  return { db_voters };
};

module.exports = connectDB();
