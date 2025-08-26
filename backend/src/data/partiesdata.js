// data/partisData.js
const cloudinary = require('../utils/cloudinary'); // ton util Cloudinary
const PartiModel = require('../models/Parti');     // ton modèle Mongoose

/**
 * Récupère tous les partis et retourne un tableau prêt pour le frontend
 * @param {any} db_partis - connexion Mongoose injectée
 * @returns {Promise<Array<{name: string, image: string, votes: number}>>}
 */
const getPartisData = async (db_partis) => {
  try {
    const Parti = PartiModel(db_partis);         // utilise la connexion injectée
    const partis = await Parti.find();           // récupère tous les partis

    return partis.map(parti => ({
      name: parti.nom,
      image: parti.imagePublicId 
             ? cloudinary.url(parti.imagePublicId) // générer l’URL depuis Cloudinary
             : parti.imageUrl,                     // fallback sur l’URL directe
      votes: parti.votes || 0                      // met 0 si pas de champ votes
    }));
  } catch (err) {
    console.error("Erreur récupération partis:", err);
    return [];
  }
};

module.exports = getPartisData;
