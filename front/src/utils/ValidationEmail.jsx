import React from 'react';

// Fonction de validation d'e-mail
const validateEmail = (email) => {
  // Expression régulière pour la validation de l'e-mail
  const emailRegex = /^[\w.%+-]+@etu\.usthb\.dz$/;
  return emailRegex.test(email);
}

// Exportez la fonction pour l'utiliser dans d'autres composants React
export default validateEmail;
