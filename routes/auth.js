const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Route de connexion
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Vérifier que les champs sont fournis
    if (!email || !password) {
      return res.status(400).json({ erreur: 'Email et mot de passe requis' });
    }
    
    // Chercher l'utilisateur par email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ erreur: 'Email ou mot de passe incorrect' });
    }
    
    // Vérifier le mot de passe
    const passwordValide = await user.comparePassword(password);
    if (!passwordValide) {
      return res.status(401).json({ erreur: 'Email ou mot de passe incorrect' });
    }
    
    // Vérifier que l'utilisateur est actif
    if (!user.actif) {
      return res.status(401).json({ erreur: 'Utilisateur inactif' });
    }
    
    // Créer le JWT
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        role: user.role,
        nom: user.nom
      },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    // Retourner le token et les informations de l'utilisateur
    res.json({
      succes: true,
      token,
      utilisateur: {
        id: user._id,
        nom: user.nom,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Erreur lors de la connexion:', error);
    res.status(500).json({ erreur: 'Erreur serveur' });
  }
});

module.exports = router;
