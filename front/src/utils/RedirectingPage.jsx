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
          <a href="/" className="text-black text-2xl font-bold ml-3 hover:text-blue-500">PFE à Distance</a>
        </div>
      </header>
      <div className='flex flex-grow justify-center items-center  text-black '>
        <div className="text-center p-4 rounded-lg h-52 flex flex-col items-center justify-center">
          <div className='flex items-center gap-2'>
          <h3 className='font-bold text-md'>Vous n'êtes pas autorisé à voir cette page. Veuillez vous connecter en tant qu'administrateur pour continuer.</h3>
          <FaExclamationTriangle style={{color:'red'}} />
          </div>
          <div className='flex flex-row justify-center items-center gap-14 mt-2'>
          <Link to='/' className='flex flex-row items-center justify-center border p-2 bg-red-500 hover:bg-red-600 text-white rounded-md'>  <IoIosArrowBack/> Retour à l'accueil</Link>
          <Link to='/LoginAdmin' className='hover:bg-blue-600 border bg-blue-500 text-white p-2 rounded-md'>Continuer la connexion</Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
