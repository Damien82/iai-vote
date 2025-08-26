// controllers/partisController.js
const getPartisData = require('../data/partiesdata');

exports.getPartis = async (req, res) => {
  try {
    const db_partis = req.db_partis; // ta connexion MongoDB injectée
    const data = await getPartisData(db_partis);
    res.json(data);
  } catch (err) {
    console.error("Erreur getPartis:", err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};
