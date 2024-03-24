import React, { useState, useEffect,useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaFileDownload, FaSearch } from 'react-icons/fa';
import { IoIosArrowBack } from 'react-icons/io';
import PDFThumbnail from './components/PDFThumbnail';
import { EncadreurUserContext } from './EncadreurUserProvider';

export default function EncPfe() {
  const [pfes, setPfes] = useState([]);
  const [selectedPfe, setSelectedPfe] = useState(null);
  const [editModal,setEditModal] =useState(false);
  const [searchTermRef, setSearchTermRef] = useState('');
  const { EncadreurUserEmail } = useContext(EncadreurUserContext);
  const [showProposalModal, setShowProposalModal] = useState(false);
  const [inputs, setInputs] = useState({ type: 'interne' });
  const [info,setInfo]=useState({})
  const [file, setFile] = useState(null);
  const [editedTheme, setEditedTheme] = useState(null)

  useEffect(() => {
    axios.get(`http://localhost:3001/encadreur/profile/${EncadreurUserEmail}`)
      .then(response => {
        setInfo(response.data.info)
      })
      .catch(err => console.log(err));

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
    pfe.reference.toLowerCase().includes(searchTermRef.toLowerCase())
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
    formData.append('email', EncadreurUserEmail);
    formData.append('nomPrenom',info['nom/prenom'])
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
        alert('Le thème de PFE a été bien proposé !');
        // Mettre à jour la liste des thèmes après ajout réussi
        setPfes(prevPfes => [...prevPfes, response.data.newPfe]);
        setInputs({type:'interne'});
        setFile(null);
        setShowProposalModal(false);
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

  const HandelDeletePfe = (e, id) => {
    e.stopPropagation();
    axios.delete(`http://localhost:3001/encadreur/delete-pfe/${EncadreurUserEmail}/${id}`,)
      .then(res => {
        if (res.data.message === 'success') {
          alert('Le thème a été supprimé avec succès');
          // Mettre à jour la liste des thèmes après suppression réussie
          setPfes(prevPfes => prevPfes.filter(pfe => pfe._id !== id));
        } else {
          alert('Une erreur est survenue lors de la suppression du thème');
        }
      })
      .catch(err => console.log(err));
  };

  const downloadDocument = (filename) => {
    const downloadUrl = `http://localhost:3001/etudiant/download-doc/${filename}`;
    window.open(downloadUrl, '_blank');
  };
  const showEditModal=(e,edited)=>{
    e.stopPropagation();
    setEditModal(true);
    setEditedTheme(edited)
  }
const closeEditModal=(e)=>{
   e.preventDefault();
   setEditModal(false);
   setEditedTheme({})//initialize
}
console.log(editedTheme)
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
              placeholder="Taper  reference"
              value={searchTermRef}
              onChange={(e) => setSearchTermRef(e.target.value)}
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
      <div className="grid gap-56 grid-cols-5 mt-3 ">
        {filteredPfes.map(item => (
          <div key={item._id} className="border w-64 p-4 rounded-lg flex flex-col shadow-md cursor-pointer transform transition duration-300 hover:shadow-xl card-pfe" onClick={() => handlePfeClick(item)}>
            <div>
              <h3 className="font-semibold">Ref : <span className='text-sm'>{item.reference}</span></h3>
          
            </div>
            <div className=' flex flex-row items-center justify-center'>
            <PDFThumbnail pdfUrl={`http://localhost:3001/etudiant/get-thumbnail/${encodeURIComponent(item.file.filename)}`} type='normal' />
            </div>
           
            <div>
              
              <p className="text-xl font-bold">{item.titre}</p>
            </div>
            <div>
            
              <p className="text-md">{item.description.split(' ').slice(0, 9).join(' ')}...</p>
            </div>
            
            {item.encadreur===info.id ?
                <div className='flex flex-row items-center justify-center gap-2 mt-3'>
                <button className='bg-red-500 hover:bg-red-700 text-white rounded-md p-2' onClick={(e)=>HandelDeletePfe(e,item._id)}>Supprimer</button>
                <button className='bg-blue-500 hover:bg-blue-700 p-2 text-white rounded-md' onClick={(e)=>showEditModal(e,item)}>Modifier</button>
               
             </div>
             :<button className='bg-blue-500 hover:bg-blue-700 p-2 text-white rounded-md flex flex-row items-center' onClick={() => downloadDocument(item.file.filename)}> <FaFileDownload className="mr-2" /> Telecharger</button>
            }
          </div>
        ))}
      </div>
      {selectedPfe && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-10 flex justify-center items-center  ">
          <div className="bg-white p-8 rounded-md shadow-md grid grid-cols-2   fenetre2">
          
            <div>
            <h3 className="font-semibold">Ref : <span className='text-sm'>{selectedPfe.reference}</span></h3>
              <PDFThumbnail pdfUrl={`http://localhost:3001/etudiant/get-thumbnail/${encodeURIComponent(selectedPfe.file.filename)}`} type='fenetre' />
            </div>
            <div className="col-span-1">
              <h2 className="text-2xl font-semibold mb-4" style={{ textDecoration: 'underline' }}>{selectedPfe.titre}</h2>
              <h2 className="text-xl font-semibold mb-1">Description:</h2>
              <p className="text-md mb-4">{selectedPfe.description}</p>
              <h2 className="text-xl font-semibold mb-1">Expertise reuquis:</h2>
              <p className="text-md mb-4">{selectedPfe.experties}</p>
              <h2 className="text-xl font-semibold mb-1">Domaine:</h2>
              <p className="text-md mb-4">{selectedPfe.domain}</p>
              <h2 className="text-xl font-semibold mb-1">Type:</h2>
              <p className="text-md mb-4">{selectedPfe.type}</p>
              <h2 className="text-xl font-semibold mb-1">Information de personne propposer :</h2>
              <div className='flex flex-col gap-1 items-start justify-center '>
              <label htmlFor="nomprenom">Nom/Prenom:
              <input type='text' className=" ml-4 text-md mb-4 border border-gray-400 p-1 rounded-md" value={selectedPfe.info.nomPrenom}></input>
              </label>
              <label htmlFor="email"> Email:
              <input type='text' className=" ml-20 text-md mb-4 border border-gray-400 p-1 rounded-md" value={selectedPfe.info.email}></input>
              </label>
              </div>
              <h2 className="text-xl font-semibold mb-1">Etat:</h2>
              <p className="text-md mb-4 text-red-600">{selectedPfe.etat}</p> 
              <div className='flex flex-row items-center justify-center gap-2 mt-6'>
                <button className="bg-red-500 text-white px-4 py-2 rounded-md" onClick={handleCloseModal}>Fermer</button>
                {selectedPfe.encadreur!==info.id ? 
                  <button className='bg-blue-500 text-white px-4 py-2 rounded-md flex flex-row items-center' onClick={() => downloadDocument(selectedPfe.file.filename)}>  <FaFileDownload className="mr-2" />Telecharger</button>:""
                }
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
     {editModal && editedTheme && (
  <div className="fixed inset-0 bg-gray-800 bg-opacity-10 flex justify-center items-center">
    <div className="bg-white p-8 rounded-md shadow-md fenetre-pfe2">
      <h2 className="text-2xl font-semibold mb-4 text-center">Modifier un thème</h2>
      <form>
        <div className="mb-4">
          <label htmlFor="titre" className="block text-sm font-medium text-gray-700">Titre du thème</label>
          <input
            type="text"
            id="titre"
            name="titre"
            className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:border-blue-500"
            value={editedTheme.titre || ''} // Assurez-vous de gérer le cas où editedTheme est null
            onChange={(e) => setEditedTheme({...editedTheme, titre: e.target.value})}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="experties" className="block text-sm font-medium text-gray-700">Expertise requise</label>
          <input
            type="text"
            id="experties"
            name="experties"
            className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:border-blue-500"
            value={editedTheme.experties || ''}
            onChange={(e) => setEditedTheme({...editedTheme, experties: e.target.value})}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="domaine" className="block text-sm font-medium text-gray-700">Domaine du thème</label>
          <input
            type="text"
            id="domaine"
            name="domaine"
            className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:border-blue-500"
            value={editedTheme.domain || ''}
            onChange={(e) => setEditedTheme({...editedTheme, domain: e.target.value})}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description du thème</label>
          <textarea
            id="description"
            name="description"
            rows="4"
            className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:border-blue-500"
            value={editedTheme.description || ''}
            onChange={(e) => setEditedTheme({...editedTheme, description: e.target.value})}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="pdf" className="block text-sm font-medium text-gray-700">Fichier PDF du thème</label>
          <input
            type="file"
            id="pdf"
            name="pdf"
            accept=".pdf"
            className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:border-blue-500"
            onChange={handleFileChange}
          />
        </div>
        <div className="flex justify-end gap-2">
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-md">Enregistrer</button>
          <button type="button" className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded-md" onClick={(e) => closeEditModal(e)}>Fermer</button>
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
