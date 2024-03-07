const mongoose = require('mongoose');

const docsSchema = new mongoose.Schema({
  titre: String,
  distinataire: String,
  file: {
    data: Buffer, // Données binaires du fichier
    contentType: String, // Type MIME du fichier
    filename:String
  }
});

const docsModel = mongoose.model('docs', docsSchema);

module.exports = { docsModel };