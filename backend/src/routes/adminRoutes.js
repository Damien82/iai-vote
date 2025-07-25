const express = require("express");
const router = express.Router();
const verifyRole = require("../middleware/verifyRole");

router.post("/secure-route", verifyRole("admin"), (req, res) => {
  res.json({ message: "Accès admin confirmé !" });
});

module.exports = router;
