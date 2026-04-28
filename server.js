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
  .then(async () => {
    console.log('✓ Connexion à MongoDB réussie');
    
    // Auto-seed si base vide
    const User = require('./models/User');
    const Module = require('./models/Module');
    const Seance = require('./models/Seance');

    const userCount = await User.countDocuments();
    if (userCount === 0) {
      // Créer utilisateurs
      const directeur  = await User.create({ nom: 'Directeur Principal',      email: 'directeur@test.com', password: 'dir123', role: 'directeur'  });
      const formateur1 = await User.create({ nom: 'El Khomsi Tarik',          email: 'tarik@test.com',     password: '1234',   role: 'formateur'  });
      const formateur2 = await User.create({ nom: 'Alaoui Ismaili Soumaya',   email: 'soumaya@test.com',   password: '1234',   role: 'formateur'  });

      // Créer modules
      const module1 = await Module.create({ nom: 'Production orale',      volumeHoraire: 50, formateurId: formateur1._id, formateurNom: formateur1.nom, ordre: 1 });
      const module2 = await Module.create({ nom: 'Compréhension écrite',  volumeHoraire: 30, formateurId: formateur1._id, formateurNom: formateur1.nom, ordre: 2 });
      const module3 = await Module.create({ nom: 'Grammaire appliquée',   volumeHoraire: 40, formateurId: formateur2._id, formateurNom: formateur2.nom, ordre: 3 });

      // Créer séances
      await Seance.create([
        { date:'2026-04-20', heureDebut:'09:00', heureFin:'11:00', moduleId: module1._id, moduleNom: module1.nom, formateurId: formateur1._id, formateurNom: formateur1.nom, objectif:'Introduction à la prononciation', deroulement:'Exercices de phonétique', observations:'Bonne participation', suite:'Continuer voyelles nasales', heures:2, valideParDirecteur:true,  dateValidation: new Date() },
        { date:'2026-04-21', heureDebut:'14:00', heureFin:'16:00', moduleId: module1._id, moduleNom: module1.nom, formateurId: formateur1._id, formateurNom: formateur1.nom, objectif:'Conversation en groupes',      deroulement:'Débat quotidien',         observations:'Apprenants timides',   suite:'Sujets engageants',         heures:2, valideParDirecteur:true,  dateValidation: new Date() },
        { date:'2026-04-22', heureDebut:'10:00', heureFin:'12:00', moduleId: module2._id, moduleNom: module2.nom, formateurId: formateur1._id, formateurNom: formateur1.nom, objectif:'Lecture de textes variés',     deroulement:'Textes journalistiques',  observations:'Excellente compréhension', suite:'Passer aux textes littéraires', heures:2, valideParDirecteur:true,  dateValidation: new Date() },
        { date:'2026-04-23', heureDebut:'09:00', heureFin:'11:30', moduleId: module3._id, moduleNom: module3.nom, formateurId: formateur2._id, formateurNom: formateur2.nom, objectif:'Les temps du passé',           deroulement:'Passé composé vs imparfait', observations:'Confusion fréquente', suite:'Exercices supplémentaires', heures:2.5, valideParDirecteur:true, dateValidation: new Date() },
        { date:'2026-04-24', heureDebut:'14:00', heureFin:'15:30', moduleId: module3._id, moduleNom: module3.nom, formateurId: formateur2._id, formateurNom: formateur2.nom, objectif:'Accord des adjectifs',         deroulement:'Révision des règles',     observations:'Meilleure compréhension', suite:'Préparer évaluation',      heures:1.5, valideParDirecteur:false },
        { date:'2026-04-25', heureDebut:'10:00', heureFin:'12:00', moduleId: module1._id, moduleNom: module1.nom, formateurId: formateur1._id, formateurNom: formateur1.nom, objectif:'Intonation et rythme',         deroulement:'Ressources audios',       observations:'Progression sensible',    suite:'Séance bilan prévue',       heures:2,   valideParDirecteur:false },
      ]);

      console.log('✓ Données de test créées');
    }
  })
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
