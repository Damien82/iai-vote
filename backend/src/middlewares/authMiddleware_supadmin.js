const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Token manquant" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Exemple: decoded = { matricule: "IAI12345", ... }

    req.user = {
      matricule: decoded.matricule,
      // tu peux ajouter d’autres infos utiles
    };
    next();
  } catch (err) {
    return res.status(401).json({ message: "Token invalide" });
  }
};

module.exports = authMiddleware;
