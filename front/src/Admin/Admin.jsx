import React, { useContext, useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import { Outlet } from 'react-router-dom';
import { AdminUserContext } from './AdminUserProvider';


export default function Admin() {
  // l'utilisation de Use Context
  const {adminUserEmail}=useContext(AdminUserContext)
  const {passwordAdmin}=useContext(AdminUserContext)
  const [sideBar, setSideBar] = useState(true);
  console.log(adminUserEmail)
  console.log(passwordAdmin)
  return (
   
    
    <div className='admin-page flex min-h-screen items-center flex-col'>
      <Sidebar sidebar={sideBar}/>
    
        <Dashboard sidebar={sideBar} sidebareFunc={setSideBar}/>

        <div className="content-container flex-grow flex justify-center items-center  ">
          
          <Outlet/>
        </div>

      </div>
     
  );
}
