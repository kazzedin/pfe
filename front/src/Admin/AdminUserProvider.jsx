import React, { createContext, useState } from 'react';

// Create a context pour gerer les information de Admin user dans les components qui ne possed pas de relation des parent fils 
export const AdminUserContext = createContext();

// Provider component
export const AdminUserProvider = ({ children }) => {
  const [adminUserEmail, setAdminUserEmail] = useState('');
  const [passwordAdmin,setPasswordAdmin ]=useState('');

  return (
    <AdminUserContext.Provider value={{ adminUserEmail, setAdminUserEmail,passwordAdmin,setPasswordAdmin }}>
      {children}
    </AdminUserContext.Provider>
  );
};
