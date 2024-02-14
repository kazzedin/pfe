import React from 'react';
import Footer from './Footer';

export default function Reset() {
  return (
    <div className='reset-page flex flex-col min-h-screen'>
      <header className="bg-gray-800 py-4">
        <div className="flex items-center">
          <a href="/" className="text-white text-xl font-bold ml-3 hover:text-blue-500">Pfe a Distance</a>
        </div>
      </header>

      <div className='flex justify-center items-center mt-43 flex-grow'>
        <div className="max-w-md mx-auto">
          <form className="bg-gray-800 bg-opacity-70 p-8 rounded shadow-lg" >
            <h2 className="text-2xl font-bold mb-4 text-center text-white">Reset</h2>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-300 font-semibold mb-2">Email :</label>
              <input type="text" id="email" name="email" className="w-full px-3 py-2 border bg-transparent rounded-md focus:outline-none focus:border-blue-500 text-white placeholder-gray-400" placeholder="Entrez votre email" />
            </div>
            <div className="text-gray-400 text-sm mb-4">
              L'administration va envoyer la page de réinitialisation du mot de passe à votre adresse e-mail. Merci !
            </div>
            <div className="flex justify-center">
              <button type="submit" className="bg-blue-500 text-white font-semibold px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Send</button>
            </div>
          </form>
        </div>
      </div>

      <Footer/>
    </div>
  );
}
