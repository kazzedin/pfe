import React from 'react';
import { FaUserGraduate, FaChalkboardTeacher, FaInbox, FaCog, FaBookOpen, FaFileAlt } from 'react-icons/fa';
import {Link} from 'react-router-dom'


export default function Sidebar(props) {
  return (
    <div className={`sidebar transition-transform duration-500 ${props.sidebar ? '-translate-x-full' : 'translate-x-0'} fixed left-0 top-0 bottom-0 w-64 bg-gray-800 bg-opacity-50 opacity-9 px-4 py-2`}>

      <div className='my-2 mb-4'>
        <h1 className='text-2x text-white font-bold'>Admin Dashboard</h1>
      </div>

      <hr />

      <ul className='mt-3 text-white font-bold'>
        
        <li className='mb-2 rounded hover:shadow hover:text-blue-500 py-2'>
          <Link to="/Admin/ListePfe" className='px-3'>
            <FaBookOpen className='inline-block w-6 h-6 mr-2 -mt-2'></FaBookOpen>
            Pfe
          </Link>
        </li>

        <li className='mb-2 rounded hover:shadow hover:text-blue-500 py-2'>
          <Link to="/Admin/ListeEtudiant" className='px-3'>
            <FaUserGraduate className='inline-block w-6 h-6 mr-2 -mt-2'></FaUserGraduate>
            Etudiant
          </Link>
        </li>

        <li className='mb-2 rounded hover:shadow hover:text-blue-500 py-2'>
          <Link to="/Admin/ListeProf" className='px-3'>
            <FaChalkboardTeacher className='inline-block w-6 h-6 mr-2 -mt-2'></FaChalkboardTeacher>
            Prof
          </Link>
        </li>

        <li className='mb-2 rounded hover:shadow hover:text-blue-500 py-2'>
          <Link to="/Admin/Inbox" className='px-3'>
            <FaInbox className='inline-block w-6 h-6 mr-2 -mt-2'></FaInbox>
            Inbox
          </Link>
        </li>

        <li className='mb-2 rounded hover:shadow hover:text-blue-500 py-2'>
          <Link to="/Admin/Docs" className='px-3'>
            <FaFileAlt className='inline-block w-6 h-6 mr-2 -mt-2'></FaFileAlt>
            Docs
          </Link>
        </li>

        <li className='mb-2 rounded hover:shadow hover:text-blue-500 py-2'>
          <Link to="/Admin/Setting" className='px-3'>
            <FaCog className='inline-block w-6 h-6 mr-2 -mt-2'></FaCog>
            Settings
          </Link>
        </li>
      </ul>

    </div>
  )
}
