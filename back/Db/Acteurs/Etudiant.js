const mongoose = require('mongoose');


const etudiantSchema = new mongoose.Schema({
    nomPrenom: String,
    matricule: String,
    filier: String,
    email: String,
    section:String,
    password:String,
    etat:Boolean,
    etat_cnx:{type:Boolean, default:false},
    photo_profile:{type:String,default:"/public/other.jpg"},
    binome: { type: mongoose.Types.ObjectId, ref: 'etudiant' },
    encadreur: { type: mongoose.Types.ObjectId, ref: 'encadreur' }, 
    theme: { type: mongoose.Types.ObjectId,ref:'pfe'},
    etatChercheBinome:{type:Boolean, default: false}
});

const etudiantModel = mongoose.model('etudiant', etudiantSchema);

module.exports = { etudiantModel };
