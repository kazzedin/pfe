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

export default function Binome() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showPasswordTooltip, setShowPasswordTooltip] = useState(false); 
  const [showReferenceTooltip, setShowReferenceTooltip] = useState(false); 
  const [showSecondModal, setShowSecondModal] = useState(false);
  const [showTheardModal, setShowTheardModal] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const { EtudiantUserEmail, passwordEtudiant } = useContext(EtudiantUserContext);
  const filierFilter = searchParams.get("filier");
  const [info,setInfo]=useState({})
  const [binomes,setBinomes] = useState( [])
  const [studentDetails,SetStudentDetails] = useState(null)
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
      axios.get('http://localhost:3001/etudiant/get-binomes')
      .then(res=>{
          setBinomes(res.data)
      })
      .catch(err=>console.log(err));
  }, []);
 



  const HandelInputs = (e) => {
    e.preventDefault();
  
    const name = e.target.name;
    let value;
  
    // Si l'élément est une case à cocher, utilisez la propriété checked pour obtenir sa valeur
    if (e.target.type === 'checkbox') {
      value = e.target.checked ? e.target.value : ''; // Utilisez la valeur uniquement si la case est cochée
    } else {
      value = e.target.value;
    }
  
    // Si le champ est 'matricule' et la longueur est déjà égale à 12, ne mettez pas à jour l'état
    if (name === 'matricule' && value.length > 12) {
      return;
    }
  
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  };
  const handleRadioChange = (e) => {
    const { name, value } = e.target;
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  };
 
console.log(inputs.section)

  // Fonction pour effectuer une recherche
  const handleSearch = (e) => {
    e.preventDefault();
    setSearchTerm(e.target.value);
  };

  const handleCloseWindow = (e) => {
    e.preventDefault();
    setShowModal(false);
  };
  const handleOpenSecondModal = () => {
    setShowSecondModal(true);
  };
  const handleOpenTheardModal = () => { // Correction ici : handleOpenTheardModal au lieu de handleOpenSTheardModal
    setShowTheardModal(true);
  };
  const handleCloseSecondModal = () => {
    setShowSecondModal(false);
  };
  const handleCloseTheardModal = () => {
    setShowTheardModal(false);
  };
  const handleOpenWindow = (e, info) => {
    e.preventDefault();
    SetStudentDetails(info);
    axios.get(`http://localhost:3001/etudiant/get-theme-ref/${studentDetails['theme']}`)
    .then(res=>{
      setShowModal(true);
      setThemeRef(res.data.ref)
    
    })
    .catch(err=>console.log(err));
    
   
  };

  const HandelAjouterBinome =(e)=>{
    axios.put(`http://localhost:3001/etudiant/chercheBinome/${EtudiantUserEmail}`)
    .then(res=>{
      if(res.data.message==='success'){
        alert('vous etes ajouter dans la liste des binome pour chercher un binome')
        setShowSecondModal(false)
      }else{
        alert('error')
      }
    })
    .catch(err=>console.log(err));
  }
  
 
