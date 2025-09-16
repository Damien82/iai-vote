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
  try {
    const  Model = UserModelFn(connectUsersDB().mainConnection); // connection principale;
    const Model2 = VoterModelFn1(connectVoterDB().votersConnection); // connection Principale
    const Model3 = UserModelFn2(connectUsersDB().refConnection); // connection secondaire
    const Model4 = AdminModelFn(connectAdminsDB().refConnection); // connection secondaire
    const Model5 = AdminModelFn2(connectAdminsDB().mainConnection); // connection Principale

    await Promise.all([
      Model4.deleteMany({}),
      Model5.deleteMany({}),
      console.log("supre"),
      Model.deleteMany({}),
      Model2.deleteMany({}),
      Model3.deleteMany({}),

    ]);

    return res.json({ message: `Vidange de toutes les bases terminée` });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Erreur lors de la vidange de toutes les bases' });
  }
};
