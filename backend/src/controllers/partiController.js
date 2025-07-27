const Parti = require('../models/Parti');

exports.getAllPartis = async (req, res) => {
  const partis = await Parti.find();
  res.json(partis);
};

exports.createParti = async (req, res) => {
  const { nom, proprietaire } = req.body;
  const imageUrl = req.file?.path;

  if (!nom || !proprietaire || !imageUrl) {
    return res.status(400).json({ message: "Tous les champs sont requis" });
  }

  const nouveauParti = new Parti({ nom, proprietaire, imageUrl });
  await nouveauParti.save();
  res.status(201).json(nouveauParti);
};

exports.updateParti = async (req, res) => {
  const { id } = req.params;
  const { nom, proprietaire } = req.body;
  const imageUrl = req.file?.path;

  const parti = await Parti.findById(id);
  if (!parti) return res.status(404).json({ message: "Parti non trouvé" });

  parti.nom = nom || parti.nom;
  parti.proprietaire = proprietaire || parti.proprietaire;
  if (imageUrl) parti.imageUrl = imageUrl;

  await parti.save();
  res.json(parti);
};

exports.deleteParti = async (req, res) => {
  const { id } = req.params;
  await Parti.findByIdAndDelete(id);
  res.json({ message: "Parti supprimé" });
};
