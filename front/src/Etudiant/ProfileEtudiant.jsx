import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaEye, FaEyeSlash, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { IoIosArrowBack } from 'react-icons/io';
import { EtudiantUserContext } from './EtudiantUserProvider';
import { DataContext } from './DataProvider';
import Switch from '@mui/material/Switch';
import { BsQuestionCircle } from 'react-icons/bs';
import axios from 'axios';

export default function ProfileEtudiant() {
  const [change, setChange] = useState(false);
  const [inputs, setInputs] = useState({ email:'', password:'', confirmPassword:'' });
  const [showPassword, setShowPassword] = useState({ current: false, new: false, confirm: false });
  const [memeEmail, setMemeEmail] = useState(false);
  const [showPasswordTooltip, setShowPasswordTooltip] = useState(false); // État pour afficher l'info-bulle
  const navigate = useNavigate();
  const { EtudiantUserEmail, passwordEtudiant } = useContext(EtudiantUserContext);
  const { setStatus, status, image, setImage, setRep, rep } = useContext(DataContext);
  const [imageUrl, setImageUrl] = useState("");
  const [info,setInfo]=useState({'nom/prenom':'',section:'',filier:'',matricule:''})

  useEffect(() => {
    axios.get(`http://localhost:3001/etudiant/profile/${EtudiantUserEmail}`)
      .then(response => {
        setImage(response.data.image);
        setStatus(response.data.status);
        setInfo(response.data.info)
      })
      .catch(err => console.log(err));
  }, [rep]);

  const HandelSwitch = (e) => {
    setStatus(!status);
    axios.put(`http://localhost:3001/etudiant/changeEtat/${EtudiantUserEmail}`, { state: !status })
      .then(res =>console.log(res.data.message))
      .catch(err => console.log(err));
      setRep(!rep)
  };

  const returnEtudiant = (e) => {
    e.preventDefault();
    navigate('/Etudiant');
  };

  const handleInputs = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setInputs(prevInputs => ({ ...prevInputs, [name]: value }));
    // Vérifier si tous les champs sont remplis et mettre à jour l'état d'enregistrement
  };

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('image', file);
      try {
        const response = await axios.put(`http://localhost:3001/etudiant/changePhoto/${EtudiantUserEmail}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        if (response.data.message === "success") {
          alert("Image changée avec succès !");
          // Mettre à jour l'image directement dans le DOM sans rafraîchissement de la page
          const newImageUrl = `http://localhost:3001/images/${response.data.imageUrl}`;
          setImageUrl(newImageUrl); // Mettre à jour l'URL de l'image dans l'état
        }
      } catch (error) {
        console.error('Erreur lors du téléchargement de l\'image:', error);
      }
    }
  };

  const handleShowPassword = (e,type) => {
    e.preventDefault();
    setShowPassword(prevState => ({ ...prevState, [type]: !prevState[type] }));
  };

  const handleCancel = (e) => {
    e.preventDefault();
    setChange(false);
    setInputs({});
  };
  const HandelSame = (e) => {
    e.preventDefault();
    setMemeEmail(!memeEmail);
    if (!memeEmail) {
      setInputs(prev => ({ ...prev, email: EtudiantUserEmail }));
    } else {
      setInputs(prev => ({ ...prev, email: '' }));
    }
  }

  const LogOut = (e) => {
    e.preventDefault();
    const confirmLogout = window.confirm("Êtes-vous sûr de vouloir vous déconnecter ?");
    if (confirmLogout) {
      axios.get('http://localhost:3001/etudiant/logout')
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
  };

  const HandeChangeInfomration=(e)=>{
      e.preventDefault();
      axios.put(`http://localhost:3001/etudiant/changement-info/${EtudiantUserEmail}`,{nvemail:inputs.email,nvpwd:inputs.password})
      .then(res=>{
        if(res.data.message==='success'){
          alert("Changement des informations fait avec succès. Vous allez être redirigé vers la page d'accueil pour refaire le login avec les nouveaux informations.")
          navigate('/');
        } else {
          alert(res.data.message);
        }
      })
      .catch(err=>console.log(err));
  }

  return (
    <div className="mx-auto my-8 profile-etu1 bg-gray-500 bg-opacity-5 relative">
  <div className="flex items-center ">
    <Link onClick={returnEtudiant} className="hover:text-red-500 text-black rounded return-admin flex items-center">
      <IoIosArrowBack className="mr-2" />
      Retourner à la page principale
    </Link>
  </div>
  <div className="rounded-lg p-4">
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4"> {/* Modifier ici pour 2 colonnes */}
    <div className="col-span-1">
          <div className="flex justify-center">
            <div className="w-52 h-52 bg-gray-300 rounded-full overflow-hidden">
              {image ? (
                <img id="profile-image" src={imageUrl || `http://localhost:3001/images/${image}`} alt="Sélectionné" className="h-full w-full object-cover" />
              ) : (
                <img src="profile.jpg" alt="Par défaut" className="h-full w-full object-cover" />
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
        <div className="col-span-1">
          <div className="grid grid-cols-1 gap-4">
            <p className='text-xl font-bold '><u>Informations Personnelles</u></p>
          <div>
            <label htmlFor="email" className="text-black font-semibold">Email :</label>
            <input type="text" id="email" readOnly value={EtudiantUserEmail} className="px-3 py-2 border border-gray-600 w-full bg-white rounded-md focus:outline-none focus:border-blue-500 text-black placeholder-gray-500" />
          </div>
          <div>
            <label htmlFor="password" className="text-black font-semibold">Mot de passe :</label>
            <div className="relative">
              <input
                type={showPassword.current ? 'text' : 'password'}
                id="password"
                readOnly
                value={passwordEtudiant}
                className="px-3 py-2 border border-gray-600 w-full bg-white rounded-md focus:outline-none focus:border-blue-500 text-black placeholder-gray-500"
              />
              <button
                className="absolute right-0 mr-3 top-1/2 transform -translate-y-1/2 focus:outline-none"
                onClick={(e) => handleShowPassword(e,'current')}
              >
                {showPassword.current ? <FaEyeSlash className="text-black" /> : <FaEye className="text-black" />}
              </button>
            </div>
          </div>
          <div>
            <label htmlFor="nom/prenom" className="text-black font-semibold">Nom/Prenom:</label>
            <input type="text" name='Nom/Prenom' readOnly className="px-3 py-2 border border-gray-600 w-full bg-white rounded-md focus:outline-none focus:border-blue-500 text-black placeholder-gray-500" value={info['nom/prenom']} />
          </div>
          <div>
            <label htmlFor="Section" className="text-black font-semibold">Section:</label>
            <input type="text" name='Section' readOnly className="px-3 py-2 border border-gray-600 w-full bg-white rounded-md focus:outline-none focus:border-blue-500 text-black placeholder-gray-500" value={info.section} />
          </div>
          <div>
            <label htmlFor="Filier" className="text-black font-semibold">Filier:</label>
            <input type="text" name='Filier' readOnly className="px-3 py-2 border border-gray-600 w-full bg-white rounded-md focus:outline-none focus:border-blue-500 text-black placeholder-gray-500" value={info.filier} />
          </div>
          <div>
            <label htmlFor="Matricule" className="text-black font-semibold">Matricule:</label>
            <input type="text" name='matricule' readOnly className="px-3 py-2 border border-gray-600 w-full bg-white rounded-md focus:outline-none focus:border-blue-500 text-black placeholder-gray-500" value={info.matricule} />
          </div>
        </div>
      </div>
      {/* Colonne pour le switch et les informations globales */}
      <div className="col-span-1 ">
          <div className="grid grid-cols-1 gap-4">
            <h1 className="text-xl font-semibold ml-8"><u>État de connexion</u></h1>
            {/* Vos éléments d'état de connexion ici */}
          <div className="flex items-center ml-8">
            <Switch
              checked={status}
              onChange={(e) => HandelSwitch(e)}
              inputProps={{ 'aria-label': 'Switch demo' }}
            />
            {status ? <p className="ml-2 text-green-600">Active</p> : <p className="ml-2 text-red-600">Non Active</p>}
          </div>
        </div>
      </div>



      <div className='col-span-1'>
          <div className="grid grid-cols-1 gap-4">
            <h1 className='text-xl font-bold'><u>Information globale</u></h1>
          <div className='flex items-start flex-col gap-3'>
            <div className='flex flex-col  w-full'>
              <label htmlFor="binome" className='font-bold'>Binome:</label>
              <input
                type="text"
                id="binome"
                readOnly
                value={"azzedin koudid"}
                className="px-3 py-2 border border-gray-600 w-full bg-white rounded-md focus:outline-none focus:border-blue-500 text-black placeholder-gray-500"
              />
            </div>
            <div className='flex flex-col w-full'>
              <label htmlFor="chatnom" className='font-bold'>Nom de Chat group:</label>
              <input
                type="text"
                id="chatnom"
                readOnly
                value={"Naja7"}
                className="px-3 py-2 border border-gray-600 w-full bg-white rounded-md focus:outline-none focus:border-blue-500 text-black placeholder-gray-500"
              />
            </div>
            <div className='flex flex-col w-full'>
              <label htmlFor="enc" className='font-bold'>Encadreur:</label>
              <input
                type="text"
                id="enc"
                readOnly
                value={"Medjadba Sanaa"}
                className="px-3 py-2 border border-gray-600 w-full bg-white rounded-md focus:outline-none focus:border-blue-500 text-black placeholder-gray-500"
              />
            </div>
          </div>
        </div>
        </div>
    </div>
    {!change && (
      <div className="flex justify-end mt-4">
        <button onClick={() => setChange(true)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-md py-2 px-4 mr-2">Mettre à jour</button>
        <button className="bg-red-500 hover:bg-red-700 text-white font-bold rounded-md py-2 px-4" onClick={(e)=>LogOut(e)}>Logout</button>
      </div>
    )}
    {change && (
      <div className="mt-8">
        <h1 className="text-lg font-semibold mb-4"><u>Modifier les informations</u></h1>
        <form className={`flex flex-col gap-4 items-center justify-center rounded-md`}>
          <div className='flex flex-col gap-6 changement'>
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
                value={memeEmail ? EtudiantUserEmail : inputs.email || ''}
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
                  onClick={(e) => handleShowPassword(e,'new')}
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
                  onClick={(e) => handleShowPassword(e,'confirm')}
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
          <div className="flex bt">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-md py-2 px-4 mr-2" onClick={(e)=>handleCancel(e)}>Annuler</button>
            <button
              className={`bg-green-500 hover:bg-green-700 text-white font-bold rounded-md py-2 px-4 ${inputs.confirmPassword === inputs.password && inputs.confirmPassword !== '' && inputs.password !=='' && inputs.email !== '' ? '' : 'opacity-50 cursor-not-allowed'}`}
              onClick={(e) => HandeChangeInfomration(e)}
              disabled={inputs.password === '' || inputs.confirmPassword === '' || inputs.confirmPassword !== inputs.password || inputs.email === ''}
            >
              Enregistrer
            </button>
          </div>
        </form>
      </div>
    )}
  </div>
</div>

  );
  
}
