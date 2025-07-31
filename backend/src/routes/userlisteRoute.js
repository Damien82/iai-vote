const express = require("express");
import { ajouterUser, afficherUsers } from "../controllers/simpleuserController.js";

const router = express.Router();

router.post("/", ajouterUser);   // POST /api/users
router.get("/", afficherUsers);   // GET /api/users

export default router;
