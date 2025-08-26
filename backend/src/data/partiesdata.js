const cloudinary = require('../utils/cloudinary'); // ton util Cloudinary
const PartiModel = require('../models/Parti');

const getPartisData = async (db_partis) => {
  try {
    const Parti = PartiModel(db_partis);
    const partis = await Parti.find(); // récupérer tous les partis

    return partis.map(p => ({
      name: p.nom,
      image: p.imagePublicId 
              ? cloudinary.url(p.imagePublicId) // génère l'URL Cloudinary
              : p.imageUrl,                     // fallback sur URL directe
      votes: p.votes || 0
    }));
  } catch (err) {
    console.error("Erreur récupération partis:", err);
    return [];
  }
};

module.exports = getPartisData;
