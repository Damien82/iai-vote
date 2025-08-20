// routes/systemRoutes.js
const express = require("express");
const router = express.Router();
const { getSystemState, toggleSystemState } = require("../controllers/systemController");

router.get("/getsystemstate", getSystemState);          // Récupérer l’état
router.put("/togglesystemstate", toggleSystemState);       // Modifier l’état

module.exports = router;
