const bcrypt = require('bcryptjs');
const connectUsersDB = require('../config/db');
const UserModelFn = require('../models/Userslist'); // ou EtudiantReference selon ta base

exports.getProfile = async (req, res) => {
  try {
    const User = UserModelFn(connectUsersDB().mainConnection); 
    const user = await User.findOne({ matricule: req.user.matricule }).select('-password');

    if (!user) return res.status(404).json({ message: 'Utilisateur introuvable' });

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

exports.changePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  if (!oldPassword || !newPassword) {
    return res.status(400).json({ message: 'Ancien et nouveau mot de passe requis' });
  }

  try {
    const User = UserModelFn(connectUsersDB().mainConnection); 
    const user = await User.findOne({ matricule: req.user.matricule });

    if (!user) return res.status(404).json({ message: 'Utilisateur introuvable' });

    // Vérifier l'ancien mot de passe
    const isMatch = await bcrypt.compare(oldPassword, user.motDePasse);
    if (!isMatch) return res.status(401).json({ message: 'Ancien mot de passe incorrect' });

    // Hash du nouveau mot de passe
    const salt = await bcrypt.genSalt(10);
    user.motDePasse = await bcrypt.hash(newPassword, salt);

    await user.save();

    res.json({ message: 'Mot de passe mis à jour avec succès' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};
