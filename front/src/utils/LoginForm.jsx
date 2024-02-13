import React from 'react';

export default function LoginForm() {
  return (
    <div className="flex justify-center items-center bg-transparent">
      <div className="max-w-md mx-auto bg-gray-800 bg-opacity-70 p-8 rounded shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-center text-white">Login</h2>
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-300 font-semibold mb-2">Email :</label>
          <input type="text" id="username" name="username" className="w-full px-3 py-2 border bg-transparent rounded-md focus:outline-none focus:border-blue-500 text-white placeholder-gray-400" placeholder="Entrez votre email" />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-300 font-semibold mb-2">Mot de passe :</label>
          <input type="password" id="password" name="password" className="w-full px-3 py-2 border bg-transparent rounded-md focus:outline-none focus:border-blue-500 text-white placeholder-gray-400" placeholder="Entrez votre mot de passe" />
          <a href='/reset' className='text-blue-500 hover:underline'>Forgot password ?</a>
        </div>
       
        <div className="flex justify-center">
          <button type="submit" className="bg-blue-500 text-white font-semibold px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Se connecter</button>
        </div>
      </div>
    </div>
  );
}
