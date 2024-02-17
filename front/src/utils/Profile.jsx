import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { IoIosArrowBack } from 'react-icons/io';


export default function Profile() {
  const [change, setChange] = useState(false);
  const [inputs, setInputs] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [showPassword3, setShowPassword3] = useState(false);
  const navigate = useNavigate();

  const returnAdmin = (e) => {
    e.preventDefault();
    navigate('/Admin');
  };

  const handleInputs = (e) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    axios
      .put('http://localhost:3001/admin/profil', { email: inputs.email, password: inputs.password })
      .then((res) => {
        if (res.data.message === 'success') {
          alert('Vous avez changé vos informations avec succès');
          setChange(false); // Réinitialiser le mode de modification après l'enregistrement
        } else {
          alert('Une erreur est survenue');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

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

  const handleShowPassword = (passwordType,e) => {
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

  const handleCancel = () => {
    setChange(false);
  };

  return (
    <div className={`flex flex-col bg-gray-800 bg-opacity-50 profil-page  ${change ? 'expanded' : ''}`}>
      <div className='flex items-center return'>
        <Link onClick={returnAdmin} className='hover:text-red-700 text-white font-bold rounded return-admin flex items-center'>
          <IoIosArrowBack className="mr-2" />
          Return Admin Page
        </Link>
      </div>
      <div className='flex items-start justify-center flex-col w-1/2 ml-20'>
        <div className='bg-white rounded-full w-44 h-44 flex items-center justify-center overflow-hidden ml-5'>
          {selectedImage ? (
            <img src={selectedImage} alt='Selected' className='h-full w-full object-cover' />
          ) : (
            <img src='/public/profil.jpg' alt='Default' className='h-full w-full object-cover' />
          )}
        </div>
        <label htmlFor='fileInput' className='bg-gray-800 bg-opacity-50 opacity-9 text-white rounded-md px-2 py-1 cursor-pointer hover:text-blue-500 mt-2 ml-20'>
          + Add
          <input
            id='fileInput'
            type='file'
            accept='image/*'
            onChange={handleImageChange}
            className='sr-only'
          />
        </label>
      </div>

      <div className='grid grid-cols-2 h-64'>
        <form className='flex flex-col items-start gap-6  first-input ml-3'>
          <div className='flex gap-2 flex-row items-center justify-center'>
            <label htmlFor='Email' className='text-gray-300 font-semibold mb-2 mt-2 ml-8'>Email :</label>
            <input type='text' key='email' readOnly className='px-3 py-2 border bg-transparent rounded-md focus:outline-none focus:border-blue-500 text-white' value={"admin@usthb.com"} />
          </div>
          <div className='flex flex-row gap-2'>
            <label htmlFor='password' className='text-gray-300 font-semibold mb-2 mt-2'>Password :</label>
            <input type={`${showPassword1 ? 'text' : 'password'}`} key='password' readOnly value={'admin'} className='px-3 py-2 border bg-transparent rounded-md focus:outline-none focus:border-blue-500 text-white' />
            <button
              className='focus:outline-none'
              onClick={(e) => handleShowPassword('current',e)}
            >
              {showPassword1 ? <FaEyeSlash style={{ color: 'white' }} /> : <FaEye style={{ color: 'white' }} />}
            </button>
          </div>
          {!change && (
            <button onClick={() => setChange(true)} className='text-white hover:text-blue-500 text-bold ml-20 mt-2'>Changer les Informations</button>
          )}
        </form>

        {change && (
         <div className='h-26 flex flex-col   '>
         <form onSubmit={handleSave} className='flex flex-col gap-4 items-start'>
           <div className='flex flex-col gap-6 items-start'>
             <div className='flex flex-row gap-1 items-start ml-10'>
               <label htmlFor='nv-Email' className='text-gray-300 font-semibold mb-2 mt-2'>New Email :</label>
               <input
                 type='text'
                 key='newEmail'
                 name='email'
                 value={inputs.email || ''}
                 onChange={handleInputs}
                 className='px-3 py-2 border bg-transparent rounded-md focus:outline-none focus:border-blue-500 text-white'
               />
             </div>
       
             <div className='flex flex-col gap-6 items-start'>
               
               <div className='flex  items-center gap-1'>
               <label htmlFor='nv-Password' className='text-gray-300 font-semibold mb-2 mt-2 ml-2'>New Password :</label>
                 <input
                   type={`${showPassword2 ? 'text' : 'password'}`}
                   key='newPassword'
                   name='password'
                   value={inputs.password || ''}
                   onChange={handleInputs}
                   className='px-3 py-2 border bg-transparent rounded-md focus:outline-none focus:border-blue-500 text-white mr-3'
                 />
                 <button
                   className='focus:outline-none'
                   onClick={(e) => handleShowPassword('new',e)}
                 >
                   {showPassword2 ? <FaEyeSlash style={{ color: 'white' }} /> : <FaEye style={{ color: 'white' }} />}
                 </button>
               </div>
               
               
               <div className='flex flex-row items-center gap-1'>
               <label htmlFor='nv-Password' className='text-gray-300 font-semibold mb-2 mt-2'>Verify Password :</label>
                 <input
                   type={`${showPassword3 ? 'text' : 'password'}`}
                   key='confirmPassword'
                   name='confirmPassword'
                   value={inputs.confirmPassword || ''}
                   onChange={handleInputs}
                   className='px-3 py-2 border bg-transparent rounded-md focus:outline-none focus:border-blue-500 text-white mr-3'
                 />
                 <button
                   className='focus:outline-none'
                   onClick={(e) => handleShowPassword('confirm',e)}
                 >
                   {showPassword3 ? <FaEyeSlash style={{ color: 'white' }} /> : <FaEye style={{ color: 'white' }} />}
                 </button>
               </div>
             </div>
           </div>
       
           <div className='flex flex-row gap-4 items-center ml-32'>
             <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold rounded mt-2 w-24' type="submit">
               Save
             </button>
             <button className='bg-red-500 hover:bg-red-700 text-white font-bold rounded mt-2 w-24' type="button" onClick={handleCancel}>
               Cancel
             </button>
           </div>
         </form>
       </div>
        )}
      </div>
    </div>
  );
}
