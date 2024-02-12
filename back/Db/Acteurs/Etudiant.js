const mongoose = require('mongoose');

const etudiantSchema = new mongoose.Schema({
    nom: String,
    prenom: String,
    matricule: String,
    filier: String,
    email: String
});

const etudiantModel = mongoose.model('etudiant', etudiantSchema);

module.exports = { etudiantModel };
