const mongoose = require('mongoose');

const encadreurSchema = new mongoose.Schema({
    nom: String,
    prenom: String,
    specialiter: String,
    email: String,
    password:String,
});

const encadreurModel = mongoose.model('encadreur', encadreurSchema);

module.exports = { encadreurModel };
