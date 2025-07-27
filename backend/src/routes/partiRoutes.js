const express = require('express');
import {
  getPartis,
  createParti,
  updateParti,
  deleteParti,
} from '../controllers/partiController.js';
import upload from '../middlewares/upload.js';

const router = express.Router();

router.get('/', getPartis);
router.post('/', upload.single('image'), createParti);
router.put('/:id', upload.single('image'), updateParti);
router.delete('/:id', deleteParti);

module.exports = router;
