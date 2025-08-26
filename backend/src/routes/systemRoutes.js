const express = require("express");
const router = express.Router();
const systemController = require("../controllers/systemController");

// Routes
router.get("/getSystemState", systemController.getSystemState);
router.put("/updateSystemState", systemController.updateSystemState);

module.exports = router;
