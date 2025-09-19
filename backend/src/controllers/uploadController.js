const XLSX = require('xlsx');
const User = require('../models/EtudiantReference');

exports.uploadExcel = async (req, res) => {
  const { database } = req.body;
  if (!req.file) return res.status(400).json({ message: 'Aucun fichier envoyé' });

  try {
    const workbook = XLSX.read(req.file.buffer);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = XLSX.utils.sheet_to_json(sheet);
    console.log("📄 Données Excel importées :", jsonData);
    switch (database) {
      case 'UtilisateursRef':
        await User.insertMany(jsonData);
        break;
      default:
        return res.status(400).json({ message: 'Base inconnue' });
    }

    res.json({ message: `Téléversement vers ${database} terminé` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur lors du téléversement' });
  }
};
