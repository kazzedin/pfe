const generator = require('password-generator');

function genrateurpwd(email) {
    var username = email.substring(0, email.indexOf('@'));

    // Générer un mot de passe sécurisé avec password-generator
    var motDePasse = generator(10, false, /[\w\d\?\-]/);

    // Ajouter le nom d'utilisateur à la fin du mot de passe
    motDePasse += username;

    return motDePasse;
}

module.exports = genrateurpwd;
