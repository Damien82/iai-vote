const jwt = require("jsonwebtoken");
const AdminModel = require("../models/Admins");
const SuperAdminModel = require("../models/SuperAdmin");
const UserModel = require("../models/Users");

const SECRET = process.env.JWT_SECRET || "votre_jwt_secret";

// Middleware pour vérifier l'accès admin
function isAdmin(req, res, next) {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.status(401).json({ message: "Token manquant" });

  const token = authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Token mal formaté" });

  try {
    const decoded = jwt.verify(token, SECRET);
    const matricule = decoded.matricule;

    AdminModel.findOne({ matricule })
      .then((admin) => {
        if (!admin) return res.status(403).json({ message: "Accès refusé : admin uniquement" });
        req.admin = decoded;
        next();
      })
      .catch((err) =>
        res.status(500).json({ message: "Erreur serveur admin", error: err.message })
      );
  } catch {
    return res.status(403).json({ message: "Token invalide ou expiré" });
  }
}


// Middleware pour vérifier l'accès super admin
function isSuperAdmin(req, res, next) {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.status(401).json({ message: "Token manquant" });

  const token = authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Token mal formaté" });

  try {
    const decoded = jwt.verify(token, SECRET);
    const matricule = decoded.matricule;

    SuperAdminModel.findOne({ matricule })
      .then((admin) => {
        if (!admin) return res.status(403).json({ message: "Accès refusé : admin uniquement" });
        req.admin = decoded;
        next();
      })
      .catch((err) =>
        res.status(500).json({ message: "Erreur serveur admin", error: err.message })
      );
  } catch {
    return res.status(403).json({ message: "Token invalide ou expiré" });
  }
}

// Middleware pour vérifier l'accès user simple
function isUser(req, res, next) {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.status(401).json({ message: "Token manquant" });

  const token = authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Token mal formaté" });

  try {
    const decoded = jwt.verify(token, SECRET);
    const matricule = decoded.matricule;

    UserModel.findOne({ matricule })
      .then((user) => {
        if (!user) return res.status(403).json({ message: "Accès refusé : utilisateur uniquement" });
        req.user = decoded;
        next();
      })
      .catch((err) =>
        res.status(500).json({ message: "Erreur serveur user", error: err.message })
      );
  } catch {
    return res.status(403).json({ message: "Token invalide ou expiré" });
  }
}

module.exports = {
  isAdmin,
  isUser,
  isSuperAdmin,
};
