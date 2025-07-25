const express = require("express");
const router = express.Router();
const verifyRole = require("../middleware/verifyRole");

// Route sécurisée accessible uniquement aux admins
router.post("/dashboard", verifyRole("admin"), (req, res) => {
  res.json({ message: "Bienvenue sur le tableau de bord admin", user: req.user });
});
module.exports = router;
