import React, { useContext, useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import { Outlet } from 'react-router-dom';



export default function Admin() {
  const [sideBar, setSideBar] = useState(true);
  
  return (
   
    
    <div className='admin-page flex min-h-screen items-center flex-col'>
      <Sidebar sidebar={sideBar} sidebareFunc={setSideBar}/>
    
        <Dashboard sidebar={sideBar} sidebareFunc={setSideBar}/>

        <div className=" flex-grow flex justify-center items-center relative  ">
          
          <Outlet/>
        </div>

      </div>
     
  );
}
