const connectDB = require("../config/db");
const createEtudiantModel = require("../models/EtudiantReference"); // modèle pour refConnection
const createUserModel = require("../models/users"); // modèle pour mainConnection

const { refConnection, mainConnection } = connectDB();

// Initialiser les modèles à partir des connexions
const EtudiantRef = createEtudiantModel(refConnection);
const User = createUserModel(mainConnection);

/**
 * @desc Ajouter un utilisateur dans la base refConnection (base de référence)
 * @route POST /api/users
 */
const ajouterUtilisateur = async (req, res) => {
  try {
    const { matricule, nom, prenom } = req.body;

    // Vérification si déjà enregistré dans la base ref
    const existing = await EtudiantRef.findOne({ matricule });
    if (existing) {
      return res.status(400).json({ message: "Cet utilisateur existe déjà dans la base de référence" });
    }

    // Création de l'étudiant dans la base ref
    const newEtudiant = new EtudiantRef({ matricule, nom, prenom });
    await newEtudiant.save();

    res.status(201).json({ message: "Étudiant ajouté dans la base de référence", etudiant: newEtudiant });
  } catch (error) {
    console.error("Erreur lors de l'ajout dans la base de référence:", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

/**
 * @desc Afficher tous les utilisateurs depuis la base principale (mainConnection)
 * @route GET /api/users
 */
const getAllUtilisateurs = async (req, res) => {
  try {
    const utilisateurs = await User.find();
    res.status(200).json(utilisateurs);
  } catch (error) {
    console.error("Erreur lors de la récupération des utilisateurs:", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

module.exports = {
  ajouterUtilisateur,
  getAllUtilisateurs,
};
