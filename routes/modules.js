const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const Module = require('../models/Module');

// Récupérer tous les modules actifs (protégé par JWT)
router.get('/', authMiddleware, async (req, res) => {
  try {
    const modules = await Module.find({ actif: true }).sort({ ordre: 1 });
    res.json(modules);
  } catch (error) {
    console.error('Erreur lors de la récupération des modules:', error);
    res.status(500).json({ erreur: 'Erreur serveur' });
  }
});

// Récupérer les modules du formateur connecté (protégé par JWT)
router.get('/miens', authMiddleware, async (req, res) => {
  try {
    // Vérifier que c'est un formateur
    if (req.user.role !== 'formateur') {
      return res.status(403).json({ erreur: 'Accès réservé aux formateurs' });
    }
    
    const modules = await Module.find({
      formateurId: req.user.id,
      actif: true
    }).sort({ ordre: 1 });
    
    res.json(modules);
  } catch (error) {
    console.error('Erreur lors de la récupération des modules du formateur:', error);
    res.status(500).json({ erreur: 'Erreur serveur' });
  }
});

module.exports = router;
