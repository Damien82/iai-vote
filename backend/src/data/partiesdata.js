// src/data/partisData.js
const Partis = require("../models/Parti"); // ton modèle de partis
const cloudinary = require("../utils/cloudinary");

/**
 * Récupère tous les partis et formate pour frontend
 */
const getPartisData = async () => {
  try {
    const partis = await Partis.find(); // récupère tous les partis depuis MongoDB

    const formattedPartis = partis.map(parti => ({
      name: parti.nom, // nom du parti
      image: cloudinary.url(parti.imagePublicId), // URL de l'image Cloudinary
      votes: parti.votes || 0, // nombre de votes (0 par défaut si non défini)
    }));

    return formattedPartis;
  } catch (err) {
    console.error("Erreur récupération partis:", err);
    return [];
  }
};

module.exports = getPartisData;
