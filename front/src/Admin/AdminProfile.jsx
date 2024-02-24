// Import necessary libraries
import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { FaEye, FaEyeSlash, FaCheck, FaTimes } from 'react-icons/fa';
import { IoIosArrowBack } from 'react-icons/io';
import { AdminUserContext } from './AdminUserProvider';

// Define the Profile component
export default function Profile() {
  // Define state variables
  const [change, setChange] = useState(false);
  const [inputs, setInputs] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [showPassword3, setShowPassword3] = useState(false);
  const navigate = useNavigate();
  const { adminUserEmail } = useContext(AdminUserContext);
  const { passwordAdmin } = useContext(AdminUserContext);

  // Define function to return to Admin page
  const returnAdmin = (e) => {
    e.preventDefault();
    navigate('/Admin');
  };

  // Define function to handle inputs
  const handleInputs = (e) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  // Set default axios configurations
  axios.defaults.withCredentials = true;

  // Define function to handle save action
  const handleSave = (e) => {
    e.preventDefault();
    if (inputs.password === inputs.confirmPassword) {
      axios.put('http://localhost:3001/admin/profil', { email: inputs.email, password: inputs.password, find: adminUserEmail })
        .then((res) => {
          if (res.data.message === 'Success') {
            setChange(false);
            alert('Your information has been successfully updated. You are being redirected to the login page.');
            axios.get('http://localhost:3001/admin/logout')
              .then(res => {
                navigate('/LoginAdmin');
                console.log(res);
              })
              .catch(err => console.log(err));
          } else {
            alert('An error occurred');
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setPasswordMatch(false);
    }
  };

  // Define function to handle image change
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Define function to toggle password visibility
  const handleShowPassword = (passwordType, e) => {
    e.preventDefault();
    switch (passwordType) {
      case 'current':
        setShowPassword1(!showPassword1);
        break;
      case 'new':
        setShowPassword2(!showPassword2);
        break;
      case 'confirm':
        setShowPassword3(!showPassword3);
        break;
      default:
        break;
    }
  };

  // Define function to cancel changes
  const handleCancel = () => {
    setChange(false);
    setInputs('')
  };

  // Render the Profile component
  return (
    <div className={`flex flex-col bg-gray-800 bg-opacity-70 ${change ? 'expanded' : 'transition-form'} profile-page`}>
    {/* Return to Admin page link */}
    <div className='flex items-center return'>
      <Link onClick={returnAdmin} className='hover:text-red-700 text-white rounded return-admin flex items-center'>
        <IoIosArrowBack className="mr-2" />
        Retourner à la page d'administration
      </Link>
    </div>
    {/* Section d'informations de profil */}
    <div className='flex items-start justify-center flex-col w-1/2 ml-20 mt-3'>
      <div className='bg-white rounded-full w-44 h-44 flex items-center justify-center overflow-hidden ml-7'>
        {selectedImage ? (
          <img src={selectedImage} alt='Sélectionné' className='h-full w-full object-cover' />
        ) : (
          <img src='/public/profil.jpg' alt='Par défaut' className='h-full w-full object-cover' />
        )}
      </div>
      {/* Bouton d'ajout d'image */}
      <label htmlFor='fileInput' className='bg-gray-800 bg-opacity-50 opacity-9 text-white rounded-md px-2 py-1 cursor-pointer hover:text-blue-500 mt-2 ml-20'>
        + Ajouter
        <input
          id='fileInput'
          type='file'
          accept='image/*'
          onChange={handleImageChange}
          className='sr-only'
        />
      </label>
    </div>
    {/* Section de formulaire de profil */}
    <div className='grid grid-cols-2 h-64 '>
      {/* Afficher les informations de profil actuelles */}
      <form className='flex flex-col items-start gap-3 first-input '>
        <div className='flex gap-2 flex-col items-center'>
          <label htmlFor='Email' className='text-gray-300 font-semibold mt-2 mr-16'>Email :</label>
          <input type='text' key='email' readOnly className='px-3 py-2 border bg-transparent rounded-md focus:outline-none focus:border-blue-500 text-white ml-24' value={adminUserEmail} />
        </div>
        <div className='flex flex-col gap-2 items-center relative'> {/* Ajouter la classe relative ici */}
          <label htmlFor='password' className='text-gray-300 font-semibold mt-2'>Mot de passe :</label>
          <div className='flex flex-row items-center '>
            <input
              type={`${showPassword1 ? 'text' : 'password'}`}
              key='password'
              readOnly
              value={passwordAdmin}
              className='px-3 py-2 border bg-transparent rounded-md focus:outline-none focus:border-blue-500 text-white ml-24' /* Ajouter pr-12 pour le padding-right afin de faire de la place pour l'icône de l'œil */
            />
            <button
              className='absolute right-0 mr-3' /* Positionner le bouton de manière absolue à droite du champ de saisie */
              onClick={(e) => handleShowPassword('current', e)}
            >
              {showPassword1 ? <FaEyeSlash style={{ color: 'white' }} /> : <FaEye style={{ color: 'white' }} />}
            </button>
          </div>
        </div>
        {/* Bouton de modification des informations */}
        {!change && (
          <button onClick={() => setChange(true)} className='text-white hover:text-blue-500 text-bold ml-24 mt-2 font-bold'>Modifier les informations ?</button>
        )}
      </form>
      {/* Formulaire pour changer les informations de profil */}
      {change && (
        <form onSubmit={handleSave} className={`flex flex-col gap-4 items-start  rounded-md p-6    `}>
          <div className='flex flex-col gap-6'>
            <div className='flex flex-col'>
              <label htmlFor='nv-Email' className='text-gray-300 font-semibold'>Nouveau Email:</label>
              <input
                type='text'
                key='newEmail'
                name='email'
                value={inputs.email || ''}
                onChange={handleInputs}
                className='px-3 py-2 border bg-transparent rounded-md focus:outline-none focus:border-blue-500 text-white placeholder-gray-400'
                placeholder='Entrer Votre Email'
              />
            </div>
            <div className='flex flex-col'>
              <label htmlFor='nv-Password' className='text-gray-300 font-semibold'>Nouveau Mot de Passe:</label>
              <div className='relative'>
                <input
                  type={`${showPassword2 ? 'text' : 'password'}`}
                  key='newPassword'
                  name='password'
                  value={inputs.password || ''}
                  onChange={handleInputs}
                  className='px-3 py-2 border bg-transparent rounded-md focus:outline-none focus:border-blue-500 text-white placeholder-gray-400 pr-12'
                  placeholder='Entrer Le Nouveau Mot de Passe'
                />
                <button
                  className='absolute right-0 mr-3 top-1/2 transform -translate-y-1/2 focus:outline-none text-gray-300'
                  onClick={(e) => handleShowPassword('new', e)}
                >
                  {showPassword2 ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
            
           <div className='flex flex-col'>
  <label htmlFor='nv-Password' className='text-gray-300 font-semibold'>Confirmer Mot de Passe:</label>
  <div className='relative'>
    <input
      type={`${showPassword3 ? 'text' : 'password'}`}
      key='confirmPassword'
      name='confirmPassword'
      value={inputs.confirmPassword || ''}
      onChange={handleInputs}
      className='px-3 py-2 border bg-transparent rounded-md focus:outline-none focus:border-blue-500 text-white placeholder-gray-400 pr-12'
      placeholder='Retaper Le Mot de Passe'
    />
    <button
      className='absolute right-0 mr-3 top-1/2 transform -translate-y-1/2 focus:outline-none text-gray-300'
      onClick={(e) => handleShowPassword('confirm', e)}
    >
      {showPassword3 ? <FaEyeSlash /> : <FaEye />}
    </button>
  </div>
  {inputs.confirmPassword && (
              <div className='flex items-center text-white  bg-opacity-45 p-1 rounded-md '>
                {inputs.confirmPassword === inputs.password ? (
                  <>
                    <p className='mr-2 text-green-600 font-bold'>Mot de Passe Correct</p>
                    <FaCheck className='text-green-500' />
                  </>
                ) : (
                  <>
                    <p className='mr-2 text-red-600 font-bold'>Mot de Passe Incorrect</p>
                    <FaTimes className='text-red-500' />
                  </>
                )}
              </div>
            )}
  
</div>
          </div>
          {/* Boutons Enregistrer et Annuler */}
          <div className='flex justify-center'>
            <button className={`bg-blue-500 hover:bg-blue-700 text-white font-bold rounded w-24 mr-4 ${inputs.confirmPassword === inputs.password ? '' : 'opacity-50 cursor-not-allowed'}`} 
              type="button" 
              onClick={handleSave}
              disabled={!(inputs.confirmPassword === inputs.password)}>
                Enregistrer
            </button>
            <button className='bg-red-500 hover:bg-red-700 text-white font-bold rounded w-24' type="button" onClick={handleCancel}>
              Annuler
            </button>
          </div>
        </form>
      )}
    </div>
  </div>
  
  );
}
