const mongoose = require('mongoose');

const encadreurSchema = new mongoose.Schema({
    nomPrenom: String,
    section: String,
    email: String,
    filier:String,
    password:String,
    etat:Boolean,
});

const encadreurModel = mongoose.model('encadreur', encadreurSchema);

module.exports = { encadreurModel };
