import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaFileDownload, FaSearch } from 'react-icons/fa';
import { IoIosArrowBack } from 'react-icons/io';
import PDFThumbnail from './components/PDFThumbnail';

export default function Pfe() {
  const [pfes, setPfes] = useState([]);
  const [selectedPfe, setSelectedPfe] = useState(null);
  const [searchTermTitre, setSearchTermTitre] = useState('');
  const [searchTermRef, setSearchTermRef] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3001/etudiant/get-pfes')
      .then(res => {
        setPfes(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const downloadPfeDocument = (filename) => {
    const downloadUrl = `http://localhost:3001/etudiant/download-pfe/${filename}`;
    window.open(downloadUrl, '_blank');
  };

  const handlePfeClick = (pfe) => {
    setSelectedPfe(pfe);
  };

  const handleCloseModal = () => {
    setSelectedPfe(null);
  };

  // Fonction de filtrage des PFE en fonction du terme de recherche
  const filteredPfes = pfes.filter(pfe =>
    pfe.titre.toLowerCase().includes(searchTermTitre.toLowerCase()) ||
    pfe.ref.toLowerCase().includes(searchTermRef.toLowerCase())
  );

  return (
    <div className="mx-auto p-6 date-container relative">
      <div className='absolute top-0 left-0 '>
        <div className='flex justify-start items-start mb-2 '>
          <Link to="/Etudiant" className='hover:text-red-500 text-black rounded flex items-center  '>
            <IoIosArrowBack className='mr-2' />
            Retourner à la page d'étudiant
          </Link>
        </div>
      </div>
      <h1 className="text-2xl font-semibold mb-4 mt-2 text-center" style={{ textDecoration: 'underline' }}>Themes Pfe Disponibles</h1>
      {/* Champs de recherche */}
      <div className='flex items-center flex-row mr-3 '>
        <label htmlFor="search" className='mb-4 mr-3'>Chercher un theme :</label>
        <h5>Par titre:</h5>
        <div className='relative'>
          <input
            type="text"
            placeholder="Taper le titre"
            value={searchTermTitre}
            onChange={(e) => setSearchTermTitre(e.target.value)}
            className="border border-gray-300 rounded-md px-6 py-1 mb-4 focus:outline-none focus:ring focus:border-blue-500"
            style={{ paddingLeft: '40px' }} // Ajoutez cet style
          />
          <FaSearch className="absolute left-2 top-1/3 transform -translate-y-1/2 text-gray-600" />
        </div>
        <h5>Par reference:</h5>
        <div className='relative'>
          <input
            type="text"
            placeholder="Taper le reference"
            value={searchTermRef}
            onChange={(e) => setSearchTermRef(e.target.value)}
            className="border border-gray-300 rounded-md px-6 py-1 mb-4 focus:outline-none focus:ring focus:border-blue-500"
            style={{ paddingLeft: '40px' }} // Ajoutez cet style
          />
          <FaSearch className="absolute left-2 top-1/3 transform -translate-y-1/2 text-gray-600" />
        </div>
      </div>
      <div className="grid gap-4 grid-cols-5">
        {filteredPfes.map(item => (
          <div key={item._id} className="border w-64 p-4 rounded-lg flex flex-col shadow-md cursor-pointer transform transition duration-300 hover:shadow-xl " onClick={() => handlePfeClick(item)}>
            <PDFThumbnail pdfUrl={`http://localhost:3001/etudiant/get-thumbnail/${encodeURIComponent(item.file.filename)}`} type='normal' />
            <div>
              <h3 className="font-semibold">Titre:</h3>
              <p className="text-lg">{item.titre}</p>
            </div>
            <div>
              <h3 className="font-semibold">Description:</h3>
              <p className="text-md">{item.description.split(' ').slice(0, 6).join(' ')}...</p>
            </div>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4 flex items-center justify-center"
              onClick={() => downloadPfeDocument(item.file.filename)}
            >
              <FaFileDownload className="mr-2" />
              Télécharger
            </button>
          </div>
        ))}
      </div>
      {selectedPfe && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-10 flex justify-center items-center  ">
          <div className="bg-white p-8 rounded-md shadow-md grid grid-cols-2   fenetre2">
            <div>
              <PDFThumbnail pdfUrl={`http://localhost:3001/etudiant/get-thumbnail/${encodeURIComponent(selectedPfe.file.filename)}`} type='fenetre' />
            </div>
            <div className="col-span-1">
              <h2 className="text-2xl font-semibold mb-4" style={{ textDecoration: 'underline' }}>{selectedPfe.titre}</h2>
              <h2 className="text-xl font-semibold mb-1">Description:</h2>
              <p className="text-md mb-4">{selectedPfe.description}</p>
              <div className='flex flex-row items-center justify-center gap-2 mt-6'>
                <button className="bg-red-500 text-white px-4 py-2 rounded-md" onClick={handleCloseModal}>Fermer</button>
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center justify-center" onClick={() => downloadPfeDocument(selectedPfe.file.filename)}
                  >
                    <FaFileDownload className="mr-2" />
                    Télécharger
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        {pfes.length === 0 && (
          <div className="text-center">
            <h2 className="text-lg">Aucun PFE disponible pour le moment</h2>
          </div>
        )}
      </div>
    );
  }
  
                 
