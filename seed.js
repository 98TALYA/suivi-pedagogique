const mongoose = require('mongoose');
require('dotenv').config();

const User = require('./models/User');
const Module = require('./models/Module');
const Seance = require('./models/Seance');

async function seed() {
  try {
    // Connexion à MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✓ Connexion à MongoDB réussie');
    
    // Vider les collections existantes
    await User.deleteMany({});
    await Module.deleteMany({});
    await Seance.deleteMany({});
    console.log('✓ Collections vidées');
    
    // Créer le directeur
    const directeur = await User.create({
      nom: 'Directeur Principal',
      email: 'directeur@test.com',
      password: 'dir123',
      role: 'directeur'
    });
    console.log('✓ Directeur créé:', directeur.nom);
    
    // Créer les formateurs
    const formateur1 = await User.create({
      nom: 'El Khomsi Tarik',
      email: 'tarik@test.com',
      password: '1234',
      role: 'formateur'
    });
    console.log('✓ Formateur 1 créé:', formateur1.nom);
    
    const formateur2 = await User.create({
      nom: 'Alaoui Ismaili Soumaya',
      email: 'soumaya@test.com',
      password: '1234',
      role: 'formateur'
    });
    console.log('✓ Formateur 2 créé:', formateur2.nom);
    
    // Créer les modules
    const module1 = await Module.create({
      nom: 'Production orale',
      volumeHoraire: 50,
      formateurId: formateur1._id,
      formateurNom: formateur1.nom,
      ordre: 1
    });
    console.log('✓ Module 1 créé:', module1.nom);
    
    const module2 = await Module.create({
      nom: 'Compréhension écrite',
      volumeHoraire: 30,
      formateurId: formateur1._id,
      formateurNom: formateur1.nom,
      ordre: 2
    });
    console.log('✓ Module 2 créé:', module2.nom);
    
    const module3 = await Module.create({
      nom: 'Grammaire appliquée',
      volumeHoraire: 40,
      formateurId: formateur2._id,
      formateurNom: formateur2.nom,
      ordre: 3
    });
    console.log('✓ Module 3 créé:', module3.nom);
    
    // Créer les séances
    const seance1 = await Seance.create({
      date: '2026-04-20',
      heureDebut: '09:00',
      heureFin: '11:00',
      moduleId: module1._id,
      moduleNom: module1.nom,
      formateurId: formateur1._id,
      formateurNom: formateur1.nom,
      objectif: 'Introduction à la prononciation française',
      deroulement: 'Exercices collectifs de phonétique et correction individuelle',
      observations: 'Bonne participation des apprenants',
      suite: 'Continuer avec les voyelles nasales',
      heures: 2,
      valideParDirecteur: true,
      dateValidation: new Date('2026-04-20')
    });
    console.log('✓ Séance 1 créée');
    
    const seance2 = await Seance.create({
      date: '2026-04-21',
      heureDebut: '14:00',
      heureFin: '16:00',
      moduleId: module1._id,
      moduleNom: module1.nom,
      formateurId: formateur1._id,
      formateurNom: formateur1.nom,
      objectif: 'Conversation en petits groupes',
      deroulement: 'Débat sur des sujets quotidiens avec correction en direct',
      observations: 'Quelques apprenants timides',
      suite: 'Proposer des sujets plus engageants',
      heures: 2,
      valideParDirecteur: true,
      dateValidation: new Date('2026-04-21')
    });
    console.log('✓ Séance 2 créée');
    
    const seance3 = await Seance.create({
      date: '2026-04-22',
      heureDebut: '10:00',
      heureFin: '12:00',
      moduleId: module2._id,
      moduleNom: module2.nom,
      formateurId: formateur1._id,
      formateurNom: formateur1.nom,
      objectif: 'Lecture de textes variés',
      deroulement: 'Analyse de textes journalistiques avec questions de compréhension',
      observations: 'Excellente compréhension globale',
      suite: 'Passer aux textes littéraires',
      heures: 2,
      valideParDirecteur: true,
      dateValidation: new Date('2026-04-22')
    });
    console.log('✓ Séance 3 créée');
    
    const seance4 = await Seance.create({
      date: '2026-04-23',
      heureDebut: '09:00',
      heureFin: '11:30',
      moduleId: module3._id,
      moduleNom: module3.nom,
      formateurId: formateur2._id,
      formateurNom: formateur2.nom,
      objectif: 'Les temps du passé',
      deroulement: 'Explication du passé composé vs imparfait avec exercices pratiques',
      observations: 'Confusion fréquente entre les deux temps',
      suite: 'Prévoir des exercices supplémentaires',
      heures: 2.5,
      valideParDirecteur: true,
      dateValidation: new Date('2026-04-23')
    });
    console.log('✓ Séance 4 créée');
    
    const seance5 = await Seance.create({
      date: '2026-04-24',
      heureDebut: '14:00',
      heureFin: '15:30',
      moduleId: module3._id,
      moduleNom: module3.nom,
      formateurId: formateur2._id,
      formateurNom: formateur2.nom,
      objectif: 'Accord des adjectifs',
      deroulement: 'Révision systématique des règles d\'accord avec corpus de phrases',
      observations: 'Meilleure compréhension après révision',
      suite: 'Préparer l\'évaluation',
      heures: 1.5,
      valideParDirecteur: false
    });
    console.log('✓ Séance 5 créée (non validée)');
    
    const seance6 = await Seance.create({
      date: '2026-04-25',
      heureDebut: '10:00',
      heureFin: '12:00',
      moduleId: module1._id,
      moduleNom: module1.nom,
      formateurId: formateur1._id,
      formateurNom: formateur1.nom,
      objectif: 'Intonation et rythme du français',
      deroulement: 'Travail sur l\'intonation avec ressources audios',
      observations: 'Progression sensible',
      suite: 'Séance bilan prévue',
      heures: 2,
      valideParDirecteur: false
    });
    console.log('✓ Séance 6 créée (non validée)');
    
    console.log('\n✓ Données de test importées avec succès !');
    process.exit(0);
  } catch (error) {
    console.error('✗ Erreur lors du seed:', error);
    process.exit(1);
  }
}

seed();
