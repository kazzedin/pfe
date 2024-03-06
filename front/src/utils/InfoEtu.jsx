import React, { useState,useContext } from 'react';
import Footer from './Footer';
import axios from 'axios';
import MessageContext from '../Admin/MessageProvider';
import {Link} from 'react-router-dom'

export default function InfoEtu() {
  
  const [info, setInfo] = useState({});
  const [error, setError] = useState(false);
  const { setUnreadMessages,unreadMessages } = useContext(MessageContext);
 
  const handleInfo = (e) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    setInfo(prev => ({...prev, [name]: value}));
    setError(false);
  }

  const handleEnvoi = (e) => {
    e.preventDefault();
    if (!check()) {
      setError(true);
      return;
    }
    axios.post('http://localhost:3001/admin/Login-info-etu', {
      sender: info.email,
      message: "Pas de Message",
      nom: info.nom,
      prenom: info.prenom,
      section: info.section,
      filiere: info.filiere,
      matricule: info.matricule
    })
    .then(res => {
      if(res.data.message === 'success'){
        alert("Informations envoyées avec succès Verifier Votre Email dans les 48heurs !");
        setInfo({sender:'', nom:'',prenom:'',matricule:'',section:'',filiere:''}); // Réinitialisation des champs
        setUnreadMessages(true);
      }
    })
    .catch(err => {
      console.log(err);
    });
  }

  const check = () => {
   

    if (info.email && info.nom && info.prenom && info.matricule && info.filiere==='GTR'?true : info.section) {
      if (info.matricule.length === 12) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };

  return (
    <div className='info-page flex flex-col min-h-screen'>

      <header className="bg-white py-4">
        <div className="flex items-center">
          <Link to="/" className="text-black text-2xl font-bold ml-3 hover:text-blue-500">PFE à Distance</Link>
        </div>
      </header>

      <div className='flex justify-center items-center mt-10 flex-grow  mb-10'>
        <div>
          <form className="bg-gray-100 max-w-xl mx-auto p-6 rounded shadow-lg grid grid-cols-2 gap-4" onSubmit={handleEnvoi} >
            <div className="col-span-2">
              <h2 className="text-2xl font-bold mb-4 text-center text-black">Informations Personnelles Etudiant</h2>
            </div>

            <div className="col-span-1">
              <div className="mb-4">
                <label htmlFor="email" className="block text-black font-semibold mb-2">Email :</label>
                <input type="text" id="email" name="email" className={`w-full px-3 py-2 border ${error && !info.email && 'border-red-500'} bg-transparent rounded-md focus:outline-none focus:border-blue-500 text-gray-800 placeholder-gray-600 border-gray-300`} placeholder="Entrez votre email" value={info.email || ''} onChange={handleInfo} />
              </div>

              <div className="mb-4">
                <label htmlFor="nom" className="block text-black font-semibold mb-2">Nom :</label>
                <input type="text" id="nom" name="nom" className={`w-full px-3 py-2 border ${error && !info.nom && 'border-red-500'} bg-transparent rounded-md focus:outline-none focus:border-blue-500 text-gray-800 placeholder-gray-600 border-gray-300`} placeholder="Entrez votre nom" value={info.nom || ''} onChange={handleInfo} />
              </div>
            </div>

            <div className="col-span-1">
              <div className="mb-4">
                <label htmlFor="prenom" className="block text-black font-semibold mb-2">Prénom :</label>
                <input type="text" id="prenom" name="prenom" className={`w-full px-3 py-2 border ${error && !info.prenom && 'border-red-500'} bg-transparent rounded-md focus:outline-none focus:border-blue-500 text-gray-800 placeholder-gray-600 border-gray-300`} placeholder="Entrez votre prénom" value={info.prenom || ''} onChange={handleInfo} />
              </div>

              <div className="mb-4">
                <label htmlFor="matricule" className="block text-black font-semibold mb-2">Matricule :</label>
                <input 
                  type="text" 
                  id="matricule" 
                  name="matricule" 
                  className={`w-full px-3 py-2 border ${error && !info.matricule && 'border-red-500'} ${error && info.matricule && info.matricule.length < 12 && 'input-error'} bg-transparent rounded-md focus:outline-none focus:border-blue-500 text-gray-800 placeholder-gray-600 border-gray-300`} 
                  placeholder="Entrez votre matricule" 
                  value={info.matricule || ''} 
                  onChange={handleInfo} 
                  maxLength={12} 
                />
                {error && info.matricule && info.matricule.length < 13 && (
                  <div className="text-red-600 font-bold mb-2">Le matricule doit comporter exactement 13 caractères.</div>
                )}
              </div>
            </div>

            <div className="col-span-2">
              <div className="mb-4">
                <label htmlFor="filiere" className="block text-black font-semibold mb-2">Filière :</label>
                <select
                  id="filiere"
                  name="filiere"
                  value={info.filiere || ''}
                  onChange={handleInfo}
                  className={`w-full px-3 py-2 border ${error && !info.filiere && 'border-red-500'} bg-transparent rounded-md focus:outline-none focus:border-blue-500 text-gray-800 placeholder-gray-600 border-gray-300`}
                >
                  <option value="" className='text-black'>Sélectionner votre filière</option>
                  <option value="ACAD" className='text-black'>ACAD</option>
                  <option value="ISIL" className='text-black'>ISIL</option>
                  <option value="GTR" className='text-black'>GTR</option>
                </select>
              </div>
              
              {(info.filiere === 'ACAD' || info.filiere === 'ISIL') && (
                <div className="mb-4">
                  <label htmlFor="section" className="block text-black font-semibold mb-2">Section :</label>
                  <select
                    id="section"
                    name="section"
                    value={info.section || ''}
                    onChange={handleInfo}
                    className={`w-full px-3 py-2 border ${error && !info.section && 'border-red-500'} bg-transparent rounded-md focus:outline-none focus:border-blue-500 text-gray-800 placeholder-gray-600 border-gray-300`}
                  >
                    <option value="">Sélectionner votre section</option>
                    {info.filiere === 'ACAD' && (
                      <>
                        <option value="ACAD_A" className='text-black'>ACAD A</option>
                        <option value="ACAD_B" className='text-black'>ACAD B</option>
                        <option value="ACAD_C" className='text-black'>ACAD C</option>
                      </>
                    )}
                    {info.filiere === 'ISIL' && (
                      <>
                        <option value="ISIL_A" className='text-black'>ISIL A</option>
                        <option value="ISIL_B" className='text-black'>ISIL B</option>
                      </>
                    )}
                  </select>
                </div>
              )}

              {error && (
                <div className="text-red-600 font-bold mb-4">Veuillez remplir tous les champs.</div>
              )}

              <div className="text-gray-800 text-sm mb-4">
                En remplissant ce formulaire, l'administration vous enverra vos informations de connexion par email. Merci !
              </div>

              <div className="flex justify-center">
                <button 
                  className={`text-white font-semibold px-4 py-2 rounded ${check() ? 'bg-blue-600 hover:bg-blue-700 focus:outline-none' :  'bg-blue-600 bg-opacity-70 cursor-not-allowed'}`} 
                  disabled={!check()}
                >
                  Envoyer
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <Footer/> 
    </div>
  );
}
