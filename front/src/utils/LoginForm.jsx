import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-regular-svg-icons';

export default function LoginForm() {
  return (
    <div className="flex justify-center items-center bg-transparent">

      <div className="max-w-lg mx-auto bg-gray-800 bg-opacity-70 p-8 rounded shadow-lg">

        <h2 className="text-2xl font-bold mb-4 text-center text-white">Se connecter</h2>

        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-300 font-semibold mb-2">Email :</label>
          <input type="text" id="email" name="email" className="w-full px-3 py-2 border bg-transparent rounded-md focus:outline-none focus:border-blue-500 text-white placeholder-gray-400" placeholder="Entrez votre email" />
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-300 font-semibold mb-2">Mot de passe :</label>
          <input type="password" id="password" name="password" className="w-full px-3 py-2 border bg-transparent rounded-md focus:outline-none focus:border-blue-500 text-white placeholder-gray-400" placeholder="Entrez votre mot de passe" />
          <div className='flex flex-col justify-center items-center mt-2 '>
            <a href='/Reset' className='text-blue-500 hover:underline'>Mot de passe oublié ?</a>
            <div className="flex items-center "> 
              <FontAwesomeIcon icon={faQuestionCircle} style={{ color: 'white', marginRight: '0.5rem' }}/> 
              <a href='/Info' className='text-blue-500 hover:underline flex items-center'>Je ne connais pas mon login ! </a>
            </div>
          </div>
        </div>


        <div className="flex justify-center">
          <button type="submit" className="bg-blue-500 text-white font-semibold px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Se connecter</button>
        </div>


      </div>
    </div>
  );
}
