import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { BsQuestionCircle } from 'react-icons/bs';

export default function DetailsMessages({ show, showFunc, msg, updateMessageState }) {
  const [replyMessage, setReplyMessage] = useState("");
  const [foundStudent, setFoundStudent] = useState(false);
  const [typeEmail, setTypeEmail] = useState('');
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [instructionVisible, setInstructionVisible] = useState(false);

  const handleClose = () => {
    showFunc(false);
  };

  useEffect(() => {
    setButtonDisabled(!(foundStudent === 'oui' || foundStudent === 'non'));
  }, [foundStudent]);

  const handleCheckChange = (value) => {
    if (value === 'oui') {
      setFoundStudent('oui');
      setTypeEmail('verification');
    } else if (value === 'non') {
      setFoundStudent('non');
      setTypeEmail('attente');
    } else {
      setFoundStudent(false);
      setTypeEmail('');
    }
  };

  const handleReply = (e) => {
    e.preventDefault();
    if (replyMessage.trim() === '') {
      alert('Veuillez saisir un message de réponse.');
      return;
    }
    axios.post('http://localhost:3001/admin/response-contact', { message: replyMessage, sender: msg.sender })
      .then(res => {
        if (res.data.message === 'success') {
          alert('Réponse envoyée avec succès');
          setReplyMessage('');
          updateMessageState(prevMessages =>
            prevMessages.map(message =>
              message.sender === msg.sender && message.type === msg.type && message.message === msg.message ? { ...message, etat: true } : message
            )
          );
        } else {
          alert('Échec de l\'envoi de la réponse');
        }
      })
      .catch(err => console.log(err));

    axios.put('http://localhost:3001/admin/response-contact-etat', { message: msg.message, sender: msg.sender, type: msg.type })
      .then(res => console.log(res))
      .catch(err => console.log(err));
  };

  const handleNotFound = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/admin/response-login-info', { sender: msg.sender, type: typeEmail })
      .then(res => {
        if (res.data.message === 'success') {
          alert('Réponse envoyée avec succès');
          updateMessageState(prevMessages =>
            prevMessages.map(message =>
              message.sender === msg.sender && message.type === msg.type && message.message === msg.message ? { ...message, etat: true } : message
            )
          );
        } else {
          alert('Échec de l\'envoi de la réponse');
        }
      })
      .catch(err => console.log(err));

    axios.put('http://localhost:3001/admin/response-login-info-etat', { message: msg.message, sender: msg.sender, info: msg.info.nomPrenom, type: msg.type })
      .then(res => console.log(res))
      .catch(err => console.log(err));
  };

  const TypeLoginInfo = () => {
    return (
      <>
        <div className="mb-4">
          <label htmlFor="sender" className="block text-sm font-medium text-gray-700">Expéditeur:</label>
          <input type="text" id="sender" className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" value={msg.sender} readOnly />
        </div>
        <div className="mb-4">
          <label htmlFor="nom/prenom" className="block text-sm font-medium text-gray-700">Nom/Prenom:</label>
          <input type="text" id="type" className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" value={msg.info.nomPrenom} readOnly />
        </div>
        {msg.type === "login-info-etu" ? <div className="mb-4">
          <label htmlFor="matricule" className="block text-sm font-medium text-gray-700">Matricule:</label>
          <input type="text" id="type" className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" value={msg.info.matricule} readOnly />
        </div> : <p></p>}

        <div className="mb-4">
          <label htmlFor="section" className="block text-sm font-medium text-gray-700">Section:</label>
          <input type="text" id="type" className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" value={msg.info.section} readOnly />
        </div>
        <div className="mb-4">
          <label htmlFor="filier" className="block text-sm font-medium text-gray-700">Filier:</label>
          <input type="text" id="type" className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" value={msg.info.filier} readOnly />
        </div>

        <div className="flex flex-col justify-center mb-4">
          {msg.type === "login-info-etu" ? <div>
            <Link to='/Admin/ListeEtudiant' className='text-red-500'>Vas chercher l'étudiant dans la liste d'étudiants</Link>
          </div> : <div>
            <Link to='/Admin/ListeEtudiant' className='text-red-500'>Vas chercher le prof dans la liste des profs</Link>
          </div>}

          <div className="mb-4">
            {msg.type === "login-info-etu" ? <label className="block text-sm font-medium text-gray-700">Étudiant trouvé:</label> : <label className="block text-sm font-medium text-gray-700">Prof trouvé:</label>}

            <div className="flex items-center mt-1">
              <input
                id="foundYes"
                type="checkbox"
                className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
                checked={foundStudent === 'oui'}
                onChange={() => handleCheckChange('oui')}
              />
              <label htmlFor="foundYes" className="ml-3 block text-sm text-gray-700">Oui</label>
              <input
                id="foundNo"
                type="checkbox"
                className="ml-8 focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
                checked={foundStudent === 'non'}
                onChange={() => handleCheckChange('non')}
              />
              <label htmlFor="foundNo" className="ml-3 block text-sm text-gray-700">Non</label>
            </div>
          </div>
          <div className='flex flex-row gap-1 items-center justify-center'>
            <button onClick={handleClose} className="mr-2 text-white px-4 py-2 rounded-md bg-blue-500">Fermer</button>
            <button onClick={handleNotFound} disabled={buttonDisabled} className={`ml-2 text-white px-4 py-2 rounded-md bg-red-500 ${buttonDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}>Envoyer email</button>
          </div>
        </div>
      </>
    );
  }

  const DisplayInstruction = () => {
    return (
      <div className="fixed top-24  mb-2 p-4 bg-gray-100 border border-gray-300 rounded-md shadow-md w-96 ins">
        <p className="text-sm font-medium text-gray-700 mb-2">Instructions :</p>
        <ul className="list-disc list-inside text-sm text-gray-600">
          <li>Si vous cliquez sur "Oui", cela veut dire que l'étudiant a déjà reçu les informations de login. Envoyez un mail pour lui demander de vérifier.</li>
          <li>Si vous cliquez sur "Non", cela veut dire que l'étudiant avec les informations fournies ne correspond à aucun étudiant. Envoyez un mail pour lui dire qu'il doit attendre jusqu'à la mise à jour de la liste des étudiants.</li>
        </ul>
      </div>
    );
  };

  return (
    <div className={`fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center ${show ? '' : 'hidden'}`}>
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        {msg.type==='contact'? <h2 className="text-lg font-semibold mb-4">Détails de Message</h2>:<div className='flex flex-row items-center '>
        <h2 className="text-lg font-semibold mb-4">Détails de Message</h2>
        <BsQuestionCircle className='ml-36 mb-5 hover:text-blue-700' onClick={(e)=>setInstructionVisible(!instructionVisible)}/>
          </div>}
       
        {instructionVisible && <DisplayInstruction />}
        {msg.type === 'contact' ? <>
          <div className="mb-4">
            <label htmlFor="sender" className="block text-sm font-medium text-gray-700">Expéditeur:</label>
            <input type="text" id="sender" className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" value={msg.sender} readOnly />
          </div>
          <div className="mb-4">
            <label htmlFor="type" className="block text-sm font-medium text-gray-700">Type:</label>
            <input type="text" id="type" className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" value={msg.type} readOnly />
          </div>
          <div className="mb-4">
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message:</label>
            <textarea id="message" className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" value={msg.message} readOnly />
          </div>
          <div className="mb-4">
            <label htmlFor="replyMessage" className="block text-sm font-medium text-gray-700">Répondre:</label>
            <textarea id="replyMessage" className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" value={replyMessage} onChange={(e) => setReplyMessage(e.target.value)} />
          </div>
          <div className="flex justify-center">
            <button onClick={handleClose} className="mr-2 text-white px-4 py-2 rounded-md bg-blue-500">Fermer</button>
            <button onClick={handleReply} className="ml-2 text-white px-4 py-2 rounded-md bg-green-500">Répondre</button>
          </div>
        </> : <TypeLoginInfo />}
      </div>
    </div>
  );
}
