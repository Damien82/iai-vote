const cloudinary = require('../utils/cloudinary');
const streamifier = require('streamifier');

exports.getAllPartis = async (req, res) => {
  const Parti = require('../models/Parti')(req.db_partis.partis);
  const partis = await Parti.find().sort({ nom: 1 });
  res.json(partis);
};

exports.createParti = async (req, res) => {
  try {
    const Parti = require('../models/Parti')(req.db_partis.partis);
    const { nom, proprietaire } = req.body;
    const file = req.file;

    if (!file) return res.status(400).json({ error: "Image requise" });

    const streamUpload = (req) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream((error, result) => {
          if (result) resolve(result);
          else reject(error);
        });
        streamifier.createReadStream(file.buffer).pipe(stream);
      });
    };

    const result = await streamUpload(req);

    const nouveauParti = new Parti({
      nom,
      proprietaire,
      imageUrl: result.secure_url,
      imagePublicId: result.public_id
    });

    await nouveauParti.save();
    res.status(201).json(nouveauParti);
} catch (err) {
  console.error("Erreur lors de l'ajout du parti :", err.message);
  console.error(err); // Pour afficher la stack complète
  res.status(500).json({ error: "Erreur lors de l'ajout", message: err.message });
}

};


exports.voteForParty = async (req, res) => {
  try {
    const { partyName } = req.body;

    // Infos utilisateur depuis le token
    const { matricule, nom, prenom, classe } = req.user;

    // Charger les modèles avec la bonne connexion
    const Voter = require("../models/voter")(req.db_voter.voter);  // 🔥 correction ici
    const Parti = require("../models/Parti")(req.db_partis.partis);  // 🔥 et ici aussi (pas .partis)

    // Vérifier si la personne a déjà voté
    const alreadyVoted = await Voter.findOne({ matricule });
    if (alreadyVoted) {
      return res.status(403).json({ message: "Vous avez déjà voté !" });
    }

    // Enregistrer le votant
    await Voter.create({ matricule, nom, prenom, classe });

    // Trouver le parti et incrémenter
    const party = await Parti.findOne({ nom: partyName });
    if (!party) return res.status(404).json({ message: "Parti non trouvé" });

    party.votes = (party.votes || 0) + 1;
    await party.save();

    res.json({ message: `Vote enregistré pour ${party.nom}`, votes: party.votes });
  } catch (error) {
    console.error("Erreur lors du vote :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};





exports.updateParti = async (req, res) => {
const Parti = require('../models/Parti')(req.db_partis.partis);
const { nom, proprietaire } = req.body;
const { id } = req.params;

const parti = await Parti.findById(id);
if (!parti) return res.status(404).json({ error: "Parti non trouvé" });

const update = { nom, proprietaire };

if (req.file) {
  // Supprimer ancienne image Cloudinary
  if (parti.imagePublicId) {
    await cloudinary.uploader.destroy(parti.imagePublicId);
  }

  // Upload nouvelle image via streamifier (comme pour addParti)
  const streamUpload = (req) => {
    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream((error, result) => {
        if (result) resolve(result);
        else reject(error);
      });
      streamifier.createReadStream(req.file.buffer).pipe(stream);
    });
  };

  const result = await streamUpload(req);

  update.imageUrl = result.secure_url;
  update.imagePublicId = result.public_id;
}


  const updated = await Parti.findByIdAndUpdate(id, update, { new: true });
  res.json(updated);
};

exports.deleteParti = async (req, res) => {
const Parti = require('../models/Parti')(req.db_partis.partis);
const { id } = req.params;

const parti = await Parti.findById(id);
if (!parti) return res.status(404).json({ error: "Parti non trouvé" });

if (parti.imagePublicId) {
  await cloudinary.uploader.destroy(parti.imagePublicId);
}

await Parti.findByIdAndDelete(id);
res.json({ message: "Parti supprimé avec succès" });

};
