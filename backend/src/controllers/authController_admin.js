const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "tonSecretJwtIci";

// === ROUTE: POST /api/auth/register ===
exports.registerAdmin = async (req, res) => {
  const { matricule, nom, prenom, classe, motDePasse } = req.body;

  const AllowedAdmin = require("../models/AdminReference")(req.db_admin.accesAdmins);
  const Admin = require("../models/Admins")(req.db_admin.registeredAdmins);

  try {
    const allowedAdmin = await AllowedAdmin.findOne({ matricule });
    if (!allowedAdmin) {
      return res.status(403).json({ message: "Matricule non autorisé." });
    }

    const existingAdmin = await Admin.findOne({ matricule });
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

  const Admin = require("../models/Admins")(req.db_admin.registeredAdmins);

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
exports.verifyAdmin = async (req, res) => {
  const { matricule } = req.body;
  if (!matricule) return res.status(400).json({ message: "Matricule requis" });

  const Admin = require("../models/Admins")(req.db_admin.registeredAdmins);

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

exports.changePassword = async (req, res) => {
  try {
    const userId = req.user.id;
    const { ancienMotDePasse, nouveauMotDePasse } = req.body;

    // Validation simple
    if (!ancienMotDePasse || !nouveauMotDePasse) {
      return res.status(400).json({ message: "Tous les champs sont obligatoires." });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "Utilisateur non trouvé." });

    // Vérification ancien mot de passe
    const isMatch = await bcrypt.compare(ancienMotDePasse, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Ancien mot de passe incorrect." });
    }

    // Hash du nouveau mot de passe
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(nouveauMotDePasse, salt);

    await user.save();

    res.status(200).json({ message: "Mot de passe modifié avec succès." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur." });
  }
};

