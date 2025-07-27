const mongoose = require('mongoose');

const PartiSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  proprietaire: { type: String, required: true },
  imageUrl: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model("Parti", PartiSchema);
