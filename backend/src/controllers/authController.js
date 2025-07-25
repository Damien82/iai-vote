const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "tonSecretJwtIci";

// === ROUTE: POST /api/auth/register ===
exports.register = async (req, res) => {
  const { matricule, nom, prenom, classe, motDePasse } = req.body;

  const AllowedUser = require("../models/EtudiantReference")(req.db.accesUsers);
  const User = require("../models/Users")(req.db.registeredUsers);

  try {
    const allowedUser = await AllowedUser.findOne({ matricule });
    if (!allowedUser) {
      return res.status(403).json({ message: "Matricule non autorisé." });
    }

    const existingUser = await User.findOne({ matricule });
    if (existingUser) {
      return res.status(400).json({ message: "Utilisateur déjà inscrit." });
    }

    const hashedPassword = await bcrypt.hash(motDePasse, 10);

    const newUser = new User({
      matricule,
      nom,
      prenom,
      classe,
      motDePasse: hashedPassword,
    });

    await newUser.save();

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
exports.login = async (req, res) => {
  const { matricule, motDePasse } = req.body;

  const User = require("../models/Users")(req.db.registeredUsers);

  try {
    const user = await User.findOne({ matricule });
    if (!user) {
      return res.status(401).json({ message: "Matricule ou mot de passe incorrect." });
    }

    const isMatch = await bcrypt.compare(motDePasse, user.motDePasse);
    if (!isMatch) {
      return res.status(401).json({ message: "Matricule ou mot de passe incorrect." });
    }

    const token = jwt.sign(
      { matricule: user.matricule, nom: user.nom, prenom: user.prenom },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({ message: "Connexion réussie", token });
  } catch (err) {
    console.error("Erreur serveur lors du login :", err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

//== ROUTE:POST /api/verifyUser ====
exports.verifyUser = async (req, res) => {
  const { matricule } = req.body;
  if (!matricule) return res.status(400).json({ message: "Matricule requis" });

  const User = require("../models/Users")(req.db.registeredUsers);

  try {
    const user = await User.findOne({ matricule });

    if (!user) {
      return res.status(403).json({ message: "Accès refusé" });
    }

    return res.status(200).json({ message: "Utilisateur confirmé" });
  } catch (err) {
    console.error("Erreur de vérification utilisateur :", err);
    return res.status(500).json({ message: "Erreur serveur" });
  }
};
