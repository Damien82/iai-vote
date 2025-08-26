const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload");
const {
  createParti,
  getAllPartis,
  updateParti,
  deleteParti,
  voteForParty,
} = require("../controllers/partiController");

const auth = require('../middlewares/authMiddleware_forvote');


// ✅ Toutes ces fonctions doivent être bien définies
router.post("/", upload.single("image"), createParti);
router.get("/", getAllPartis);
router.post('/vote', auth,voteForParty);
router.put("/:id", upload.single("image"), updateParti);
router.delete("/:id", deleteParti);

module.exports = router;
