const cloudinary = require('../utils/cloudinary');
const streamifier = require('streamifier');

exports.getAllPartis = async (req, res) => {
  const Parti = require('../models/Parti')(req.db_partis.partis);
  const partis = await Parti.find().sort({ nom: 1 });
  res.json(partis);
};

exports.addParti = async (req, res) => {
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
      imageUrl: result.secure_url
    });

    await nouveauParti.save();
    res.status(201).json(nouveauParti);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur lors de l'ajout" });
  }
};

exports.updateParti = async (req, res) => {
  const Parti = require('../models/Parti')(req.db_partis.partis);
  const { nom, proprietaire } = req.body;
  const { id } = req.params;
  const update = { nom, proprietaire };
  if (req.file) {
    const result = await cloudinary.uploader.upload_stream().end(req.file.buffer);
    update.imageUrl = result.secure_url;
  }

  const updated = await Parti.findByIdAndUpdate(id, update, { new: true });
  res.json(updated);
};

exports.deleteParti = async (req, res) => {
  const Parti = require('../models/Parti')(req.db_partis.partis);
  const { id } = req.params;
  await Parti.findByIdAndDelete(id);
  res.json({ message: "Parti supprimé avec succès" });
};
