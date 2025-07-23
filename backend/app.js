require("dotenv").config();

console.log("DB_URI_ACCES_USERS =", process.env.DB_URI_ACCES_USERS);
console.log("DB_URI_REGISTERED_USERS =", process.env.DB_URI_REGISTERED_USERS);

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./src/routes/authRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connexion à la base `acces_users`
const accesUsersDB = mongoose.createConnection(process.env.DB_URI_ACCES_USERS);
accesUsersDB.on("connected", () => console.log("Connexion à acces_users OK"));
accesUsersDB.on("error", (err) => console.error("Erreur acces_users :", err));

// Connexion à la base `registered_users`
const registeredUsersDB = mongoose.createConnection(process.env.DB_URI_REGISTERED_USERS);
registeredUsersDB.on("connected", () => console.log("Connexion à registered_users OK"));
registeredUsersDB.on("error", (err) => console.error("Erreur registered_users :", err));

// Injection des connexions dans `req.db`
app.use((req, res, next) => {
  req.db = {
    accesUsers: accesUsersDB,
    registeredUsers: registeredUsersDB,
  };
  next();
});

// Routes
app.use("/api/auth", authRoutes);

// Lancement du serveur
app.listen(PORT, () => {
  console.log(`🚀 Serveur backend lancé sur le port ${PORT}`);
});
