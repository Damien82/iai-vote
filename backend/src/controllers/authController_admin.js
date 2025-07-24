const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "tonSecretJwtIci";

// === ROUTE: POST /api/auth/register ===
exports.registerAdmin = async (req, res) => {
  const { matricule, nom, prenom, classe, motDePasse } = req.body;

  const AllowedAdmin = require("../models/AdminReference")(req.db.accesAdmins);
  const Admin = require("../models/Admins")(req.db.registeredAdmins);

  try {
    const allowedAdmin = await AllowedAdmin.findOne({ matricule });
    if (!allowedAdmin) {
      return res.status(403).json({ message: "Matricule non autorisé." });
    }

    const existingAdmin = await User.findOne({ matricule });
    if (existingAdmin) {
      return res.status(400).json({ message: "Utilisateur déjà inscrit." });
    }

    const hashedPassword = await bcrypt.hash(motDePasse, 10);

    const newAdmin = new Admin({
      matricule,
      nom,
      prenom,
      classe,
      motDePasse: hashedPassword,
    });

    await newAdmin.save();

    const token = jwt.sign(
      { matricule, nom, prenom },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(201).json({ message: "Inscription réussie", token });
  } catch (err) {
    console.error("Erreur serveur :", err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// === ROUTE: POST /api/auth/login ===
exports.loginAdmin = async (req, res) => {
  const { matricule, motDePasse } = req.body;

  const Admin = require("../models/Admins")(req.db.registeredAdmins);

  try {
    const Admin = await Admin.findOne({ matricule });
    if (!Admin) {
      return res.status(401).json({ message: "Matricule ou mot de passe incorrect." });
    }

    const isMatch = await bcrypt.compare(motDePasse, Admin.motDePasse);
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
