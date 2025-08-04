const express = require("express");
const router = express.Router();

const {
  ajouterAdmin,
  getAllAdmins,
  deleteAdmins,
} = require("../controllers/adminuserController");

// Route POST : Ajouter un utilisateur dans la base ref (base de référence)
router.post("/", ajouterAdmin);

// Route GET : Afficher tous les utilisateurs depuis la base main (base principale)
router.get("/", getAllAdmins);

// Route GET : supprimer tous un utilisateur
router.delete("/:id", deleteAdmins);


module.exports = router;
