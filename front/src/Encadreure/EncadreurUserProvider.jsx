import React, { createContext, useState } from 'react';

// Create a context pour gerer les information de l'etudiant  dans les components qui ne possed pas de relation des parent fils 
export const EncadreurUserContext = createContext();

// Provider component
export const EncadreurUserProvider = ({ children }) => {
  const [EncadreurUserEmail, setEncadreurUserEmail] = useState('');
  const [passwordEncadreur,setPasswordEncadreur ]=useState('');

  return (
    <EncadreurUserContext.Provider value={{ EncadreurUserEmail, setEncadreurUserEmail,passwordEncadreur,setPasswordEncadreur }}>
      {children}
    </EncadreurUserContext.Provider>
  );
};
