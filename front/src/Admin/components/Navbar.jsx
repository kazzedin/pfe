import React, { useState } from 'react';
import { FaBars, FaUserCircle, FaBell } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';




export default function Navbar(props) {
  const navigate=useNavigate();
  const Profile=(e)=>{
    e.preventDefault();
    navigate('/Admin/Profile');
  }
  return (
    <nav className='bg-gray-800 bg-opacity-50 opacity-9 px-4 py-3 flex justify-between w-full'>
      <div className='flex items-center text-xl'>
        <FaBars className='text-white me-4 cursor-pointer' onClick={() => { props.sidebareFunc(!props.sidebar) }} />
        <span className='text-white font-semibold'>Pfe A Distance</span>
      </div>

      <div className='flex items-center gap-x-5'>
        <div className='text-white'>
          <FaBell className='w-6 h-6' />
        </div>

        <div className='relative'>
          <button className='text-white group' onClick={Profile} >
            <FaUserCircle className='w-6 h-6 mt-1' />
          </button>
        </div>
      </div>
    </nav>
  );
}
