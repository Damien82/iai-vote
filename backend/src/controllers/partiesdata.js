const getPartisData = require('../data/partisData');

exports.getPartis = async (req, res) => {
  try {
    const db_partis = req.db_partis; // connexion injectée depuis app.js
    if (!db_partis) {
      return res.status(500).json({ message: "Connexion à la base manquante" });
    }

    const data = await getPartisData(db_partis);
    res.json(data);
  } catch (err) {
    console.error("Erreur getPartis:", err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};
