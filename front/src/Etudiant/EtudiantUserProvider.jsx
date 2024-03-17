import React, { createContext, useState } from 'react';

// Create a context pour gerer les information de l'etudiant  dans les components qui ne possed pas de relation des parent fils 
export const EtudiantUserContext = createContext();

// Provider component
export const EtudiantUserProvider = ({ children }) => {
  const [EtudiantUserEmail, setEtudiantUserEmail] = useState('');
  const [passwordEtudiant,setPasswordEtudiant ]=useState('');

  return (
    <EtudiantUserContext.Provider value={{ EtudiantUserEmail, setEtudiantUserEmail,passwordEtudiant,setPasswordEtudiant }}>
      {children}
    </EtudiantUserContext.Provider>
  );
};
