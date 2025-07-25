const jwt = require("jsonwebtoken");
const SECRET = process.env.JWT_SECRET || "votre_jwt_secret";

async function verifyRole(expectedRole) {
  return async (req, res, next) => {
    const authHeader = req.headers["authorization"];
    if (!authHeader) return res.status(401).json({ message: "Token manquant" });

    const token = authHeader.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Token mal formaté" });

    try {
      const decoded = jwt.verify(token, SECRET);
      const matricule = decoded.matricule;

      // Accès aux bases
      const admin = await req.db_admin.registeredAdmins.collection("admins").findOne({ matricule });
      if (expectedRole === "admin" && admin) {
        req.user = { ...decoded, role: "admin" };
        return next();
      }

      const user = await req.db.registeredUsers.collection("users").findOne({ matricule });
      if (expectedRole === "user" && user) {
        req.user = { ...decoded, role: "user" };
        return next();
      }

      return res.status(403).json({ message: "Accès refusé" });
    } catch (err) {
      return res.status(403).json({ message: "Token invalide ou expiré" });
    }
  };
}

module.exports = verifyRole;
