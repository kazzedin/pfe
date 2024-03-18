// Importer les bibliothèques nécessaires
import React, { useState, useContext,useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { FaEye, FaEyeSlash, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { IoIosArrowBack } from 'react-icons/io';
import { AdminUserContext } from './AdminUserProvider';
import { DataAdminContext } from './DataAdminProvider';
import { BsQuestionCircle } from 'react-icons/bs';

// Définir le composant Profile
export default function Profile() {
  // Définir les variables d'état
  const [change, setChange] = useState(false);
  const [inputs, setInputs] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);
  const [showPassword, setShowPassword] = useState({ current: false, new: false, confirm: false });
  const navigate = useNavigate();
  const { adminUserEmail, passwordAdmin } = useContext(AdminUserContext);
  const [memeEmail, setMemeEmail] = useState(false);
  const [showPasswordTooltip, setShowPasswordTooltip] = useState(false);
  const { image, setImage} = useContext(DataAdminContext);

  useEffect(() => {
    axios.get(`http://localhost:3001/admin/fetch-profile/${adminUserEmail}`)
      .then(response => {
        setImage(response.data.image);
      })
      .catch(err => console.log(err));
  }, []);

  const LogOut = (e) => {
    e.preventDefault();
    const confirmLogout = window.confirm("Êtes-vous sûr de vouloir vous déconnecter ?");
    if (confirmLogout) {
      axios.get('http://localhost:3001/admin/logout')
      .then(res => {
        if (res.data.response) {
          alert('Logged out');
          navigate('/');
        } else {
          alert('Failed to logout');
        }
      })
      .catch(err => console.log(err));
    }
   
  }


  // Fonction pour retourner à la page d'administration
  const returnAdmin = (e) => {
    e.preventDefault();
    navigate('/Admin/Setting');
  };

  // Fonction pour gérer les saisies
  const handleInputs = (e) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  // Configuration par défaut d'axios
  axios.defaults.withCredentials = true;

  // Fonction pour gérer l'enregistrement
  const handleSave = (e) => {
    e.preventDefault();
      axios.put('http://localhost:3001/admin/profil', { email: inputs.email, password: inputs.password, find: adminUserEmail })
        .then((res) => {
          if (res.data.message === 'Success') {
            alert('Vos informations ont été mises à jour avec succès. Vous allez être redirigé vers la page de connexion.');
            axios.get('http://localhost:3001/admin/logout')
              .then(res => {
                navigate('/LoginAdmin');
               
              })
              .catch(err => console.log(err));
          } else {
            alert('Une erreur est survenue');
          }
        })
        .catch((err) => {
          console.log(err);
        });
    
  };

  // Fonction pour basculer la visibilité du mot de passe
  const handleShowPassword = (e, type) => {
    e.preventDefault();
    setShowPassword(prevState => ({ ...prevState, [type]: !prevState[type] }));
  };

  // Fonction pour annuler les modifications
  const handleCancel = () => {
    setChange(false);
    setInputs({});
  };

  // Fonction pour gérer l'email identique
  const HandelSame = (e) => {
    e.preventDefault();
    setMemeEmail(!memeEmail);
    if (!memeEmail) {
      setInputs(prev => ({ ...prev, email: adminUserEmail }));
    } else {
      setInputs(prev => ({ ...prev, email: '' }));
    }
  };

  // Fonction pour gérer le changement d'image
  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('image', file);
      try {
        const response = await axios.put(`http://localhost:3001/admin/changePhoto/${adminUserEmail}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        if (response.data.message === "success") {
          alert("Image changée avec succès !");
          const newImageUrl = `http://localhost:3001/images/${response.data.imageUrl}`;
          setSelectedImage(newImageUrl);
        }
      } catch (error) {
        console.error('Erreur lors du téléchargement de l\'image:', error);
      }
    }
  };

  // Rendre le composant Profile
  return (
    <div className="mx-auto my-16 profile-etu bg-gray-500 bg-opacity-5  ">
      {/* Lien pour revenir à la page d'administration */}
      <div className='flex items-center return'>
        <Link onClick={returnAdmin} className='hover:text-red-500 text-black rounded return-admin flex items-center'>
          <IoIosArrowBack className="mr-2" />
          Retourner à la page d'administration
        </Link>
      </div>
      {/* Section d'informations de profil */}
      <div className="rounded-lg p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="col-span-1">
          <div className="flex justify-center">
            <div className='w-32 h-32 bg-gray-300 rounded-full overflow-hidden'>
              {image ? (
                <img src={selectedImage || `http://localhost:3001/images/${image}` } alt='Sélectionné' className='h-full w-full object-cover' />
              ) : (
                <img src='/public/profil.jpg' alt='Par défaut' className='h-full w-full object-cover' />
              )}
            </div>
            </div>
            <p className="text-center mt-4">Photo de profil</p>
            {change && (
              <label htmlFor="fileInput" className="bg-blue-500 text-white rounded-md px-2 py-1 cursor-pointer hover:bg-blue-700 mt-2 block w-max mx-auto">
                Modifier
                <input
                  id="fileInput"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="sr-only"
                />
              </label>
            )}
          </div>
          <div className="col-span-2">
  <div className="grid grid-cols-1 gap-4">
    <p className="text-xl font-bold"><u>Information Personnelle</u></p>
    <div className="flex flex-col">
      <label htmlFor="Email" className="text-black font-semibold mt-2 mr-4">Email :</label>
      <input
        type="text"
        key="email"
        readOnly
        className="px-3 py-2 border border-gray-600 bg-white rounded-md focus:outline-none focus:border-blue-500 text-black placeholder-gray-500"
        value={adminUserEmail}
      />
    </div>
    <div className="flex flex-col">
      <label htmlFor="password" className="text-black font-semibold mt-2 mr-4">Mot de passe :</label>
      <div className="relative flex items-center">
        <input
          type={`${showPassword.current ? 'text' : 'password'}`}
          key="password"
          readOnly
          value={passwordAdmin}
          className="px-3 py-2 border border-gray-600 bg-white rounded-md focus:outline-none focus:border-blue-500 text-black placeholder-gray-500 w-full"
        />
        <button
          className="absolute right-0 mr-3 top-1/2 transform -translate-y-1/2 focus:outline-none"
          onClick={(e) => handleShowPassword(e, 'current')}
        >
          {showPassword.current ? <FaEyeSlash style={{ color: 'black' }} /> : <FaEye style={{ color: 'black' }} />}
        </button>
      </div>
    </div>
  </div>
</div>
        </div>
      </div>

      {!change && (
        <div className="flex justify-end mt-2 mb-2">
          <button onClick={() => setChange(true)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-md py-2 px-4 mr-2">Mettre à jour</button>
          <button className="bg-red-500 hover:bg-red-700 text-white font-bold rounded-md py-2 px-4" onClick={(e) => LogOut(e)}>Logout</button>
        </div>
      )}

      {change && (
        <div className="mt-8 ml-3 mr-3">
          <h1 className="text-xl font-semibold mb-4"><u>Modifier les informations</u></h1>
          <form className={`flex flex-col gap-4 items-center justify-center rounded-md`}>
            <div className='flex flex-col gap-6 w-full'>
              <div className='flex flex-col  w-full'>
                <div className='flex flex-row justify-between items-center'>
                  <label htmlFor='nv-Email' className='text-black font-semibold '>Nouveau Email:</label>
                  <button className={`${memeEmail ? 'text-red-500 hover:text-red-700' : 'text-blue-500 hover:text-blue-700'}`} onClick={(e) => HandelSame(e)}>
                    {!memeEmail ? "Garder le meme?" : "Changer l'email"}
                  </button>
                </div>
                <input
                  type='text'
                  key='newEmail'
                  name='email'
                  value={memeEmail ? adminUserEmail : inputs.email || ''}
                  onChange={handleInputs}
                  className='px-3 py-2 border border-gray-600 bg-white rounded-md focus:outline-none focus:border-blue-500 text-black placeholder-gray-500 '
                  placeholder='Entrer Votre Email'
                />
              </div>
              <div className='flex flex-col '>
                <div className='flex flex-row justify-between items-center'>
                  <label htmlFor='nv-Password' className='text-black font-semibold'>Nouveau Mot de Passe:</label>
                  <div className="relative">
                    <BsQuestionCircle
                      onMouseEnter={() => setShowPasswordTooltip(true)}
                      onMouseLeave={() => setShowPasswordTooltip(false)}
                     className='hover:text-blue-500'/>
                    {showPasswordTooltip && (
                      <div className="absolute bg-gray-700 text-white px-2 py-1 rounded-md text-xs bottom-8 left-0">Le mot de passe doit comporter au moins 6 caractères.</div>
                    )}
                  </div>
                </div>
                <div className='relative '>
                  <input
                    type={`${showPassword.new ? 'text' : 'password'}`}
                    key='newPassword'
                    name='password'
                    value={inputs.password || ''}
                    onChange={handleInputs}
                    className='px-3 py-2 border bg-white border-gray-600 rounded-md focus:outline-none focus:border-blue-500 text-black placeholder-gray-500 pr-12 w-full'
                    placeholder='Entrer Le Nouveau Mot de Passe'
                  />
                  <button
                    className='absolute right-0 mr-3 top-1/2 transform -translate-y-1/2 focus:outline-none text-black '
                    onClick={(e) => handleShowPassword(e, 'new')}
                  >
                    {showPassword.new ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>
              <div className='flex flex-col w-full '>
                <label htmlFor='nv-Password' className='text-black font-semibold'>Confirmer Mot de Passe:</label>
                <div className='relative w-full'>
                  <input
                    type={`${showPassword.confirm ? 'text' : 'password'}`}
                    key='confirmPassword'
                    name='confirmPassword'
                    value={inputs.confirmPassword || ''}
                    onChange={handleInputs}
                    className='px-3 py-2 border bg-white border-gray-600 rounded-md focus:outline-none focus:border-blue-500 text-black placeholder-gray-500  w-full'
                    placeholder='Retaper Le Mot de Passe'
                  />
                  <button
                    className='absolute right-0 mr-3 top-1/2 transform -translate-y-1/2 focus:outline-none text-black'
                    onClick={(e) => handleShowPassword(e, 'confirm')}
                  >
                    {showPassword.confirm ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                {inputs.confirmPassword && (
                  <div className='flex items-center text-black bg-opacity-45 p-1 rounded-md'>
                    {inputs.confirmPassword === inputs.password ? (
                      <>
                        <p className='mr-2 text-green-600 '>Mot de Passe Correct</p>
                        <FaCheckCircle className='text-green-600' />
                      </>
                    ) : (
                      <>
                        <p className='mr-2 text-red-600 '>Mot de Passe Incorrect</p>
                        <FaTimesCircle className='text-red-600' />
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
            <div className="flex justify-end">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-md py-2 px-4 mr-2" onClick={(e) => handleCancel(e)}>Annuler</button>
              <button
  className={`bg-green-500 hover:bg-green-700 text-white font-bold rounded-md py-2 px-4 ${!inputs.email || !inputs.password || !inputs.confirmPassword || inputs.confirmPassword !== inputs.password ? 'opacity-50 cursor-not-allowed' : ''}`}
  onClick={(e) => handleSave(e)}
  disabled={!inputs.email || !inputs.password || !inputs.confirmPassword || inputs.confirmPassword !== inputs.password}
>
  Enregistrer
</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
