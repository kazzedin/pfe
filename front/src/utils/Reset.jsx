import React, { useState } from 'react';
import Footer from './Footer';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { FaExclamationTriangle } from 'react-icons/fa';
import { BsQuestionCircle } from 'react-icons/bs'

export default function ForgotPassword() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [result, setResult] = useState(false);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const email = searchParams.get('email');
  const [showPasswordTooltip, setShowPasswordTooltip] = useState(false); // État pour afficher l'info-bulle

  const handleSave = (e) => {
    e.preventDefault();
    checkPassword(); // Pas besoin de passer l'événement ici, car il n'est pas utilisé dans la fonction checkPassword
    if (!result) {
      axios.put('http://localhost:3001/etudiant/reset-pwd', { email, newPassword })
        .then(res => {
          if (res.data.message === 'success') {
            alert('Votre mot de passe a été bien changé');
            setNewPassword('');
            setConfirmPassword('');
          } else {
            alert(res.data.message);
            setNewPassword('');
            setConfirmPassword('');
          }
        })
        .catch(err => console.log(err));
    } else {
      console.log('error');
    }
  }

  const checkPassword = () => {
    if (newPassword !== confirmPassword) {
      setResult(true);
    } else {
      setResult(false);
    }
  }

  return (
    <div className='reset-page flex flex-col min-h-screen'>
      <header className="bg-white py-4">
        <div className="flex items-center">
          <a href="/" className="text-black text-2xl font-bold ml-3 hover:text-blue-500">Pfe à Distance</a>
        </div>
      </header>

      <div className='flex justify-center items-center mt-10 flex-grow'>
        <div className="max-w-md mx-auto">
          <form className="bg-gray-100 bg-opacity-70 p-8 rounded shadow-lg" onSubmit={handleSave}>
            <h2 className="text-2xl font-bold mb-4 text-center text-black">Réinitialiser le mot de passe</h2>
            <div className="mb-4">
              <div className='flex flex-row justify-between items-center'>
              <label htmlFor="newPassword" className="block text-black font-semibold mb-2">Nouveau mot de passe :</label>
              <div className="relative">
                      <BsQuestionCircle 
                        onMouseEnter={() => setShowPasswordTooltip(true)}
                        onMouseLeave={() => setShowPasswordTooltip(false)}
                      />
                      {showPasswordTooltip && (
                        <div className="absolute bg-gray-700 text-white px-2 py-1 rounded-md text-xs bottom-8 left-0">Le mot de passe doit comporter au moins 6 caractères.</div>
                      )}
                    </div>
              </div>
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                className="w-full px-3 py-2 border bg-transparent rounded-md focus:outline-none focus:border-blue-500 text-black placeholder-gray-800"
                placeholder="Entrez votre nouveau mot de passe"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />

              <label htmlFor="confirmPassword" className="block text-black font-semibold mb-2">Confirmer le mot de passe :</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                className={`w-full px-3 py-2 border bg-transparent rounded-md focus:outline-none focus:border-blue-500 text-black placeholder-gray-800 ${result ? 'border border-red-600' : ''}`}
                placeholder="Confirmez votre nouveau mot de passe"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {result && <h5 className='font-bold text-red-600'><FaExclamationTriangle className="inline" /> Les mots de passe ne correspondent pas</h5>}
            </div>
            <div className="text-red-500 text-sm mb-4 flex flex-row items-center gap-1">
              Veuillez noter que vous devez vous rappeler ce mot de passe, donc faites attention.
            </div>
            <div className="flex justify-center">
              <button type="submit" className="bg-blue-500 text-white font-semibold px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Sauvegarder</button>
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
}
