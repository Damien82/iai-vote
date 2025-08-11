const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "tonSecretJwtIci";


// === ROUTE: POST /api/auth/login ===
exports.loginSuperAdmin = async (req, res) => {
  const { matricule, motDePasse } = req.body;

  const Admin = require("../models/SuperAdmin")(req.db_superadmin.registeredSuperAdmins);

  try {
    const admin = await Admin.findOne({ matricule });
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

    res.status(200).json({ message: "Connexion réussie", token });
  } catch (err) {
    console.error("Erreur serveur lors du login :", err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

//== ROUTE:POST /api/verifyAdmin ====
exports.verifysuperAdmin = async (req, res) => {
  const { matricule } = req.body;
  if (!matricule) return res.status(400).json({ message: "Matricule requis" });

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

