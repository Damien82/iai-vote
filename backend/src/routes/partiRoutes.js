const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload');
const {
  getAllPartis,
  createParti,
  updateParti,
  deleteParti,
} = require('../controllers/partiController');

router.get('/', getAllPartis);
router.post('/', upload.single('image'), createParti);
router.put('/:id', upload.single('image'), updateParti);
router.delete('/:id', deleteParti);

module.exports = router;
