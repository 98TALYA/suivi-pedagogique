const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const Seance = require('../models/Seance');
const Module = require('../models/Module');

// Statistiques par module : heures réalisées vs prévues
router.get('/modules', authMiddleware, async (req, res) => {
  try {
    // Récupérer tous les modules actifs
    const modules = await Module.find({ actif: true }).sort({ ordre: 1 });
    
    // Pour chaque module, calculer les heures réalisées
    const stats = await Promise.all(
      modules.map(async (module) => {
        // Somme des heures des séances validées du module
        const result = await Seance.aggregate([
          {
            $match: {
              moduleId: module._id,
              valideParDirecteur: true
            }
          },
          {
            $group: {
              _id: null,
              heuresRealisees: { $sum: '$heures' }
            }
          }
        ]);
        
        const heuresRealisees = result.length > 0 ? result[0].heuresRealisees : 0;
        
        return {
          nom: module.nom,
          heuresRealisees,
          heuresPrevues: module.volumeHoraire,
          formateurNom: module.formateurNom
        };
      })
    );
    
    res.json(stats);
  } catch (error) {
    console.error('Erreur lors du calcul des statistiques par module:', error);
    res.status(500).json({ erreur: 'Erreur serveur' });
  }
});

// Statistiques par formateur : heures totales réalisées
router.get('/formateurs', authMiddleware, async (req, res) => {
  try {
    // Grouper les séances par formateur et calculer les heures totales
    const stats = await Seance.aggregate([
      {
        $match: {
          valideParDirecteur: true
        }
      },
      {
        $group: {
          _id: '$formateurNom',
          heuresRealisees: { $sum: '$heures' }
        }
      },
      {
        $sort: { heuresRealisees: -1 }
      }
    ]);
    
    // Transformer le résultat pour avoir un format plus lisible
    const resultat = stats.map(item => ({
      formateurNom: item._id,
      heuresRealisees: item.heuresRealisees
    }));
    
    res.json(resultat);
  } catch (error) {
    console.error('Erreur lors du calcul des statistiques par formateur:', error);
    res.status(500).json({ erreur: 'Erreur serveur' });
  }
});

module.exports = router;
