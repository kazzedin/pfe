const mongoose = require('mongoose');

const pfeSchema = new mongoose.Schema({
    description: String,
    titre: String,
    valider:{type:String,  enum:['valider','non valider','a voir'], default:'non valider'}, 
    experties: String,
    type:{type:String,
        enum:['interne','extern']}, 
    domain:String,
    reference: {type: String,unique:true , default:null},
    encadreur: {
        type: mongoose.Types.ObjectId,
        ref: "encadreur",
        default: null
    },
    binome:{
        membre1:{type: mongoose.Types.ObjectId,ref:'etudiant',default:null},
        membre2:{type:mongoose.Types.ObjectId,ref:'etudiant',default:null},
    },
    file: {
        data: Buffer, // Données binaires du fichier
        contentType: String, // Type MIME du fichier
        filename:String
      }
});

const pfeModel = mongoose.model('pfe', pfeSchema);

module.exports = { pfeModel };
