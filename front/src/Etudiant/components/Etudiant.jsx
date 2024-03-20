import React, { useState, useContext,useEffect } from 'react';
import { FaChalkboardTeacher, FaUserFriends, FaFileAlt, FaInbox, FaCalendarAlt, FaGraduationCap, FaComments } from 'react-icons/fa';
import { DataContext } from '../DataProvider';
import { EtudiantUserContext } from '../EtudiantUserProvider';
import { Link, Outlet } from 'react-router-dom';
import axios from 'axios';

export default function Homepage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { status, image,setImage,setStatus,rep} = useContext(DataContext); // Correction : Destructurer correctement les valeurs de DataContext
  const { EtudiantUserEmail } = useContext(EtudiantUserContext);
 
  
  const toggleSidebar = (e) => {
    e.preventDefault();
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(()=>{
   axios.get(`http://localhost:3001/etudiant/getUser/${EtudiantUserEmail}`)
   .then(res=>{
    setImage(res.data.image)
    setStatus(res.data.status)
   })
   .catch(err=>console.log(err))
  },[rep])

  
  return (
    <div className='etudiant-page min-h-screen flex items-center justify-center flex-col'>
      <nav className="fixed top-0 z-50 w-full bg-white shadow-md text-black">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start rtl:justify-end">
              <button
                data-drawer-target="logo-sidebar"
                data-drawer-toggle="logo-sidebar"
                aria-controls="logo-sidebar"
                type="button"
                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              >
                <span className="sr-only">Open sidebar</span>
                <svg
                  className="w-6 h-6"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clipRule="evenodd"
                    fillRule="evenodd"
                    d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                  ></path>
                </svg>
              </button>
              <span className="self-center ml-10 text-xl font-semibold sm:text-2xl whitespace-nowrap">
               Pfe a Distance
              </span>
            </div>
            <div className="flex items-center">
              <div className="flex items-center ms-3">
                <div>
                  <Link to='/Etudiant/Profile'
                    type="button"
                    className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                    aria-expanded="false"
                    data-dropdown-toggle="dropdown-user"
                  >
                    <span className="sr-only">Open user menu</span>
                    <div className="relative"> {/* Correction : Remplacez class par className */}
                    {image ?<img className="w-9 h-9 rounded-full" src={`http://localhost:3001/images/${image}`} alt="profile"/> 
                       :<img className="w-9 h-9 rounded-full" src='profile.jpg' alt="profile"/> 
                    }
                      {/* Correction : Utilisez image au lieu de img */}
                      <span className={`bottom-0 left-7 absolute w-3 h-3 ${status  ? 'bg-green-400' : 'bg-red-500'} border-2 border-white dark:border-gray-800 rounded-full`}></span> {/* Correction : Utilisez className au lieu de class */}
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {sidebarOpen && (
        <aside
          id="logo-sidebar"
          className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 bg-white border-r shadow-md sm:translate-x-0 transition-transform duration-300 transform ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
          aria-label="Sidebar"
        >
          <div className="h-full px-3 pb-4 overflow-y-auto bg-white  ">
          <ul className="space-y-2 font-medium">
              <li onClick={toggleSidebar}>
                <Link to='/Etudiant/Binomes' className="flex items-center p-2 text-black rounded-lg  hover:bg-gray-100  group" >
                  <FaUserFriends className="w-5 h-5 text-black transition duration-75  group-hover:text-blue-500 " />
                  <span className="ms-3">Binomes</span>
                </Link>
              </li>
              <li onClick={toggleSidebar}>
                <Link to='/Etudiant/Docs' className="flex items-center p-2 text-black rounded-lg  hover:bg-gray-100  group" >
                  <FaFileAlt className="flex-shrink-0 w-5 h-5 text-black transition duration-75  group-hover:text-blue-500 " />
                  <span className="flex-1 ms-3 whitespace-nowrap">Docs</span>
                </Link>
              </li>
              <li onClick={toggleSidebar}>
                <Link to='/Etudiant/Inbox' className="flex items-center p-2 text-black rounded-lg  hover:bg-gray-100  group" >
                  <FaInbox className="flex-shrink-0 w-5 h-5 text-black transition duration-75  group-hover:text-blue-500 " />
                  <span className="flex-1 ms-3 whitespace-nowrap">Inbox</span>
                  <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">3</span>
                </Link>
              </li>
              <li onClick={toggleSidebar}>
                <Link to='/Etudiant/Dates' className="flex items-center p-2 text-black rounded-lg  hover:bg-gray-100  group" >
                  <FaCalendarAlt className="flex-shrink-0 w-5 h-5 text-black transition duration-75  group-hover:text-blue-500 " />
                  <span className="flex-1 ms-3 whitespace-nowrap">Dates</span>
                </Link>
              </li>
              <li onClick={toggleSidebar}>
                <Link to='/Etudiant/Pfe' className="flex items-center p-2 text-black rounded-lg  hover:bg-gray-100  group" >
                  <FaGraduationCap className="flex-shrink-0 w-5 h-5 text-black transition duration-75 group-hover:text-blue-500 " />
                  <span className="flex-1 ms-3 whitespace-nowrap">Pfe</span>
                </Link>
              </li>
              <li onClick={toggleSidebar}>
                <Link to='/Etudiant/Encadreur' className="flex items-center p-2 text-black rounded-lg  hover:bg-gray-100 group" >
                  <FaChalkboardTeacher className="flex-shrink-0 w-5 h-5 text-black transition duration-75  group-hover:text-blue-500 " />
                  <span className="flex-1 ms-3 whitespace-nowrap">Encadreur</span>
                </Link>
              </li>
              <li onClick={toggleSidebar}>
                <Link to='/Etudiant/Chat' className="flex items-center p-2 text-black rounded-lg  hover:bg-gray-100 group" >
                  <FaComments className="flex-shrink-0 w-5 h-5 text-black transition duration-75  group-hover:text-blue-500 " />
                  <span className="flex-1 ms-3 whitespace-nowrap">Chat groupe</span>
                </Link>
              </li>
            </ul>
          </div>
        </aside>
      )}

      <main className="mt-16 pt-2 pb-6 md:mt-20 sm:pt-2">
        <Outlet />
      </main>

      <button
        onClick={toggleSidebar}
        className="fixed top-2 left-3 z-50 flex items-center justify-center w-10 h-10 text-black bg-white rounded-md "
      >
        <svg
          className="w-6 h-6"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d={sidebarOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
          />
        </svg>
      </button>
    </div>
  );
}
