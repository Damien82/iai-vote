// controllers/purgeController.js
// 🔹 Controller pour la purge avancée des bases
const connectUsersDB = require("../config/db");
const UserModelFn = require("../models/Users");
const UserModelFn2 = require("../models/EtudiantReference");

const connectVoterDB = require("../config/db_voter");
const VoterModelFn1 = require("../models/voter");


exports.purgeDatabase = async (req, res) => {
  try {
    const  Model = UserModelFn(connectUsersDB().mainConnection); // connection principale;
    const Model2 = VoterModelFn1(connectVoterDB().votersConnection); // connection Principale
    const Model3 = UserModelFn2(connectUsersDB().refConnection); // connection secondaire

    await Promise.all([
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
