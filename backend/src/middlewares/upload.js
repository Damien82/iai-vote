const multer = require('multer');
const path = require('path');

const storage = multer.memoryStorage(); // Pour l'envoi à Cloudinary
const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname);
  if (ext !== '.jpg' && ext !== '.png' && ext !== '.jpeg') {
    return cb(new Error('Seulement les images sont autorisées'));
  }
  cb(null, true);
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
