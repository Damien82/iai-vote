const multer = require("multer");

const errorHandler = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({
        error: "L’image est trop lourde. Seules les images de moins de 2 Mo sont autorisées.",
      });
    }
  }

  if (err.message && err.message.includes("Seules les images")) {
    return res.status(400).json({ error: err.message });
  }

  next(err); // passe à la gestion d’erreur standard
};

module.exports = errorHandler;
