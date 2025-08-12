const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "tonSecretJwtIci";

// Utilitaire pour renvoyer erreur et logger plus proprement
const respondServerError = (res, err, context = "") => {
  console.error("SERVER ERROR", context, err);
  return res.status(500).json({ error: "Erreur serveur", details: err?.message || String(err) });
};

exports.loginSuperAdmin = async (req, res) => {
  const { matricule, motDePasse } = req.body;

  console.log("loginSuperAdmin called", { matricule: matricule ? "[RECEIVED]" : "[MISSING]" });

  if (!matricule || !motDePasse) {
    return res.status(400).json({ error: "Matricule et mot de passe sont requis" });
  }

  try {
    if (!req.db_superadmin) {
      console.error("req.db_superadmin undefined");
      return res.status(500).json({ error: "Connexion superadmin introuvable" });
    }

    const registeredCollection = req.db_superadmin.registeredSuperAdmins || req.db_superadmin;
    if (!registeredCollection) {
      console.error("registeredSuperAdmins introuvable sur req.db_superadmin :", Object.keys(req.db_superadmin));
      return res.status(500).json({ error: "Collection superadmin introuvable" });
    }

    let SuperAdmin;
    try {
      const createSuperAdmin = require("../models/SuperAdmin");
      if (typeof createSuperAdmin !== "function") {
        console.error("models/SuperAdmin n'exporte pas une fonction");
        return res.status(500).json({ error: "Erreur modèle SuperAdmin mal configuré" });
      }
      SuperAdmin = createSuperAdmin(registeredCollection);
    } catch (errModel) {
      return respondServerError(res, errModel, "load model");
    }

    // On cherche l'admin
    const admin = await SuperAdmin.findOne({ matricule }).lean();

    // On combine la vérification matricule + mot de passe ici
    if (!admin || !(await bcrypt.compare(motDePasse, admin.motDePasse || ""))) {
      return res.status(401).json({ error: "Matricule ou mot de passe incorrect" });
    }

    const payload = { matricule: admin.matricule, nom: admin.nom, prenom: admin.prenom };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });

    return res.status(200).json({ message: "Connexion réussie", token });

  } catch (err) {
    return respondServerError(res, err, "loginSuperAdmin");
  }
};

exports.verifySuperAdmin = async (req, res) => {
  const { matricule } = req.body;
  if (!matricule) return res.status(400).json({ message: "Matricule requis" });

  try {
    if (!req.db_superadmin) {
      console.error("req.db_superadmin undefined (verify)");
      return res.status(500).json({ message: "Connexion superadmin introuvable" });
    }

    const registeredCollection = req.db_superadmin.registeredSuperAdmins || req.db_superadmin;
    const createSuperAdmin = require("../models/SuperAdmin");
    if (typeof createSuperAdmin !== "function") {
      console.error("models/SuperAdmin n'exporte pas une fonction (verify).");
      return res.status(500).json({ message: "Erreur modèle SuperAdmin" });
    }
    const Admin = createSuperAdmin(registeredCollection);

    const admin = await Admin.findOne({ matricule }).lean();
    if (!admin) {
      return res.status(403).json({ message: "Accès refusé" });
    }

    return res.status(200).json({ message: "Admin confirmé" });
  } catch (err) {
    console.error("Erreur de vérification admin :", err);
    return res.status(500).json({ message: "Erreur serveur", details: err?.message });
  }
};
