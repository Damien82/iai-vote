const UserRef = require('../models/EtudiantReference');
const User = require('../models/User');
const Voter = require('../models/voter');
const AdminRef = require('../models/AdminReference')
const Admin = require('../models/Admins')
const Parti = require('../models/Parti');

exports.purgeDatabase = async (req, res) => {
  const { database } = req.body; // 'users', 'voters', 'partis'

  try {
    switch (database) {
      case 'utilisateurs':
        await User.deleteMany({});
        break;
      case 'votant':
        await Voter.deleteMany({});
        break;
      case 'partis':
        await Parti.deleteMany({});
        break;
      case 'UtilisateursRef':
        await UserRef.deleteMany({});
        break;
      case 'AdministrateurRef':
        await AdminRef.deleteMany({});
        break;     
      case 'Administrateurs':
        await Admin.deleteMany({});
        break;   
      default:
        return res.status(400).json({ message: 'Base inconnue' });
    }
    res.json({ message: `Vidange de ${database} terminée` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur lors de la vidange' });
  }
};
