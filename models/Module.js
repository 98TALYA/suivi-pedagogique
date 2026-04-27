const mongoose = require('mongoose');

// Schéma pour les modules de formation
const moduleSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true
  },
  volumeHoraire: {
    type: Number,
    required: true
  },
  formateurId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  formateurNom: {
    type: String,
    required: true
  },
  ordre: {
    type: Number,
    default: 0
  },
  actif: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Module', moduleSchema);
