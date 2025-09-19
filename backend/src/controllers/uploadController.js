const connectUsersDB = require('../config/db'); 
const XLSX = require('xlsx');
const UserModelFn = require('../models/EtudiantReference');

exports.uploadExcel = async (req, res) => {
  const { database } = req.body;
  if (!req.file) return res.status(400).json({ message: 'Aucun fichier envoyé' });

  try {
    const db = connectUsersDB(); // récupérer les connexions
    const User = UserModelFn(db.refConnection);
    const workbook = XLSX.read(req.file.buffer);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = XLSX.utils.sheet_to_json(sheet);

        let formattedData;


    switch (database) {
      case 'UtilisateursRef':
          formattedData = jsonData.map(item => ({
          matricule: item.Matricule,
          nom: item.Nom,
          prenom: item['Prénom']
        }));
        await User.insertMany(formattedData);
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
