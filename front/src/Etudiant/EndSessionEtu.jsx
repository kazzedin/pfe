import React from 'react';
import Footer from '../utils/Footer';
import { Link } from 'react-router-dom';
import { FaExclamationTriangle } from 'react-icons/fa';
import { IoIosArrowBack } from 'react-icons/io';

export default function EndSessionEtu() {
  return (
    <div className='redirect-page flex flex-col min-h-screen'>
       <header className="bg-white shadow-md py-4  top-0 w-full z-50">
        <div className="flex items-center">
          <a href="/" className="text-black text-2xl font-bold ml-3 hover:text-blue-500">Pfe a Distance</a>
        </div>
      </header>
      <div className='flex flex-grow justify-center items-center  text-black '>
        <div className="text-center p-4   rounded-lg h-72 flex flex-col items-center justify-center gap-3">
          <div className='flex items-center gap-2'>
          <h3 className='font-bold text-xl'>Votre session a ete terminer </h3>
          <FaExclamationTriangle style={{color:'red'}} />
          </div>
          <div className='flex flex-row justify-center items-center gap-24 mt-2'>
          <Link to='/' className='flex flex-row items-center justify-center border rounded-md bg-blue-500 text-white p-2 hover:bg-blue-700'>  <IoIosArrowBack/> Retourner home page et fait login</Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
