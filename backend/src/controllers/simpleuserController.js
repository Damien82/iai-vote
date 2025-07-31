import UserAjout from "../models/EtudiantReference.js";
import UserAffichage from "../models/Users.js";

// Ajouter un utilisateur
export const ajouterUser = async (req, res) => {
  try {
    const { nom, prenom, matricule } = req.body;
    const newUser = new UserAjout({ nom, prenom, matricule });
    await newUser.save();
    res.status(201).json({ message: "Utilisateur ajouté avec succès." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtenir tous les utilisateurs
export const afficherUsers = async (req, res) => {
  try {
    const users = await UserAffichage.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
