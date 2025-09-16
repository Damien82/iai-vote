const express = require('express');
const router = express.Router();
const purgeController = require('../controllers/purgeController');
const uploadController = require('../controllers/uploadController');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage });

// 🔹 Purge
router.post('/purge', purgeController.purgeDatabase);

// 🔹 Upload Excel
router.post('/upload', upload.single('file'), uploadController.uploadExcel);

module.exports = router;
