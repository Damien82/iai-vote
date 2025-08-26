// controllers/partiesController.js
const cloudinaryBaseUrl = "https://res.cloudinary.com/djzsrj98x/image/upload/"; // remplacer par ton nom cloud

// Fonction pour récupérer tous les partis
exports.getAllPartis = async (req, res) => {
  try {
    // On récupère le modèle Parti avec la connexion correcte
    const Parti = require('../models/Parti')(req.db_partis.partis);

    // On récupère tous les partis
    const partisFromDb = await Parti.find().sort({ nom: 1 });

    // On transforme les données pour le frontend
    const partis = partisFromDb.map((p) => ({
      name: p.nom,
      image: p.imageUrl || `${cloudinaryBaseUrl}${p.imagePublicId}`, // priorité à imageUrl sinon on génère depuis publicId
      votes: p.votes || 0, // si tu as un champ votes, sinon 0 par défaut
    }));

    res.json(partis);
  } catch (error) {
    console.error("Erreur récupération partis:", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};
