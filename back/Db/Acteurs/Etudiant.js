const mongoose = require('mongoose');

const etudiantSchema = new mongoose.Schema({
    nomPrenom: String,
    matricule: String,
    filier: String,
    email: String,
    section:String,
    password:String,
    etat:Boolean,
});

const etudiantModel = mongoose.model('etudiant', etudiantSchema);

module.exports = { etudiantModel };
