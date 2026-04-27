const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Connexion à MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✓ Connexion à MongoDB réussie'))
  .catch(err => {
    console.error('✗ Erreur de connexion à MongoDB:', err);
    process.exit(1);
  });

// Routes API
const authRoutes = require('./routes/auth');
const modulesRoutes = require('./routes/modules');
const seancesRoutes = require('./routes/seances');
const statsRoutes = require('./routes/stats');

app.use('/api/auth', authRoutes);
app.use('/api/modules', modulesRoutes);
app.use('/api/seances', seancesRoutes);
app.use('/api/stats', statsRoutes);

// Route pour servir l'application
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// Gestion des erreurs globales
app.use((err, req, res, next) => {
  console.error('Erreur serveur:', err);
  res.status(500).json({ erreur: 'Erreur serveur interne' });
});

// Démarrage du serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✓ Serveur démarré sur http://localhost:${PORT}`);
});
