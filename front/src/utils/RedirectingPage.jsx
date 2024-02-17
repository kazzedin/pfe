import React from 'react';
import Footer from './Footer';
import { Link } from 'react-router-dom';
import { FaExclamationTriangle } from 'react-icons/fa';

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
          <h3>You Are not Allowed to see This Page. Please Login as Administrator to Continue</h3>
          <FaExclamationTriangle style={{color:'red'}} />
          </div>
          <Link to='/LoginAdmin' className='hover:text-blue-500'>Login Administrator</Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}
