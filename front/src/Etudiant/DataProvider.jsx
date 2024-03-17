import React, { createContext, useState } from 'react';

// Create a context pour gerer les information de Admin user dans les components qui ne possed pas de relation des parent fils 
export const DataContext = createContext();

// Provider component
export const DataProvider = ({ children }) => {
  const [image, setImage]=useState('');
  const [status,setStatus ]=useState(false);
  const [rep,setRep ]=useState(false);

  return (
    <DataContext.Provider value={{ image, setImage,status,setStatus,rep,setRep }}>
      {children}
    </DataContext.Provider>
  );
};
