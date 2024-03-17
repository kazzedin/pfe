import React from 'react';
import { Link } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';

export default function ErrorPage() {
  return (
    <div className='error-page min-h-screen  flex justify-center items-center '>
      <div className='gap-8 py-9 px-16 mt-4'>
        <div className='flex flex-col justify-center items-center text-white gap-3'>
          <h1 className='text-4xl font-bold text-black'>Ouups !</h1>
          <h4 className='text-xl text-black font-bold'>Page non trouvè. Veuillez retourner à la page d'accueil.</h4>
          <Link to='/' className='text-white bg-blue-500 hover:bg-blue-600 p-2 rounded-md flex flex-row items-center justify-center'><IoIosArrowBack/>Page d'accueil</Link>
        </div>
        <div>
          <img src="/error.png" alt="ERREUR" className='image-error' />
        </div>
      </div>
    </div>
  );
}
