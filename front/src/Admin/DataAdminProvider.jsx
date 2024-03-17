import React, { createContext, useState } from 'react';

// Create a context pour gerer les information de Admin user dans les components qui ne possed pas de relation des parent fils 
export const DataAdminContext = createContext();

// Provider component
export const DataAdminProvider = ({ children }) => {
  const [image, setImage]=useState('');
  
  return (
    <DataAdminContext.Provider value={{ image, setImage }}>
      {children}
    </DataAdminContext.Provider>
  );
};
