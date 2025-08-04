const connectDB2 = require("../config/db_admin");
const createAdminModel = require("../models/AdminReference"); // modèle pour refConnection
const createUserModel = require("../models/Admins"); // modèle pour mainConnection

const { refConnection, mainConnection } = connectDB2();

// Initialiser les modèles à partir des connexions
const AdminRef = createAdminModel(refConnection);
const Admins = createUserModel(mainConnection);

/**
 * @desc Ajouter un utilisateur dans la base refConnection (base de référence)
 * @route POST /api/users
 */
const ajouterAdmin = async (req, res) => {
  try {
    const { matricule, nom, prenom } = req.body;

    // Vérification si déjà enregistré dans la base ref
    const existing = await AdminRef.findOne({ matricule });
    if (existing) {
      return res.status(400).json({ message: "Cet utilisateur existe déjà dans la base de référence" });
    }

    // Création de l'étudiant dans la base ref
    const newAdmin = new AdminRef({ matricule, nom, prenom });
    await newAdmin.save();

    res.status(201).json({ message: "Étudiant ajouté dans la base de référence", admin: newAdmin });
  } catch (error) {
    console.error("Erreur lors de l'ajout dans la base de référence:", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

/**
 * @desc Afficher tous les utilisateurs depuis la base principale (mainConnection)
 * @route GET /api/users
 */
const getAllAdmins = async (req, res) => {
  try {
    const admin = await Admins.find().select("-motDePasse");
    res.status(200).json(admin);
  } catch (error) {
    console.error("Erreur lors de la récupération des utilisateurs:", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

/**
 * @desc Supprimer un utilisateur dans les deux bases
 * @route DELETE /api/users/:id
 */
const deleteAdmins = async (req, res) => {
  try {
    const { id } = req.params;

    // 1. Supprimer dans la base principale (mainConnection)
    const admin = await Admins.findByIdAndDelete(id);

    if (!admin) {
      return res.status(404).json({ message: "Utilisateur introuvable dans la base principale" });
    }

    // 2. Supprimer dans la base de référence (refConnection) via le matricule
    const deletedRef = await AdminRef.findOneAndDelete({ matricule: admin.matricule });

    if (!deletedRef) {
      return res.status(404).json({
        message: "Utilisateur supprimé dans main, mais non trouvé dans la base de référence",
      });
    }

    res.status(200).json({ message: "Utilisateur supprimé dans les deux bases" });
  } catch (error) {
    console.error("Erreur lors de la suppression de l'utilisateur :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

module.exports = {
  ajouterAdmin,
  getAllAdmins,
  deleteAdmins, // <-- nouvelle fonction
};
