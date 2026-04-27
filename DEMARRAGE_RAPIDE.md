# 🚀 GUIDE DE DÉMARRAGE RAPIDE

## Installation (1 min)

```bash
cd c:\Users\ADMIN\Desktop\suivi-pedagogique
npm install
```

## Lancer l'application (2 étapes)

### Étape 1 : Insérer les données de test
```bash
node seed.js
```
✅ Crée : 1 directeur + 2 formateurs + 3 modules + 6 séances

### Étape 2 : Démarrer le serveur
```bash
npm start
```
✅ Serveur sur : http://localhost:5000

## 📖 Utiliser l'application

### Connexion FORMATEUR
1. Email: `tarik@test.com` ou `soumaya@test.com`
2. Mot de passe: `1234`
3. ➜ Accès au formulaire de saisie des séances

**Actions disponibles:**
- Sélectionner un module
- Remplir la date/horaire (heures calculées auto)
- Remplir objectif, déroulement, observations, suite
- Valider → Séance créée

### Connexion DIRECTEUR
1. Email: `directeur@test.com`
2. Mot de passe: `dir123`
3. ➜ Accès au tableau de bord

**Actions disponibles:**
- Voir toutes les séances de tous les formateurs
- Cliquer "Valider" pour approuver une séance
- Consulter 2 graphiques :
  - Modules : heures réalisées vs prévues
  - Formateurs : heures totales par personne
- Voir résumé des statistiques

## 🔧 Commandes npm

```bash
npm start          # Lancer le serveur (port 5000)
npm run dev        # Mode développement avec nodemon
npm run seed       # Réinsérer les données de test
```

## 📝 Configuration (.env)

```
MONGODB_URI=mongodb://localhost:27017/suivi-pedagogique
JWT_SECRET=votre_clé_secrète_ici
PORT=5000
NODE_ENV=development
```

## 📞 Besoin d'aide ?

- Voir `README.md` pour docs complètes
- Vérifier MongoDB est en local sur port 27017
- Consulter l'historique du terminal en cas d'erreur

---

**C'est prêt !** L'app fonctionne sans config supplémentaire. 🎉
