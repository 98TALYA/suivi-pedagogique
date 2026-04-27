const mongoose = require('mongoose');

// Schéma pour les séances de formation
const seanceSchema = new mongoose.Schema({
  date: {
    type: String,  // format "YYYY-MM-DD"
    required: true
  },
  heureDebut: {
    type: String,  // format "HH:MM"
    required: true
  },
  heureFin: {
    type: String,  // format "HH:MM"
    required: true
  },
  moduleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Module',
    required: true
  },
  moduleNom: {
    type: String,
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
  objectif: {
    type: String,
    required: true
  },
  deroulement: {
    type: String,
    required: true
  },
  observations: {
    type: String
  },
  suite: {
    type: String
  },
  heures: {
    type: Number,
    required: true
  },
  valideParDirecteur: {
    type: Boolean,
    default: false
  },
  dateValidation: {
    type: Date,
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Seance', seanceSchema);