const HandelEnvoi=(e)=>{
  e.preventDefault()
  axios.post('http://localhost:3001/etudiant/envoi-demande-binome',{recever:inputs,sender_info:info,sender:EtudiantUserEmail})
  .then(res=>{
    if(res.data.message==='success'){
      alert('votre invitation de binome a ete bien envoyer')
    }else{
      alert('une erreur est servenue')
    }
  })
  .catch(err=>console.log(err));
}  

  const Window = showModal && studentDetails && (
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
          <input type="text" id="title" readOnly className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" value={studentDetails['nomPrenom']} />
        </div>
        <div className="mb-4">
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">Section :</label>
          <input type="text" name="section" id="section" value={studentDetails['section']} readOnly />
        </div>
        <div className="mb-4">
          <label htmlFor="file" className="block text-sm font-medium text-gray-700">Fichier :</label>
          <input type="text" id="filier" className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" value={studentDetails['filier']} />
        </div>
        <div className="mb-4">
          <label htmlFor="file" className="block text-sm font-medium text-gray-700">Matricule :</label>
          <input type="text" id="matricule" className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" value={studentDetails['matricule']} />
        </div>
        <div className="mb-4">
          <label htmlFor="file" className="block text-sm font-medium text-gray-700">Email :</label>
          <input type="text" id="email" className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" value={studentDetails['email']} />
        </div>
        <div>
          <div className='flex flex-col gap-3'>
            <div>
            <label htmlFor="titreTheme">Titre de theme:</label>
            <input type="text" id='theme' className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" value={studentDetails['theme']===null?'Pas dinformation ?':studentDetails['theme']} />
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

  const SecondWindow = showSecondModal && (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-10 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-96 fenetre">
        <h2 className="text-lg font-semibold mb-4">Formulaire des informations</h2>
        <div className='flex flex-col gap-2 items-start justify-center'>


          <div className='flex flex-col items-start justify-center gap-1 w-full'>  
          <label htmlFor="">Nom/Prenom: </label>
        <input type="text"  className='px-3 py-2 border bg-white border-gray-600 rounded-md focus:outline-none focus:border-blue-500 text-black placeholder-gray-500 pr-12 w-full'  readOnly value={info['nom/prenom']}/>
       
        </div>

          <div className='flex flex-col items-start justify-center gap-1 w-full '>
            <label htmlFor="">Matricule: </label>
        <input type="text"  className={`px-3 py-2 border border-gray-600  bg-white  rounded-md focus:outline-none focus:border-blue-500 text-black placeholder-gray-500 pr-12 w-full `}   readOnly value={info.matricule}/>
       
        </div>

          <div className='flex flex-col items-start justify-center gap-1 w-full'>
            <label htmlFor="">Section:</label>
        <input type="text"  className='px-3 py-2 border bg-white border-gray-600 rounded-md focus:outline-none focus:border-blue-500 text-black placeholder-gray-500 pr-12 w-full'  readOnly value={info.section}/>
        
        </div>

          <div className='flex flex-col items-start justify-center gap-1 w-full'> 
          <label htmlFor="">Filier:</label>
        <input type="text"  className='px-3 py-2 border bg-white border-gray-600 rounded-md focus:outline-none focus:border-blue-500 text-black placeholder-gray-500 pr-12 w-full'  readOnly value={info.filier}/>
        
        </div>

          <div className='flex flex-col items-start justify-center gap-1 w-full'> 
          <label htmlFor="">Email:</label>
        <input type="text"  className='px-3 py-2 border bg-white border-gray-600 rounded-md focus:outline-none focus:border-blue-500 text-black placeholder-gray-500 pr-12 w-full'  readOnly value={EtudiantUserEmail}/>
        
        </div>

          <div className='flex flex-col items-start justify-center gap-1 w-full'> 
          <label htmlFor="">Theme-Pfe:</label>
        <input type="text"  className='px-3 py-2 border bg-white border-gray-600 rounded-md focus:outline-none focus:border-blue-500 text-black placeholder-gray-500 pr-12 w-full'  readOnly value={info.theme!==null ? info.theme:'Pas de theme'}/>
        
        </div>

        </div>
        <div className='flex flex-row items-center justify-center gap-1 mt-2'>
        <button onClick={handleCloseSecondModal} className="text-white px-4 py-2 rounded-md bg-red-500 hover:bg-red-700">Fermer</button>
        <button  className="text-white px-4 py-2 rounded-md bg-blue-500 hover:bg-blue-700" onClick={(e)=>HandelAjouterBinome(e)}>Ajouter +</button>
        </div>
      </div>
    </div>
  );

  function isValidEmail(email) {
    // Expression régulière pour valider l'adresse e-mail
    const emailRegex = /^[a-zA-Z0-9._%+-]{5,}@gmail\.com$/;
    return emailRegex.test(email);
  }

  const getSectionOptions = (selectedFilier) => {
    switch (selectedFilier.toLowerCase()) {
      case 'acad':
        return ['ACAD A', 'ACAD B', 'ACAD C'];
      case 'isil':
        return ['ISIL A', 'ISIL B'];
      default:
        return [];
    }
  };


  const TheardWindow = showTheardModal && (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-10 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-96 fenetre">
        <h2 className="text-lg font-semibold mb-4">Formulaire des informations</h2>
        <div className='flex flex-col gap-2 items-start justify-center'>
          <div className="flex flex-col items-start justify-center gap-1 w-full">
            <label htmlFor="">Nom/Prenom:</label>
            <input
              type="text"
              name="nom_prenom"
              className="px-3 py-2 border bg-white border-gray-600 rounded-md focus:outline-none focus:border-blue-500 text-black placeholder-gray-500 pr-12 w-full"
              value={inputs.nom_prenom}
              onChange={(e) => HandelInputs(e)}
            />
          </div>
  
          <div className='flex flex-col items-start justify-center gap-1 w-full'>
            <label htmlFor="">Matricule:</label>
            <input type="text" name='matricule' className={`px-3 py-2  bg-white  rounded-md focus:outline-none focus:border-blue-500 text-black placeholder-gray-500 pr-12 w-full border border-gray-600`} value={inputs.matricule} onChange={(e) => HandelInputs(e)} />
          </div>
  
          <div className='flex flex-col items-start justify-center gap-1 w-full'>
            <label htmlFor="">Filier: </label>
            <input type="text" name='filier' className={`px-3 py-2 border bg-white border-gray-600 rounded-md focus:outline-none focus:border-blue-500 text-black placeholder-gray-500 pr-12 w-full`} value={inputs.filier} onChange={(e) => HandelInputs(e)} />
          </div>
  
          {inputs.filier && (
            <div className='flex flex-row items-center justify-start gap-1 w-full'>
              <label htmlFor="">Section: </label>
              {getSectionOptions(inputs.filier).map((option, index) => (
                <div key={index} className="flex items-center gap-2">
                  <label htmlFor={option} className="ml-2">{option}</label>
                  <input type="radio" id={option} name="section" value={option} checked={inputs.section === option} onChange={handleRadioChange} />
                </div>
              ))}
            </div>
          )}
  
          <div className="flex flex-col items-start justify-center gap-1 w-full">
            <label htmlFor="">Email:</label>
            <input
              type="text"
              name="email"
              className="px-3 py-2 border bg-white border-gray-600 rounded-md focus:outline-none focus:border-blue-500 text-black placeholder-gray-500 pr-12 w-full"
              value={inputs.email}
              onChange={(e) => HandelInputs(e)}
            />
            {inputs.email === '' && (
              <span className="text-red-500">Ce champ est requis</span>
            )}
            {!isValidEmail(inputs.email) && inputs.email !== '' && (
              <span className="text-red-500">Veuillez entrer une adresse email valide</span>
            )}
          </div>
  
        </div>
        <div className='flex flex-row items-center justify-center gap-1 mt-6'>
          <button onClick={handleCloseTheardModal} className="text-white px-4 py-2 rounded-md bg-red-500 hover:bg-red-700">Fermer</button>
          <button className={` ${inputs.nom_prenom === '' || inputs.email === '' || inputs.section === '' || inputs.filier === '' || inputs.matricule === '' || inputs.matricule.length < 12 || inputs.filier !== info.filier ? "cursor-not-allowed text-white px-4 py-2 rounded-md bg-green-500 opacity-50" : "text-white px-4 py-2 rounded-md bg-green-500 hover:bg-green-700"} `}
            onClick={(e) => HandelEnvoi(e)}
            disabled={inputs.nom_prenom === '' || inputs.email === '' || inputs.matricule === '' || inputs.filier === '' || inputs.section === '' || inputs.matricule.length < 12 || inputs.filier !== info.filier}>
            Envoyer invitation
          </button>
        </div>
      </div>
    </div>
  ); 
  
  const Filtered_filier = filierFilter ? binomes.filter(item => item.filier === filierFilter) : binomes;

  //cest une fonctionpour verfier si letudiant (de cette session (li raho fat7ha )) exist dans la lsited de binomes
  const chercher = () => {
    // Initialize result to false
    let result = false;
    // Loop through each binome
    binomes.forEach(item => {
      // Check if the email of the binome matches the EtudiantUserEmail
      if (item.email === EtudiantUserEmail) {
        // If found, set result to true
        result = true;
      }
    });
    // Return the result
    return result;
  };
  
  const HandleDeleteChercher = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:3001/etudiant/delete-search/${EtudiantUserEmail}`)
      .then(res => {
        if (res.data.message === 'success') {
          alert('Votre demande de recherche de binôme a bien été supprimée');
          // Mettre à jour l'état local binomes en filtrant l'élément supprimé
          setBinomes(prevBinomes => prevBinomes.filter(item => item.email !== EtudiantUserEmail));
        } else {
          alert('Une erreur est survenue lors de la suppression de la demande');
        }
      })
      .catch(err => {
      console.log(err);
      });
  };
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
        <div className='relative'>
          <BsQuestionCircle
            onMouseEnter={() => setShowPasswordTooltip(true)}
            onMouseLeave={() => setShowPasswordTooltip(false)}
            className='hover:text-blue-500'
          />
          {showPasswordTooltip && (
            <div className="absolute bg-gray-700 text-white px-2 py-1 rounded-md text-xs right-0 w-72 flex flex-col items-start justify-start">
              <p>Notez bien qu'il faut choisir un binôme de</p>
              <p className='flex flex-row items-center justify-center'>votre filière<FaExclamationTriangle style={{ color: 'red' }} className='ml-2' /></p>
            </div>
          )}
        </div>
      </div>

      <h1 className='font-bold text-2xl mb-4 text-black mt-4 text-center' style={{ textDecoration: 'underline' }}>Binômes</h1>

      <div className='w-full flex flex-row justify-between items-center mt-10'>
        <div className='filter left-0 top-20 flex flex-col items-start justify-center gap-3 text-black  ml-4 mb-2 '>
          <div className='flex items-center flex-row mr-3 '>
            <label htmlFor="search" className='mr-3'>Chercher un étudiant :</label>
            <div className='relative'>
              <input
                type="text"
                placeholder="nom de l'étudiant "
                value={searchTerm}
                onChange={(e) => handleSearch(e)}
                className="border border-gray-300 rounded-md px-6 py-1  focus:outline-none focus:ring focus:border-blue-500"
                style={{ paddingLeft: '40px' }}
              />
              <FaSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-600" />
            </div>
          </div>
          <div className='flex flex-row items-center justify-center gap-1'>
    <h4 className='text-black'>Filtre par filière :</h4>
    <Link to='?filier=ACAD' className={`border ${filierFilter === 'ACAD' ? 'bg-blue-500 text-white border border-white' : 'bg-transparent'} border-black rounded-2xl p-1   w-14 flex items-center justify-center`}>ACAD</Link>
    <Link to='?filier=ISIL' className={`border ${filierFilter === 'ISIL' ? 'bg-blue-500 text-white border border-white' : 'bg-transparent'} border-black rounded-2xl p-1  w-14 flex items-center justify-center`}>ISIL</Link>
    <Link to='?filier=GTR' className={`border ${filierFilter === 'GTR' ? 'bg-blue-500 text-white border border-white' : 'bg-transparent'} border-black rounded-2xl p-1  w-14 flex items-center justify-center`}>GTR</Link>
    {filierFilter ? <Link to='' className='ml-2 hover:text-blue-500'>Enlever le filtre ?</Link> : ""}
</div>
        </div>
        <div className='flex flex-row items-center justify-center gap-1'>
        <button className={chercher() ? "border shadow-md p-2 rounded-md bg-gray-500 text-white cursor-not-allowed" :"border shadow-md p-2 rounded-md bg-blue-500 hover:bg-blue-700 text-white" } onClick={handleOpenSecondModal}  disabled={chercher()} title={chercher() ? "Vous avez déjà ajouté vos informations dans la liste des binômes" : ""} >
          Chercher un binôme ?
        </button>
        <button className='border shadow-md p-2 rounded-md bg-blue-500 hover:bg-blue-700 text-white mr-2' onClick={handleOpenTheardModal}>
          Inviter un binôme ?
        </button>
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
                  Matricule
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
  {binomes ?Filtered_filier
    .filter((binome, index) => {
      if (!searchTerm) return true;
      return (
        String(binome['nomPrenom']).toLowerCase().includes(searchTerm.toLowerCase()) ||
        String(binome['email']).toLowerCase().includes(searchTerm.toLowerCase()) ||
        String(binome['matricule']).toLowerCase().includes(searchTerm.toLowerCase())
      );
    })
    .map((row, index) => (
      <tr key={index} className='bg-white border-b transition duration-300 hover:bg-gray-50'>
        <td className='px-6 py-4 text-black cursor-pointer ' onClick={(e) => handleOpenWindow(e, row)}>
          {row['nomPrenom']}
        </td>
        <td className='px-6 py-4 text-black cursor-pointer text-center' onClick={(e) => handleOpenWindow(e, row)}>
          {row['matricule']}
        </td>
        <td className='px-6 py-4 text-black cursor-pointer text-center' onClick={(e) => handleOpenWindow(e, row)}>
          {row['email']}
        </td>
        <td className='px-6 py-4 text-black cursor-pointer text-center' onClick={(e) => handleOpenWindow(e, row)}>
          {row['section']}
        </td>
        <td className='px-6 py-4 text-black cursor-pointer text-center' onClick={(e) => handleOpenWindow(e, row)}>
          {row['filier']}
        </td>
        <td className='px-6 py-4 text-black cursor-pointer text-center' onClick={(e) => handleOpenWindow(e, row)}>
          {row['theme']===null? 'Pas de theme': row['theme']}
        </td>
        <td className='px-6 py-4 text-black text-center'>
         
          {row['email']===EtudiantUserEmail ? <button className='bg-red-500 hover:bg-red-700 rounded-md p-2 text-white' onClick={(e)=>HandleDeleteChercher(e)}>Annuler la recherche</button>:<button className='bg-green-500 hover:bg-green-700 text-white p-2 rounded-md'>Envoyer une demande</button>}
        </td>
      </tr>
    )):<h3>Pas de binomes </h3>}
</tbody>
          </table>
          {Window}
          {SecondWindow}
          {TheardWindow}
        </div>
      </div>
    </div>
  );
}
