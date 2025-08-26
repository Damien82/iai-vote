// src/routes/partisRoutes.js
const express = require("express");
const router = express.Router();
const getPartisData = require("../data/partiesdata");

router.get("/all", async (req, res) => {
  const data = await getPartisData();
  res.json(data);
});

module.exports = router;
