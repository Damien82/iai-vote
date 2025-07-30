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
module.exports = { getProfile };
