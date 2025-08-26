
// routes/partisRoutes.js
const express = require('express');
const router = express.Router();
const partisController = require("../controllers/partiesdata");

router.get('/getPartis', partisController.getPartis);

module.exports = router;
