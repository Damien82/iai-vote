const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/authMiddleware");

router.get("/profile", verifyToken, (req, res) => {
  res.json({
    message: "Accès autorisé à la route protégée",
    admin: req.admin,
  });
});

module.exports = router;
