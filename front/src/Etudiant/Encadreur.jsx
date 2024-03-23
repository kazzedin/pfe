import React, { useState,useContext,useEffect,useRef } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import axios from 'axios';
import { IoIosArrowBack } from 'react-icons/io';
import { BsQuestionCircle } from 'react-icons/bs';
import { FaExclamationTriangle } from 'react-icons/fa';
import { EtudiantUserContext } from './EtudiantUserProvider';
import { AiOutlineArrowUp } from 'react-icons/ai';
import { FaCopy } from 'react-icons/fa';
import CopyBubble from './components/CopyBubble';

export default function Encadreur() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showReferenceTooltip, setShowReferenceTooltip] = useState(false); 
  const { EtudiantUserEmail} = useContext(EtudiantUserContext);
  const [info,setInfo]=useState({})
  const [encadreur,setencadreur] = useState( [])
  const [encadreurtDetails,SetEncadreurDetails] = useState(null)
  const inputRef = useRef(null);
  const [copied, setCopied] = useState(false);
  const [themeRef,setThemeRef] = useState('')
  const [inputs,setInputs]=useState({});

  useEffect(() => {
    axios.get(`http://localhost:3001/etudiant/profile/${EtudiantUserEmail}`)
      .then(response => {
        setInfo(response.data.info)
      })
      .catch(err => console.log(err));
      //apres que l'encadreur y7eb yencadreer (donc cest lencadreurs qui doit fair sa)
      axios.get('http://localhost:3001/etudiant/get-encadreur')
      .then(res=>{
          setencadreur(res.data)
      })
      .catch(err=>console.log(err));
  }, []);
 
  // Fonction pour effectuer une recherche
  const handleSearch = (e) => {
    e.preventDefault();
    setSearchTerm(e.target.value);
  };

  const handleCloseWindow = (e) => {
    e.preventDefault();
    setShowModal(false);
  };
  
  const handleOpenWindow = (e, info) => {
    e.preventDefault();
    SetStudentDetails(info);
    axios.get(`http://localhost:3001/etudiant/get-theme-ref-enc/${encadreurtDetails['theme']}`)
    .then(res=>{
      setShowModal(true);
      setThemeRef(res.data.ref)
    
    })
    .catch(err=>console.log(err));
    
   
  };

  
 
