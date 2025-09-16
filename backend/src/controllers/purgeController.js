// controllers/purgeController.js
// 🔹 Controller pour la purge avancée des bases
const connectUsersDB = require("../config/db");
const UserModelFn = require("../models/Users");
const UserModelFn2 = require("../models/EtudiantReference");

const connectAdminsDB = require("../config/db_admin");
const AdminModelFn = require("../models/Admins");
const AdminModelFn2 = require("../models/AdminReference");

const connectVoterDB = require("../config/db_voter");
const VoterModelFn1 = require("../models/voter");


exports.purgeDatabase = async (req, res) => {
  const { database } = req.body; // 'Utilisateurs', 'Votant', 'Partis', 'UtilisateursRef', 'AdministrateurRef', 'Administrateurs'

  try {
    let Model;

    switch (database) {
      case 'Utilisateurs':
        Model = UserModelFn(connectUsersDB().mainConnection); // connection principale
        break;
      case 'Votant':
        Model = VoterModelFn1(connectVoterDB().votersConnection); // connection Principale
        break;
      case 'UtilisateursRef':
         Model = UserModelFn2(connectUsersDB().refConnection); // connection secondaire
        break;
      case 'AdministrateurRef':
        Model = AdminModelFn(connectAdminsDB().refConnection); // connection secondaire
        break;
      case 'Administrateurs':
        Model = AdminModelFn2(connectAdminsDB().mainConnection); // connection Principale
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
