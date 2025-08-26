const mongoose = require('mongoose');

const VoterSchema = new mongoose.Schema({
  matricule: { type: String, required: true, trim: true, unique: true },
  nom: { type: String, required: true, trim: true },
  prenom: { type: String, required: true, trim: true },
  classe: { type: String, required: true, trim: true },
}, { timestamps: true });

module.exports = (db_voters) => db_voters.models.Voter || db_voters.model('Voter', VoterSchema);
