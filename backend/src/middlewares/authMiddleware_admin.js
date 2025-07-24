const jwt = require("jsonwebtoken");
const SECRET = process.env.JWT_SECRET || "votre_jwt_secret";

function verifyToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.status(401).json({ message: "Token manquant" });

  const token = authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Token mal formaté" });

  try {
    const decoded = jwt.verify(token, SECRET);
    req.admin = decoded;
    next();
  } catch {
    return res.status(403).json({ message: "Token invalide ou expiré" });
  }
}

module.exports = verifyToken;
