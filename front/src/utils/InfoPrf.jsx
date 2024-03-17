import React, { useState, useContext } from 'react';
import Footer from './Footer';
import axios from 'axios';
import MessageContext from '../Admin/MessageProvider';
import { Link } from 'react-router-dom';

export default function InfoPrf() {

  const [email, setEmail] = useState('');
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [filiere, setFiliere] = useState([]);
  const [section, setSection] = useState([]);
  const [error, setError] = useState(false);
  const { setUnreadMessages, unreadMessages } = useContext(MessageContext);

  const handleInfo = (e) => {
    const { name, value, checked } = e.target;
    if (name === 'email') setEmail(value);
    else if (name === 'nom') setNom(value);
    else if (name === 'prenom') setPrenom(value);
    else if (name === 'filiere') {
      if (checked) setFiliere([...filiere, value]);
      else setFiliere(filiere.filter(item => item !== value));
    }
    else if (name === 'section') {
      if (checked) setSection([...section, value]);
      else setSection(section.filter(item => item !== value));
    }
    setError(false);
  }

  const handleEnvoi = (e) => {
    e.preventDefault();
    if (!check()) {
      setError(true);
      return;
    }
    axios.post('http://localhost:3001/admin/Login-info-prf-message', {
      sender: email,
      message: "Pas de Message",
      nom: nom,
      prenom: prenom,
      section: section,
      filiere: filiere,

    })
      .then(res => {
        if (res.data.message === 'success') {
          alert("Informations envoyées avec succès Verifier Votre Email dans les 48heurs !");
          setEmail('');
          setNom('');
          setPrenom('');
          setUnreadMessages(true);
        }
        setFiliere([]);
        setSection([]);
      })
      
      .catch(err => {
        console.log(err);
      });
  }

  const check = () => {
    return (email && nom && prenom && (filiere.length > 0 && (filiere.includes('GTR') || section.length > 0)));
  }

  

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
              <h2 className="text-2xl font-bold mb-4 text-center text-black">Informations Personnelles Professeur</h2>
            </div>

            <div className="col-span-1">
              <div className="mb-4">
                <label htmlFor="email" className="block text-black font-semibold mb-2">Email :</label>
                <input type="text" id="email" name="email" className={`w-full px-3 py-2 border ${error && !email && 'border-red-500'} bg-transparent rounded-md focus:outline-none focus:border-blue-500 text-gray-800 placeholder-gray-600 border-gray-300`} placeholder="Entrez votre email" value={email} onChange={handleInfo} />
              </div>

              <div className="mb-4">
                <label htmlFor="nom" className="block text-black font-semibold mb-2">Nom :</label>
                <input type="text" id="nom" name="nom" className={`w-full px-3 py-2 border ${error && !nom && 'border-red-500'} bg-transparent rounded-md focus:outline-none focus:border-blue-500 text-gray-800 placeholder-gray-600 border-gray-300`} placeholder="Entrez votre nom" value={nom} onChange={handleInfo} />
              </div>
            </div>

            <div className="col-span-1">
              <div className="mb-4">
                <label htmlFor="prenom" className="block text-black font-semibold mb-2">Prénom :</label>
                <input type="text" id="prenom" name="prenom" className={`w-full px-3 py-2 border ${error && !prenom && 'border-red-500'} bg-transparent rounded-md focus:outline-none focus:border-blue-500 text-gray-800 placeholder-gray-600 border-gray-300`} placeholder="Entrez votre prénom" value={prenom} onChange={handleInfo} />
              </div>
            </div>

            <div className="col-span-2">
              <div className="mb-4">
                <label className="block text-black font-semibold mb-2">Filières :</label>
                <div className="flex flex-wrap">
                  <label className="inline-flex items-center mr-4 mb-2">
                    <input type="checkbox" name="filiere" value="ACAD" onChange={handleInfo} className="form-checkbox text-blue-500 h-5 w-5" />
                    <span className="ml-2 text-gray-700">ACAD</span>
                  </label>
                  <label className="inline-flex items-center mr-4 mb-2">
                    <input type="checkbox" name="filiere" value="ISIL" onChange={handleInfo} className="form-checkbox text-blue-500 h-5 w-5" />
                    <span className="ml-2 text-gray-700">ISIL</span>
                  </label>
                  <label className="inline-flex items-center mb-2">
                    <input type="checkbox" name="filiere" value="GTR" onChange={handleInfo} className="form-checkbox text-blue-500 h-5 w-5" />
                    <span className="ml-2 text-gray-700">GTR</span>
                  </label>
                </div>
              </div>

              <div className="mb-4">
  <label className="block text-black font-semibold mb-2">Sections :</label>
  <div className="flex flex-wrap">
    <label className="inline-flex items-center mr-4 mb-2">
      <input type="checkbox" name="section" value="ACAD_A" onChange={handleInfo} className="form-checkbox text-blue-500 h-5 w-5" disabled={(filiere.length === 1 && filiere[0] === 'GTR')||filiere.includes('ISIL')&&!filiere.includes('ACAD')} />
      <span className={`ml-2 text-gray-700 ${(filiere.length === 1 && filiere[0] === 'GTR'||filiere.includes('ISIL')&&!filiere.includes('ACAD')) && 'opacity-50'}`}>ACAD A</span>
    </label>
    <label className="inline-flex items-center mr-4 mb-2">
      <input type="checkbox" name="section" value="ACAD_B" onChange={handleInfo} className="form-checkbox text-blue-500 h-5 w-5" disabled={(filiere.length === 1 && filiere[0] === 'GTR')||filiere.includes('ISIL')&&!filiere.includes('ACAD')} />
      <span className={`ml-2 text-gray-700 ${(filiere.length === 1 && filiere[0] === 'GTR'||filiere.includes('ISIL')&&!filiere.includes('ACAD')) && 'opacity-50'}`}>ACAD B</span>
    </label>
    <label className="inline-flex items-center mr-4 mb-2">
      <input type="checkbox" name="section" value="ACAD_C" onChange={handleInfo} className="form-checkbox text-blue-500 h-5 w-5" disabled={(filiere.length === 1 && filiere[0] === 'GTR')||filiere.includes('ISIL')&&!filiere.includes('ACAD')} />
      <span className={`ml-2 text-gray-700 ${(filiere.length === 1 && filiere[0] === 'GTR'||filiere.includes('ISIL')&&!filiere.includes('ACAD')) && 'opacity-50'}`}>ACAD C</span>
    </label>
    <label className="inline-flex items-center mr-4 mb-2">
      <input type="checkbox" name="section" value="ISIL_A" onChange={handleInfo} className="form-checkbox text-blue-500 h-5 w-5" disabled={(filiere.length === 1 && filiere[0] === 'GTR')||filiere.includes('ACAD')&&!filiere.includes('ISIL')} />
      <span className={`ml-2 text-gray-700 ${(filiere.length === 1 && filiere[0] === 'GTR'||filiere.includes('ACAD')&&!filiere.includes('ISIL')) && 'opacity-50'}`}>ISIL A</span>
    </label>
    <label className="inline-flex items-center mb-2">
      <input type="checkbox" name="section" value="ISIL_B" onChange={handleInfo} className="form-checkbox text-blue-500 h-5 w-5" disabled={(filiere.length === 1 && filiere[0] === 'GTR')||filiere.includes('ACAD')&&!filiere.includes('ISIL')} />
      <span className={`ml-2 text-gray-700 ${(filiere.length === 1 && filiere[0] === 'GTR'||filiere.includes('ACAD')&&!filiere.includes('ISIL')) && 'opacity-50'}`}>ISIL B</span>
    </label>
  </div>
</div>

              {error && (
                <div className="text-red-600 font-bold mb-4">Veuillez remplir tous les champs.</div>
              )}

              <div className="text-gray-800 text-sm mb-4">
                En remplissant ce formulaire, l'administration vous enverra vos informations de connexion par email. Merci !
              </div>

              <div className="flex justify-center">
                <button
                  className={`text-white font-semibold px-4 py-2 rounded ${check() ? 'bg-blue-600 hover:bg-blue-700 focus:outline-none' : 'bg-blue-600 bg-opacity-70 cursor-not-allowed'}`}
                  disabled={!check()}
                >
                  Envoyer
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}
