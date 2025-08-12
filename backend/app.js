require("dotenv").config();

console.log("DB_URI_ACCES_USERS =", process.env.DB_URI_ACCES_USERS);
console.log("DB_URI_REGISTERED_USERS =", process.env.DB_URI_REGISTERED_USERS);
console.log("DB_URI_ACCES_ADMINS =", process.env.DB_URI_ACCES_ADMINS);
console.log("DB_URI_REGISTERED_ADMINS =", process.env.DB_URI_REGISTERED_ADMINS);
console.log("DB_URI_REGISTERED_SUPERADMINS =", process.env.DB_URI_REGISTERED_SUPERADMINS);

const express = require("express");
const connectDB = require("./src/config/db");
const connectDB2 = require("./src/config/db_admin");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./src/routes/authRoutes");
const authRoutes_admin = require("./src/routes/authRoutes_admin");
const verifyAdminRoute = require("./src/routes/adminRoutes");
const verifyUserRoute = require("./src/routes/userRoutes");
const partisRoutes = require('./src/routes/partiRoutes');

const authMiddleware = require("./src/middlewares/authMiddleware_supadmin");
const { changePassword } = require("./src/controllers/authController_superadmin");

const userRoutes = require("./src/routes/user");
const userlisteRoutes = require( "./src/routes/userlisteRoute");
const adminlisteRoutes = require( "./src/routes/AdminlisteRoute");
const usersRoutes2 = require('./src/routes/userlisteRoute'); 
const superAdminRoutes2 = require('./src/routes/authRoutes_superadmin'); 
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: [
    'http://localhost:5173',           // pour le dev local
    'http://192.168.1.165:5173',
    'https://iai-vote-v12.vercel.app'  // pour le frontend en ligne
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));


app.use(express.json());

// Connexion à la base `acces_users`
const accesUsersDB = mongoose.createConnection(process.env.DB_URI_ACCES_USERS);
accesUsersDB.on("connected", () => console.log("Connexion à acces_users OK"));
accesUsersDB.on("error", (err) => console.error("Erreur acces_users :", err));

// Connexion à la base `acces_admins`
const accesAdminsDB = mongoose.createConnection(process.env.DB_URI_ACCES_ADMINS);
accesAdminsDB.on("connected", () => console.log("Connexion à acces_admins OK"));
accesAdminsDB.on("error", (err) => console.error("Erreur acces_admins :", err));

// Connexion à la base `registered_users`
const registeredUsersDB = mongoose.createConnection(process.env.DB_URI_REGISTERED_USERS);
registeredUsersDB.on("connected", () => console.log("Connexion à registered_users OK"));
registeredUsersDB.on("error", (err) => console.error("Erreur registered_users :", err));

// Connexion à la base `registered_admins`
const registeredAdminsDB = mongoose.createConnection(process.env.DB_URI_REGISTERED_ADMINS);
registeredAdminsDB.on("connected", () => console.log("Connexion à registered_Admins OK"));
registeredAdminsDB.on("error", (err) => console.error("Erreur registered_Admins :", err));

// Connexion à la base `registered_superadmins`
const registeredSuperAdminsDB = mongoose.createConnection(process.env.DB_URI_REGISTERED_SUPERADMINS);
registeredSuperAdminsDB.on("connected", () => console.log("Connexion à registered_SuperAdmins OK"));
registeredSuperAdminsDB.on("error", (err) => console.error("Erreur registered_SuperAdmins :", err));

// Connexion à la base `partis`
const partisDB = mongoose.createConnection(process.env.DB_URI_PARTIS);
partisDB.on("connected", () => console.log("Connexion à partis OK"));
partisDB.on("error", (err) => console.error("Erreur partis :", err));

// Injection des connexions dans `req.db`
app.use((req, res, next) => {
  req.db = {
    accesUsers: accesUsersDB,
    registeredUsers: registeredUsersDB,
  };
  req.db_admin = {
    accesAdmins: accesAdminsDB,
    registeredAdmins: registeredAdminsDB
  };
  req.db_superadmin = {
    registeredSuperAdmins: registeredSuperAdminsDB
  };
    req.db_partis = {
    partis: partisDB
  };
  next();
});

connectDB();
connectDB2();


// Routes
app.use("/api/auth", authRoutes);
app.use("/api/authAdmin", authRoutes_admin);
app.use("/api", verifyAdminRoute);
app.use("/api", verifyUserRoute);
app.use('/api/partis', partisRoutes);
app.use("/api/users", userRoutes);
app.use("/api/listeusers", userlisteRoutes)
app.use("/api/listeadmin", adminlisteRoutes)
app.use('/api/users', usersRoutes2);
app.use('/api/admins', adminlisteRoutes);
app.use('/api/admins', superAdminRoutes2);


app.post('/api', authMiddleware, changePassword);

// ⛔ Gestion des erreurs Multer
const errorHandler = require("./src/middlewares/errorHandler");
app.use(errorHandler);

// Lancement du serveur
app.listen(PORT, () => {
  console.log(`🚀 Serveur backend lancé sur le port ${PORT}`);
});
