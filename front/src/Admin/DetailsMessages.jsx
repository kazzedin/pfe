import React, { useState } from 'react';
import axios from 'axios'; // Importez axios

export default function DetailsMessages({ show, showFunc, msg, check, checkFunc, onReply }) {
  const [replyMessage, setReplyMessage] = useState('');

  const handleClose = () => {
    showFunc(false);
  };

  const handleReply = () => {
    if (replyMessage.trim() === '') {
      alert('Veuillez saisir un message de réponse.');
      return;
    }
    axios.post('http://localhost:3001/admin/response', { message: replyMessage, sender: msg.sender }) // Utilisez msg.sender au lieu de props.msg.sender
            .then(res => {
                if (res.data.message === 'success') {
                    alert('Response sent successfully');
                    checkFunc(!check); // Utilisez check et checkFunc au lieu de props.check et props.checkFunc
                    setReplyMessage('');
                } else {
                    alert('Failed to send response');
                }
            })
            .catch(err => console.log(err));
  };

  return (
    <div className={`fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center ${show ? '' : 'hidden'}`}>
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-lg font-semibold mb-4">Détails de l'étudiant</h2>
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
      </div>
    </div>
  );
}
