import React, { useState } from 'react';
import Footer from './Footer';

export default function Info() {
  const [sepcialiter, setSpecialiter] = useState('');
  const [section, setSection] = useState('');

  const handleChoixSpecialiter = (event) => {
    const choice = event.target.value;
    setSpecialiter(choice);
    // Reset subChoice when mainChoice changes
    setSection('');
  };

  const handleChoixSection = (event) => {
    setSection(event.target.value);
  };

  return (
    <div className='info-page flex flex-col min-h-screen'>

      <header className="bg-gray-800 py-4">
        <div className="flex items-center">
          <a href="/" className="text-white text-xl font-bold ml-3 hover:text-blue-500">Pfe a Distance</a>
        </div>
      </header>

      <div className='flex justify-center items-center mt-43 flex-grow'>
        <div>
          <form className="form-info bg-gray-800 max-w-xl mx-auto bg-opacity-70 p-6 rounded shadow-lg grid grid-cols-2 gap-4" >
            <div className="col-span-1">
              <h2 className="text-2xl font-bold mb-4 text-center text-white ml-48">Personnel Information</h2>

              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-300 font-semibold mb-2">Email :</label>
                <input type="text" id="email" name="email" className="w-full px-3 py-2 border bg-transparent rounded-md focus:outline-none focus:border-blue-500 text-white placeholder-gray-400" placeholder="Entrez votre email" />
              </div>

              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-300 font-semibold mb-2">Nom :</label>
                <input type="text" id="nom" name="nom" className="w-full px-3 py-2 border bg-transparent rounded-md focus:outline-none focus:border-blue-500 text-white placeholder-gray-400" placeholder="Entrez votre nom" />
              </div>

              <div className="mb-4">
                <label htmlFor="prenom" className="block text-gray-300 font-semibold mb-2">Prenom :</label>
                <input type="text" id="prenom" name="prenom" className="w-full px-3 py-2 border bg-transparent rounded-md focus:outline-none focus:border-blue-500 text-white placeholder-gray-400" placeholder="Entrez votre Prenom" />
              </div>

              <div className="mb-4">
                <label htmlFor="matricule" className="block text-gray-300 font-semibold mb-2">Matricule :</label>
                <input type="text" id="matricule" name="matricule" className="w-full px-3 py-2 border bg-transparent rounded-md focus:outline-none focus:border-blue-500 text-white placeholder-gray-400" placeholder="Entrez votre Matricule" />
              </div>
            </div>

            <div className=" colone-gauche col-span-1">
              <div className="mb-4">
                <label htmlFor="mainChoice" className="block text-gray-300 font-semibold mb-2">Specialiter :</label>
                <select
                  id="mainChoice"
                  name="mainChoice"
                  value={sepcialiter}
                  onChange={handleChoixSpecialiter}
                  className="w-full px-3 py-2 border bg-transparent rounded-md focus:outline-none focus:border-blue-500 text-gray-300 placeholder-gray-400"
                >
                  <option value="" className='text-black'>Selectionner votre sepecialiter</option>
                  <option value="ACAD" className='text-black'>ACAD</option>
                  <option value="ISIL" className='text-black'>ISIL</option>
                  <option value="GTR" className='text-black'>GTR</option>
                </select>
              </div>

              {(sepcialiter === 'ACAD' || sepcialiter === 'ISIL') && (
                <div className="mb-4">
                  <label htmlFor="subChoice" className="block text-gray-300 font-semibold mb-2">Section :</label>
                  <select
                    id="subChoice"
                    name="subChoice"
                    value={section}
                    onChange={handleChoixSection}
                    className="w-full px-3 py-2 border bg-transparent rounded-md focus:outline-none focus:border-blue-500 text-gray-300 placeholder-gray-400"
                  >
                    <option value="">Selectionner votre section</option>
                    {sepcialiter === 'ACAD' && (
                      <>
                        <option value="ACAD_A" className='text-black'>ACAD A</option>
                        <option value="ACAD_B" className='text-black'>ACAD B</option>
                        <option value="ACAD_C" className='text-black'>ACAD C</option>
                      </>
                    )}
                    {sepcialiter === 'ISIL' && (
                      <>
                        <option value="ISIL_A" className='text-black'>ISIL A</option>
                        <option value="ISIL_B" className='text-black'>ISIL B</option>
                      </>
                    )}
                  </select>
                </div>
              )}

              <div className="text-gray-400 text-sm mb-4">
                En remplissant ce formulaire l'administration vous envoyer votre donner de login dans l'email que vous avez entre Merci !
              </div>

              <div className="flex justify-center">
                <button type="submit" className="bg-blue-500 text-white font-semibold px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Send</button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <Footer/> 
    </div>
  )
}

