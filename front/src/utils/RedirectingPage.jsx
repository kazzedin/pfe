import React from 'react';
import Footer from './Footer';
import { Link } from 'react-router-dom';
import { FaExclamationTriangle } from 'react-icons/fa';
import { IoIosArrowBack } from 'react-icons/io';

export default function RedirectingPage() {
  return (
    <div className='redirect-page flex flex-col min-h-screen'>
       <header className="bg-white shadow-md py-4  top-0 w-full z-50">
        <div className="flex items-center">
          <a href="/" className="text-black text-2xl font-bold ml-3 hover:text-blue-500">Pfe a Distance</a>
        </div>
      </header>
      <div className='flex flex-grow justify-center items-center  text-black '>
        <div className="text-center p-4 border shadow-md rounded-lg h-52 flex flex-col items-center justify-center">
          <div className='flex items-center gap-2'>
          <h3 className='font-bold'>You Are not Allowed to see This Page. Please Login as Administrator to Continue</h3>
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
