const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "tonSecretJwtIci";

// === ROUTE: POST /api/auth/loginSuperAdmin ===
exports.loginSuperAdmin = async (req, res) => {
  const { matricule, motDePasse } = req.body;

  if (!matricule || !motDePasse) {
    return res.status(400).json({ message: "Matricule et mot de passe sont requis." });
  }

  try {
    if (!req.db_superadmin) {
      console.error("req.db_superadmin undefined");
      return res.status(500).json({ message: "Connexion superadmin introuvable." });
    }

    const registeredCollection = req.db_superadmin.registeredSuperAdmins || req.db_superadmin;
    if (!registeredCollection) {
      console.error("registeredSuperAdmins introuvable sur req.db_superadmin :", Object.keys(req.db_superadmin));
      return res.status(500).json({ message: "Collection superadmin introuvable." });
    }

    const createSuperAdmin = require("../models/SuperAdmin");
    if (typeof createSuperAdmin !== "function") {
      console.error("models/SuperAdmin n'exporte pas une fonction");
      return res.status(500).json({ message: "Erreur modèle SuperAdmin mal configuré." });
    }
    const SuperAdmin = createSuperAdmin(registeredCollection);

    const admin = await SuperAdmin.findOne({ matricule });
    if (!admin) {
      return res.status(401).json({ message: "Matricule ou mot de passe incorrect." });
    }

    const isMatch = await bcrypt.compare(motDePasse, admin.motDePasse);
    if (!isMatch) {
      return res.status(401).json({ message: "Matricule ou mot de passe incorrect." });
    }

    const token = jwt.sign(
      { matricule: admin.matricule, nom: admin.nom, prenom: admin.prenom },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.status(200).json({ message: "Connexion réussie", token });
  } catch (err) {
    console.error("Erreur serveur lors du login superadmin :", err);
    return res.status(500).json({ message: "Erreur serveur." });
  }
};

// === ROUTE: POST /api/auth/verify-superadmin ===
exports.verifySuperAdmin = async (req, res) => {
  const { matricule } = req.body;
  if (!matricule) return res.status(400).json({ message: "Matricule requis." });

  try {
    if (!req.db_superadmin) {
      console.error("req.db_superadmin undefined (verify)");
      return res.status(500).json({ message: "Connexion superadmin introuvable." });
    }

    const registeredCollection = req.db_superadmin.registeredSuperAdmins || req.db_superadmin;
    const createSuperAdmin = require("../models/SuperAdmin");
    if (typeof createSuperAdmin !== "function") {
      console.error("models/SuperAdmin n'exporte pas une fonction (verify).");
      return res.status(500).json({ message: "Erreur modèle SuperAdmin." });
    }
    const Admin = createSuperAdmin(registeredCollection);

    const admin = await Admin.findOne({ matricule });
    if (!admin) {
      return res.status(403).json({ message: "Accès refusé." });
    }

    return res.status(200).json({ message: "Admin confirmé." });
  } catch (err) {
    console.error("Erreur de vérification superadmin :", err);
    return res.status(500).json({ message: "Erreur serveur." });
  }
};

exports.changePasswordsup = async (req, res) => {
  const { ancienMotDePasse, nouveauMotDePasse } = req.body;
  const matricule = req.matricule;  // récupéré du token via middleware

  if (!matricule || !ancienMotDePasse || !nouveauMotDePasse) {
    return res.status(400).json({ message: 'Tous les champs sont obligatoires.' });
  }

  const Admin = require('../models/SuperAdmin')(req.db_superadmin.registeredSuperAdmins);

  try {
    const admin = await Admin.findOne({ matricule });
    if (!admin) {
      return res.status(404).json({ message: "Administrateur introuvable." });
    }

    const isMatch = await bcrypt.compare(ancienMotDePasse, admin.motDePasse);
    if (!isMatch) {
      return res.status(401).json({ message: "Ancien mot de passe incorrect." });
    }

    const hashedPassword = await bcrypt.hash(nouveauMotDePasse, 10);
    admin.motDePasse = hashedPassword;

    await admin.save();

    res.status(200).json({ message: "Mot de passe changé avec succès." });
  } catch (err) {
    console.error('Erreur lors du changement de mot de passe :', err);
    res.status(500).json({ message: 'Erreur serveur.' });
  }
};