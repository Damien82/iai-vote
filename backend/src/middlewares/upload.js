const multer = require("multer");
const path = require("path");

const storage = multer.memoryStorage(); // Pour l'envoi à Cloudinary

const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  const allowedTypes = [".jpg", ".jpeg", ".png"];

  if (!allowedTypes.includes(ext)) {
    return cb(new Error("Seules les images .jpg, .jpeg, .png sont autorisées."));
  }

  cb(null, true);
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 2 * 1024 * 1024, // Limite à 2 Mo
  },
});

module.exports = upload;
