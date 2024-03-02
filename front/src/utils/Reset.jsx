import React from 'react';
import Footer from './Footer';

export default function Reset() {
  return (
    <div className='reset-page flex flex-col min-h-screen'>
      <header className="bg-white py-4">
        <div className="flex items-center">
          <a href="/" className="text-black text-2xl font-bold ml-3 hover:text-blue-500">Pfe à Distance</a>
        </div>
      </header>

      <div className='flex justify-center items-center mt-10 flex-grow'>
  <div className="max-w-md mx-auto">
    <form className="bg-gray-100 bg-opacity-70 p-8 rounded shadow-lg" >
      <h2 className="text-2xl font-bold mb-4 text-center text-black">Réinitialiser le mot de passe</h2>
      <div className="mb-4">
        <label htmlFor="email" className="block text-black font-semibold mb-2">Adresse e-mail :</label>
        <input type="email" id="email" name="email" className="w-full px-3 py-2 border bg-transparent rounded-md focus:outline-none focus:border-blue-500 text-black placeholder-gray-800" placeholder="Entrez votre adresse e-mail" />
      </div>
      <div className="text-gray-800 text-sm mb-4">
        Nous vous enverrons un lien de réinitialisation du mot de passe à cette adresse e-mail.
      </div>
      <div className="flex justify-center">
        <button type="submit" className="bg-blue-500 text-white font-semibold px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Envoyer</button>
      </div>
    </form>
  </div>
</div>


      <Footer/>
    </div>
  );
}
