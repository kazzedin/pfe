import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function DetailsMessages({ show, showFunc, msg,updateMessageState }) {
  const [replyMessage, setReplyMessage] = useState("");
  const [foundStudent, setFoundStudent] = useState(false);
  const [buttonVisible, setButtonVisible] = useState(false);
  const [typeEmail, setTypeEmail] = useState('');

  const handleClose = () => {
    showFunc(false);
  };

  const handleRadioChange = (e) => {
    setFoundStudent(e.target.value === 'oui');
    setButtonVisible(true);
    setTypeEmail(e.target.value === 'oui' ? 'verification' : 'attente');
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
                type="radio"
                className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
                checked={foundStudent}
                value="oui"
                onChange={handleRadioChange}
              />
              <label htmlFor="foundYes" className="ml-3 block text-sm text-gray-700">Oui</label>
              <input
                id="foundNo"
                type="radio"
                className="ml-8 focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
                checked={!foundStudent}
                value="non"
                onChange={handleRadioChange}
              />
              <label htmlFor="foundNo" className="ml-3 block text-sm text-gray-700">Non</label>
            </div>
          </div>
          <div className='flex flex-row gap-1 items-center justify-center'>
            <button onClick={handleClose} className="mr-2 text-white px-4 py-2 rounded-md bg-blue-500">Fermer</button>
            {buttonVisible && <button onClick={handleNotFound} className="ml-2 text-white px-4 py-2 rounded-md bg-red-500">Envoyer email</button>}
          </div>
        </div>
      </>
    );
  }

  return (
    <div className={`fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center ${show ? '' : 'hidden'}`}>
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-lg font-semibold mb-4">Détails de l'étudiant</h2>
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
  )
}
