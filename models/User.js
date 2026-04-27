const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Schéma pour les utilisateurs (formateurs et directeurs)
const userSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['formateur', 'directeur'],
    required: true
  },
  actif: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Middleware pour hasher le mot de passe avant de sauvegarder
userSchema.pre('save', async function(next) {
  // Si le mot de passe n'a pas changé, ne pas le re-hasher
  if (!this.isModified('password')) {
    return next();
  }
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Méthode pour comparer le mot de passe entré avec le mot de passe hashé
userSchema.methods.comparePassword = async function(passwordEntree) {
  return await bcrypt.compare(passwordEntree, this.password);
};

module.exports = mongoose.model('User', userSchema);
