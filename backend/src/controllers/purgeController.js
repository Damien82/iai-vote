// controllers/purgeController.js
// 🔹 Controller pour la purge avancée des bases
const connectDB = require("../config/db"); // chemin selon ton projet
const { refConnection, mainConnection } = connectDB();
// Import des schémas
const userSchema = require('../models/Users');(mainConnection)
const userRefSchema = require('../models/EtudiantReference');(refConnection)
const adminSchema = require('../models/Admins');
const adminRefSchema = require('../models/AdminReference');
const voterSchema = require('../models/voter');
const partiSchema = require('../models/Parti');

exports.purgeDatabase = async (req, res) => {
  const { database } = req.body; // 'Utilisateurs', 'Votant', 'Partis', 'UtilisateursRef', 'AdministrateurRef', 'Administrateurs'

  try {
    let Model;

    switch (database) {
      case 'Utilisateurs':
        Model = req.db_main.models.User || req.db_main.model('User', userSchema);
        break;
      case 'Votant':
        Model = req.db_main.models.Voter || req.db_main.model('Voter', voterSchema);
        break;
      case 'Partis':
        Model = req.db_main.models.Parti || req.db_main.model('Parti', partiSchema);
        break;
      case 'UtilisateursRef':
        Model = req.db_ref.models.EtudiantReference || req.db_ref.model('allowed', userRefSchema);
        break;
      case 'AdministrateurRef':
        Model = req.db_ref.models.AdminReference || req.db_ref.model('allowed', adminRefSchema);
        break;
      case 'Administrateurs':
        Model = req.db_main.models.Admin || req.db_main.model('Admins', adminSchema);
        break;
      default:
        return res.status(400).json({ message: 'Base inconnue' });
    }

    await Model.deleteMany({});
    return res.json({ message: `Vidange de ${database} terminée` });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Erreur lors de la vidange' });
  }
};
