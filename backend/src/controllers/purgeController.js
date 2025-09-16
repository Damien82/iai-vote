// controllers/purgeController.js
// 🔹 Controller pour la purge avancée des bases
const connectDB = require("../config/db"); // chemin selon ton projet
const { refConnection, mainConnection } = connectDB(); 
const connectRefAdminDB = require("../config/db_admin");
const { refConnection: refAdminConn, mainConnection: mainAdminConn } = connectRefAdminDB();
const connectRefvoterDB = require("../config/db_voter");
const { votersConnection: refvoterConn} = connectRefvoterDB();


// Import des schémas
const User = require('../models/Users')(mainConnection);
const userRef = require('../models/EtudiantReference');(refConnection);
const admin = require('../models/Admins')(mainAdminConn);
const adminRef = require('../models/AdminReference')(refAdminConn);
const voter = require('../models/voter')(refvoterConn);

exports.purgeDatabase = async (req, res) => {
  const { database } = req.body; // 'Utilisateurs', 'Votant', 'Partis', 'UtilisateursRef', 'AdministrateurRef', 'Administrateurs'

  try {
    let Model;

    switch (database) {
      case 'Utilisateurs':
        await User.deleteMany({});
        break;
      case 'Votant':
        await voter.deleteMany({});
        break;
      case 'UtilisateursRef':
        await userRef.deleteMany({});
        break;
      case 'AdministrateurRef':
        await adminRef.deleteMany({});
        break;
      case 'Administrateurs':
        await admin.deleteMany({});
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