// la fonction pour envoyer une invitation l'etudiant directement depuit le tableau (personne tu connais pas )
const HandelEnvoi=(e,enc_info)=>{
  e.preventDefault();
  axios.post('http://localhost:3001/etudiant/envoi-demande-enc',{recever:enc_info,sender_info:info,sender:EtudiantUserEmail})
  .then(res=>{
    if(res.data.message==='success'){
      alert('votre invitation de binome a ete bien envoyer')
    }
  })
  .catch(err=>console.log(err));
 
}


  const Window = showModal && encadreurtDetails && (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-10 flex justify-center items-center ">
      <div className="bg-white p-6 rounded-lg shadow-md w-96 fenetre">
        <div className=' flex flex-row justify-between items-center  '>
        <h2 className="text-lg font-semibold mb-4">Information Étudiant</h2>
        <div className='relative'>
          <BsQuestionCircle
            onMouseEnter={() => setShowReferenceTooltip(true)}
            onMouseLeave={() => setShowReferenceTooltip(false)}
            className='hover:text-blue-500 mb-4'
          />
          {showReferenceTooltip && (
            <div className="absolute bg-gray-700 text-white px-2 py-1 rounded-md text-xs left-0 w-72 flex flex-col items-start justify-start">
             Vous pouvez copier la reference de theme et cherche ce theme dans la liste des pfe pour avoir plus d'informations sur le theme
            </div>
          )}
        </div>
        </div>
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Nom/Prénom :</label>
          <input type="text" id="title" readOnly className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" value={encadreurtDetails['nomPrenom']} />
        </div>
        <div className="mb-4">
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">Section :</label>
          <input type="text" name="section" id="section" value={encadreurtDetails['section']} readOnly />
        </div>
        <div className="mb-4">
          <label htmlFor="file" className="block text-sm font-medium text-gray-700">Fichier :</label>
          <input type="text" id="filier" className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" value={encadreurtDetails['filier']} />
        </div>
        <div className="mb-4">
          <label htmlFor="file" className="block text-sm font-medium text-gray-700">Email :</label>
          <input type="text" id="email" className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" value={encadreurtDetails['email']} />
        </div>
        <div>
          <div className='flex flex-col gap-3'>
            <div>
            <label htmlFor="titreTheme">Titre de theme:</label>
            <input type="text" id='theme' className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" value={encadreurtDetails['theme']===null?'Pas dinformation ?':studentDetails['theme']} />
            </div>
            <div className='mb-2'>
  <label htmlFor="theme">Référence de thème:</label>
  <div className='flex flex-row items-center justify-center gap-2'>
    <input type="text" id='theme' className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" ref={inputRef} value={themeRef} style={{textIndent:'2px'}}/>
    <div className='relative'>
    <FaCopy onClick={(e) => handleCopyText(e)} className='cursor-pointer'/>
    <div className='absolute'>{copied && <CopyBubble text="Copié!"  />}</div>
     {/* Intégration de la bulle de copie */}
    </div>
  </div>
</div>
          </div>
        </div>
        <div className="flex justify-center">
          <button onClick={handleCloseWindow} className="ml-2 text-white px-4 py-2 rounded-md bg-red-500 hover:bg-red-700">Fermer</button>
        </div>

      </div>
     
    </div>
   
  );

  
  //fonction pour fair copier un text 
  const handleCopyText = (e) => {
    e.preventDefault();
    inputRef.current.select();
    document.execCommand('copy');
    window.getSelection().removeAllRanges();
    setCopied(true); // Définir l'état sur true après la copie réussie
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div className='binômes relative'>
      <div className='absolute top-0 left-0 w-full flex justify-between items-center '>
        <div className='flex justify-between items-center mb-2 w-full'>
          <Link to="/Etudiant" className='hover:text-red-500 text-black rounded flex items-center'>
            <IoIosArrowBack className='mr-2' />
            Retourner à la page d'étudiant
          </Link>
        </div>
        
      </div>

      <h1 className='font-bold text-2xl mb-4 text-black mt-4 text-center' style={{ textDecoration: 'underline' }}>Encadreures</h1>

      <div className='w-full flex flex-row justify-between items-center mt-10'>
        <div className='filter left-0 top-20 flex flex-col items-start justify-center gap-3 text-black  ml-4 mb-2 '>
          <div className='flex items-center flex-row mr-3 '>
            <label htmlFor="search" className='mr-3'>Chercher un encadreur :</label>
            <div className='relative'>
              <input
                type="text"
                placeholder="nom de l encadreur  "
                value={searchTerm}
                onChange={(e) => handleSearch(e)}
                className="border border-gray-300 rounded-md px-6 py-1  focus:outline-none focus:ring focus:border-blue-500"
                style={{ paddingLeft: '40px' }}
              />
              <FaSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-600" />
            </div>
          </div>
         
        </div>
        
      </div>
      <div className='table-container'>
        <div className='relative overflow-x-auto shadow-md sm:rounded-lg table-etudiant mt-4' style={{ maxHeight: 'calc(100vh - 300px)', overflowY: 'auto' }}>
          <table className='w-full text-sm text-left rtl:text-right  text-white '>
            <thead className='text-xs text-gray-700 uppercase bg-gray-300 dark:bg-gray-700 dark:text-gray-400'>
              <tr>
                <th scope='col' className='px-6 py-3 bg-gray-300 text-black'>
                  Nom/Prénom
                </th>
                <th scope='col' className='px-6 py-3 bg-gray-300 text-black text-center'>
                  Email
                </th>
                <th scope='col' className='px-6 py-3 bg-gray-300 text-black text-center'>
                  Filière
                </th>
                <th scope='col' className='px-6 py-3 bg-gray-300 text-black text-center'>
                  Section
                </th>
                <th scope='col' className='px-6 py-3 bg-gray-300 text-black text-center'>
                  Theme
                </th>
                <th scope='col' className='px-6 py-3 bg-gray-300 text-black text-center'>
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
  { encadreur ? encadreur
    .filter((enc, index) => {
      if (!searchTerm) return true;
      return (
        String(enc['nomPrenom']).toLowerCase().includes(searchTerm.toLowerCase()) ||
        String(enc['email']).toLowerCase().includes(searchTerm.toLowerCase()) 
      );
    })
    .map((row, index) => (
      <tr key={index} className='bg-white border-b transition duration-300 hover:bg-gray-50'>
        <td className='px-6 py-4 text-black cursor-pointer ' onClick={(e) => handleOpenWindow(e, row)}>
          {row['nomPrenom']}
        </td>
        <td className='px-6 py-4 text-black cursor-pointer text-center' onClick={(e) => handleOpenWindow(e, row)}>
          {row['email']}
        </td>
        <td className='px-6 py-4 text-black cursor-pointer text-center' onClick={(e) => handleOpenWindow(e, row)}>
          {row['filier']}
        </td>
        <td className='px-6 py-4 text-black cursor-pointer text-center' onClick={(e) => handleOpenWindow(e, row)}>
        {row['section']}
        </td>
        <td className='px-6 py-4 text-black cursor-pointer text-center' onClick={(e) => handleOpenWindow(e, row)}>
          {row['theme']===null? 'Pas de theme': row['theme']}
        </td>
        
      </tr>
    )):<h3>Pas de encadreur </h3>}
</tbody>
          </table>
          {Window}
         
        </div>
      </div>
    </div>
  );
}
