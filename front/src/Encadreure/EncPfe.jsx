import React, { useState, useEffect,useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaFileDownload, FaSearch } from 'react-icons/fa';
import { IoIosArrowBack } from 'react-icons/io';
import PDFThumbnail from '../Etudiant/components/PDFThumbnail';
import { EncadreurUserContext } from './EncadreurUserProvider';

export default function EncPfe() {
  const [pfes, setPfes] = useState([]);
  const [selectedPfe, setSelectedPfe] = useState(null);
  const [searchTermTitre, setSearchTermTitre] = useState('');
  const [searchTermRef, setSearchTermRef] = useState('');
  const { EncadreurUserEmail } = useContext(EncadreurUserContext);
  const [showProposalModal, setShowProposalModal] = useState(false);
  const [inputs, setInputs] = useState({ type: 'interne' });
  const [info,setInfo]=useState({})
  const [file, setFile] = useState(null);

  useEffect(() => {
     axios.get('http://localhost:3001/encadreur/get-pfes')
      .then(res => {
        setPfes(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const handleTypeChange = (e) => {
    e.preventDefault();
    const { value } = e.target;
    setInputs(prevInputs => ({
      ...prevInputs,
      type: value
    }));
  };

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

  const handleProposalModal = () => {
    setShowProposalModal(true);
  };

  // Fonction de filtrage des PFE en fonction du terme de recherche
  const filteredPfes = pfes.filter(pfe =>
    pfe.titre.toLowerCase().includes(searchTermTitre.toLowerCase()) ||
    pfe.ref.toLowerCase().includes(searchTermRef.toLowerCase())
  );

  const HandelInputs=(e)=>{
    e.preventDefault();
    const name=e.target.name;
    const value=e.target.value;
    setInputs(item=>({...item,[name]:value}))
  }

  
  const HandelProposerPfe = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);
    formData.append('email',EncadreurUserEmail);
    formData.append('titre', inputs.titre);
    formData.append('experties', inputs.experties);
    formData.append('domaine', inputs.domaine);
    formData.append('description', inputs.description);
    formData.append('type', inputs.type);
    try {
      const response = await axios.post('http://localhost:3001/encadreur/propose_theme', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.data.message === 'success') {
        alert('Le Theme de pfe  a été bien proposer !');
        setInputs({})
        setFile(null);
        setShowProposalModal(false)
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error('Erreur lors de l\'envoi du fichier:', error.message);
    }
  };

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    setFile(uploadedFile);
  };

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
      <div className='flex items-center flex-row justify-between mr-3 '>
        <div className='flex flex-row items-center gap-1'>
          <label htmlFor="search" className='mr-3'>Chercher un theme :</label>
          <div className='relative'>
            <input
              type="text"
              placeholder="Taper le titre ou reference"
              value={searchTermTitre}
              onChange={(e) => setSearchTermTitre(e.target.value)}
              className="border border-gray-300 rounded-md px-6 py-1 focus:outline-none focus:ring focus:border-blue-500 w-72"
              style={{ paddingLeft: '40px' }} // Ajoutez cet style
            />
            <FaSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-600" />
          </div>
        </div>
        <button className='bg-blue-500 hover:bg-blue-700 rounded-md p-2 text-white' onClick={handleProposalModal}>
          Proposer un Theme +
        </button>
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
              <h2></h2> 
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
      {showProposalModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-10 flex justify-center ">
          <div className="bg-white p-8 rounded-md shadow-md fenetre-pfe">
            <h2 className="text-2xl font-semibold mb-4 text-center">Proposer un thème</h2>
            <form>
              <div className="mb-4">
                <label htmlFor="titre" className="block text-sm font-medium text-gray-700">Titre du thème</label>
                <input type="text" id="titre" name="titre" className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:border-blue-500" value={inputs.titre} onChange={(e)=>HandelInputs(e)} />
              </div>
              <div className="mb-4">
      
                <div className="mb-4">
               <label htmlFor="experties" className="block text-sm font-medium text-gray-700">Expertise requise</label>
                 <input type="text" id="experties" name="experties" className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:border-blue-500" placeholder='EX:maitriser python ...' value={inputs.experties} onChange={(e)=>HandelInputs(e)}/>
               </div>
                </div>
              <div className="mb-4">
                <label htmlFor="domaine" className="block text-sm font-medium text-gray-700">Domaine du thème</label>
                <input type="text" id="domaine" name="domaine" className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:border-blue-500" placeholder='EX:IA,DEVLOPPMENT WEB ...' value={inputs.domaine} onChange={(e)=>HandelInputs(e)}/>
              </div>
              <div className="mb-4">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description du thème</label>
                <textarea id="description" name="description" rows="4" className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:border-blue-500" value={inputs.description} onChange={(e)=>HandelInputs(e)}/>
              </div>
              <div className="mb-4">
                <label htmlFor="type" className="block text-sm font-medium text-gray-700">Type de thème</label>
                <select id="type" name="type" className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:border-blue-500" value={inputs.type} onChange={(e)=>handleTypeChange(e)}>
                  <option value="interne">Interne</option>
                  <option value="externe">Externe</option>
                </select>
              </div>
              <div className="mb-4">
                <label htmlFor="pdf" className="block text-sm font-medium text-gray-700">Fichier PDF du thème</label>
                <input type="file" id="pdf" name="pdf" accept=".pdf" className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:border-blue-500"  onChange={handleFileChange}/>
              </div>
              <div className="flex justify-end gap-2">
              <button type="submit" className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded-md" onClick={()=>setShowProposalModal(false)}>Fermer</button>
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-md" onClick={(e)=>HandelProposerPfe(e)} >Proposer</button>
              </div>
            </form>
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
