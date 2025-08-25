const express = require("express");
const router = express.Router();
const systemController = require("../controllers/systemController");

// Routes
router.get("/", systemController.getSystemState);
router.put("/", systemController.updateSystemState);

module.exports = router;
