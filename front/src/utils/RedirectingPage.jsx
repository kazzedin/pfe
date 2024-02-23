import React from 'react';
import Footer from './Footer';
import { Link } from 'react-router-dom';
import { FaExclamationTriangle } from 'react-icons/fa';
import { IoIosArrowBack } from 'react-icons/io';

export default function RedirectingPage() {
  return (
    <div className='redirect-page flex flex-col min-h-screen'>
       <header className="bg-gray-800 bg-opacity-20 py-4">
        <div className="flex items-center">
          <a href="/" className="text-white text-xl font-bold ml-3 hover:text-blue-500">Pfe a Distance</a>
        </div>
      </header>
      <div className='flex flex-grow justify-center items-center bg-gray-800 bg-opacity-60 text-white'>
        <div className="text-center p-4">
          <div className='flex items-center gap-2'>
          <h3>You are not allowed to see this page. Please login as Administrator to continue</h3>
          <FaExclamationTriangle style={{color:'red'}} />
          </div>
          <div className='flex flex-row justify-center items-center gap-24 mt-2'>
          <Link to='/' className='hover:text-red-500 flex flex-row items-center justify-center'>  <IoIosArrowBack/> Return home</Link>
          <Link to='/LoginAdmin' className='hover:text-blue-500'>Login-As-Administrator</Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
