const mongoose = require('mongoose');

const encadreurSchema = new mongoose.Schema({
    nomPrenom: String,
    section: String,
    email: String,
    filier: String,
    password: String,
    etat: Boolean,
    etat_cnx: { type: Boolean, default: false },
    photo_profile: { type: String, default: "/public/profil.jpg" },
    themes: [{ type: mongoose.Types.ObjectId, ref: 'pfe' }], // Changer le nom de la propriété en 'themes' et modifier le type en tableau
    etatEncadrement: { type: Boolean, default: false } // soit il encadre ou pas 
});

const encadreurModel = mongoose.model('encadreur', encadreurSchema);

module.exports = { encadreurModel };
