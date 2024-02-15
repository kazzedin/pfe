import React from 'react';
import { FaHome, FaUserGraduate, FaChalkboardTeacher, FaInbox, FaCog, FaBookOpen, FaFileAlt } from 'react-icons/fa';

export default function Sidebar(props) {
  return (
    <div className={`${props.sidebar ? "hidden" : "block"} fixed left-0 top-0 bottom-0 w-64 bg-gray-800 bg-opacity-50 opacity-9 px-4 py-2`}>

      <div className='my-2 mb-4'>
        <h1 className='text-2x text-white font-bold'>Admin Dashboard</h1>
      </div>

      <hr />

      <ul className='mt-3 text-white font-bold'>
        <li className='mb-2 rounded hover:shadow hover:text-blue-500 py-2'>
          <a href="/" className='px-3'>
            <FaHome className='inline-block w-6 h-6 mr-2 -mt-2'></FaHome>
            Home
          </a>
        </li>

        <li className='mb-2 rounded hover:shadow hover:text-blue-500 py-2'>
          <a href="/" className='px-3'>
            <FaBookOpen className='inline-block w-6 h-6 mr-2 -mt-2'></FaBookOpen>
            Pfe
          </a>
        </li>

        <li className='mb-2 rounded hover:shadow hover:text-blue-500 py-2'>
          <a href="/" className='px-3'>
            <FaUserGraduate className='inline-block w-6 h-6 mr-2 -mt-2'></FaUserGraduate>
            Etudiant
          </a>
        </li>

        <li className='mb-2 rounded hover:shadow hover:text-blue-500 py-2'>
          <a href="/" className='px-3'>
            <FaChalkboardTeacher className='inline-block w-6 h-6 mr-2 -mt-2'></FaChalkboardTeacher>
            Prof
          </a>
        </li>

        <li className='mb-2 rounded hover:shadow hover:text-blue-500 py-2'>
          <a href="/" className='px-3'>
            <FaInbox className='inline-block w-6 h-6 mr-2 -mt-2'></FaInbox>
            Inbox
          </a>
        </li>

        <li className='mb-2 rounded hover:shadow hover:text-blue-500 py-2'>
          <a href="/" className='px-3'>
            <FaFileAlt className='inline-block w-6 h-6 mr-2 -mt-2'></FaFileAlt>
            Docs
          </a>
        </li>

        <li className='mb-2 rounded hover:shadow hover:text-blue-500 py-2'>
          <a href="/" className='px-3'>
            <FaCog className='inline-block w-6 h-6 mr-2 -mt-2'></FaCog>
            Settings
          </a>
        </li>
      </ul>

    </div>
  )
}
