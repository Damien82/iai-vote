// controllers/userController.js
const jwt = require('jsonwebtoken');
const User = require('../models/Admins'); // modèle user

const getProfile = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ error: "Token manquant" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ matricule: decoded.matricule }).select("-password");
    if (!user) return res.status(404).json({ error: "Utilisateur non trouvé" });

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: "Erreur serveur" });
  }
};


const changePassword = async (req, res) => {
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

module.exports = { getProfile, changePassword };
