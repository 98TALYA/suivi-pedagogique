const jwt = require('jsonwebtoken');

// Middleware de vérification du JWT
const authMiddleware = (req, res, next) => {
  // Récupérer le token du header Authorization
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ erreur: 'Token manquant' });
  }
  
  try {
    // Vérifier et décoder le token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Stocker les informations de l'utilisateur dans req.user
    req.user = {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role,
      nom: decoded.nom
    };
    
    next();
  } catch (error) {
    return res.status(401).json({ erreur: 'Token invalide' });
  }
};

module.exports = authMiddleware;
