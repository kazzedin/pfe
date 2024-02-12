const mongoose = require('mongoose');

const pfeSchema = new mongoose.Schema({
    specialiter: String,
    theme: String,
    valider: Boolean, 
    experties: String,
    encadreur: {
        type: mongoose.Types.ObjectId,
        ref: "encadreur"
    },
});

const pfeModel = mongoose.model('pfe', pfeSchema);

module.exports = { pfeModel };
