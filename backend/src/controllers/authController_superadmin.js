const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "tonSecretJwtIci";

// === ROUTE: POST /api/auth/loginSuperAdmin ===
exports.loginSuperAdmin = async (req, res) => {
  const { matricule, motDePasse } = req.body;

  try {
    // Import dynamique lié à la connexion superadmin
    const SuperAdmin = require("../models/SuperAdmin")(req.db_superadmin.registeredSuperAdmins);

    const admin = await SuperAdmin.findOne({ matricule });

    if (!admin) {
      return res.status(404).json({ error: "SuperAdmin non trouvé" });
    }

    const isMatch = await bcrypt.compare(motDePasse, admin.motDePasse);
    if (!isMatch) {
      return res.status(401).json({ error: "Mot de passe incorrect" });
    }

    const token = jwt.sign(
      { matricule: admin.matricule, role: "superadmin" },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ message: "Connexion réussie", token });
  } catch (err) {
    console.error("Erreur login superadmin :", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

// === ROUTE: POST /api/auth/verify-superadmin ===
exports.verifySuperAdmin = async (req, res) => {
  const { matricule } = req.body;
  if (!matricule) return res.status(400).json({ message: "Matricule requis" });

  // déplacer ici aussi
  const Admin = require("../models/SuperAdmin")(req.db_superadmin.registeredSuperAdmins);

  try {
    const admin = await Admin.findOne({ matricule });

    if (!admin) {
      return res.status(403).json({ message: "Accès refusé" });
    }

    return res.status(200).json({ message: "Admin confirmé" });
  } catch (err) {
    console.error("Erreur de vérification admin :", err);
    return res.status(500).json({ message: "Erreur serveur" });
  }
};
