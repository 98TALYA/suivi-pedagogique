const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const Seance = require('../models/Seance');

// Créer une nouvelle séance (protégé, réservé aux formateurs)
router.post('/', authMiddleware, async (req, res) => {
  try {
    // Vérifier que c'est un formateur
    if (req.user.role !== 'formateur') {
      return res.status(403).json({ erreur: 'Accès réservé aux formateurs' });
    }
    
    const {
      date,
      heureDebut,
      heureFin,
      moduleId,
      moduleNom,
      objectif,
      deroulement,
      observations,
      suite,
      heures
    } = req.body;
    
    // Vérifier les champs obligatoires
    if (!date || !heureDebut || !heureFin || !moduleId || !objectif || !deroulement || heures === undefined) {
      return res.status(400).json({ erreur: 'Champs obligatoires manquants' });
    }
    
    // Créer une nouvelle séance
    const seance = new Seance({
      date,
      heureDebut,
      heureFin,
      moduleId,
      moduleNom,
      formateurId: req.user.id,
      formateurNom: req.user.nom,
      objectif,
      deroulement,
      observations: observations || '',
      suite: suite || '',
      heures
    });
    
    await seance.save();
    
    res.status(201).json({
      succes: true,
      message: 'Séance enregistrée avec succès',
      seance
    });
  } catch (error) {
    console.error('Erreur lors de la création de la séance:', error);
    res.status(500).json({ erreur: 'Erreur serveur' });
  }
});

// Récupérer toutes les séances (protégé, réservé aux directeurs)
router.get('/', authMiddleware, async (req, res) => {
  try {
    // Vérifier que c'est un directeur
    if (req.user.role !== 'directeur') {
      return res.status(403).json({ erreur: 'Accès réservé aux directeurs' });
    }
    
    const seances = await Seance.find().sort({ date: -1 });
    res.json(seances);
  } catch (error) {
    console.error('Erreur lors de la récupération des séances:', error);
    res.status(500).json({ erreur: 'Erreur serveur' });
  }
});

// Valider une séance (protégé, réservé aux directeurs)
router.patch('/:id/valider', authMiddleware, async (req, res) => {
  try {
    // Vérifier que c'est un directeur
    if (req.user.role !== 'directeur') {
      return res.status(403).json({ erreur: 'Accès réservé aux directeurs' });
    }
    
    const seance = await Seance.findByIdAndUpdate(
      req.params.id,
      {
        valideParDirecteur: true,
        dateValidation: new Date()
      },
      { new: true }
    );
    
    if (!seance) {
      return res.status(404).json({ erreur: 'Séance non trouvée' });
    }
    
    res.json({
      succes: true,
      message: 'Séance validée',
      seance
    });
  } catch (error) {
    console.error('Erreur lors de la validation de la séance:', error);
    res.status(500).json({ erreur: 'Erreur serveur' });
  }
});

module.exports = router;
