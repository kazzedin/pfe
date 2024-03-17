import React from 'react';
import { FaUserGraduate, FaChalkboardTeacher, FaInbox, FaBookOpen, FaFileAlt,FaUsers,FaInfoCircle,FaCalendar } from 'react-icons/fa';
import {Link} from 'react-router-dom'



export default function Sidebar(props) {
  const toggleSidebar = (e) => {
    e.preventDefault()
    props.sidebareFunc(!props.sidebar);
  };
  return (
    <div className={`sidebar transition-transform duration-500 ${props.sidebar ? '-translate-x-full' : 'translate-x-0'} fixed left-0 top-14 bottom-0 w-64 bg-white px-4 py-2 z-50 border-r shadow-md`}>
      <ul className='mt-3 text-black '>
        
        <li className='mb-2 rounded hover:shadow hover:text-blue-500 py-2' onClick={toggleSidebar}>
          <Link to="/Admin/ListePfe" className='px-3' >
            <FaBookOpen className='inline-block w-6 h-6 mr-2 -mt-2'></FaBookOpen>
            Pfe
          </Link>
        </li>

        <li className='mb-2 rounded hover:shadow hover:text-blue-500 py-2' onClick={toggleSidebar}>
          <Link to="/Admin/ListeEtudiant" className='px-3' >
            <FaUserGraduate className='inline-block w-6 h-6 mr-2 -mt-2'></FaUserGraduate>
            Etudiant
          </Link>
        </li>

        <li className='mb-2 rounded hover:shadow hover:text-blue-500 py-2' onClick={toggleSidebar}>
          <Link to="/Admin/ListeProf" className='px-3' >
            <FaChalkboardTeacher className='inline-block w-6 h-6 mr-2 -mt-2'></FaChalkboardTeacher>
            Prof
          </Link>
        </li>

        <li className='mb-2 rounded hover:shadow hover:text-blue-500 py-2' onClick={toggleSidebar}>
          <Link to="/Admin/Inbox" className='px-3' >
            <FaInbox className='inline-block w-6 h-6 mr-2 -mt-2'></FaInbox>
            Inbox
          </Link>
        </li>

        <li className='mb-2 rounded hover:shadow hover:text-blue-500 py-2' onClick={toggleSidebar}>
          <Link to="/Admin/Docs" className='px-3' >
            <FaFileAlt className='inline-block w-6 h-6 mr-2 -mt-2'></FaFileAlt>
            Docs
          </Link>
        </li>

        <li className='mb-2 rounded hover:shadow hover:text-blue-500 py-2' onClick={toggleSidebar}>
          <Link to="/Admin/Setting" className='px-3' >
            <FaInfoCircle className='inline-block w-6 h-6 mr-2 -mt-2'></FaInfoCircle>
            Information 
          </Link>
        </li>

        <li className='mb-2 rounded hover:shadow hover:text-blue-500 py-2' onClick={toggleSidebar}>
          <Link to="/Admin/Date" className='px-3' >
            <FaCalendar className='inline-block w-6 h-6 mr-2 -mt-2'></FaCalendar>
            Dates
          </Link>
        </li>
        <li className='mb-2 rounded hover:shadow hover:text-blue-500 py-2' onClick={toggleSidebar}>
          <Link to="/Admin/Binom-Monom" className='px-3' >
            <FaUsers className='inline-block w-6 h-6 mr-2 -mt-2'></FaUsers>
            Binomes/Monoms
          </Link>
        </li>
      </ul>

    </div>
  )
}
