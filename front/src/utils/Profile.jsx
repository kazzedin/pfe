import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export default function Profile() {
  const [change, setChange] = useState(false);
  const [inputs, setInputs] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
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

  const HandelshowPassword1 = (e) => {
    e.preventDefault(); 
    setShowPassword1(!showPassword1);
  }; 

  const HandelshowPassword2 = (e) => {
    e.preventDefault(); 
    setShowPassword2(!showPassword2);
  }; 

  return (
    <div className='profil-page flex items-center justify-center flex-col bg-gray-800 bg-opacity-50 opacity-9'>
      <div className='flex items-center justify-center flex-col'>
      <div className='bg-white rounded-full w-44 h-44 flex items-center justify-center overflow-hidden'>
          {selectedImage ? (
            <img src={selectedImage} alt='Selected' className='h-full w-full object-cover' />
          ) : (
            <img src='/public/profil.jpg' alt='Default' className='h-full w-full object-cover' />
          )}
        </div>
        <label htmlFor='fileInput' className=' bg-gray-800 bg-opacity-50 opacity-9 text-white rounded-md px-2 py-1 cursor-pointer hover:text-blue-500'>
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
      
      <div>
        <form className='flex flex-row gap-4'>
          <div className='flex gap-2 flex-row items-center justify-center'>
          <label htmlFor='Email' className='text-gray-300 font-semibold mb-2 mt-2'>Email :</label>
          <input type='text' readOnly className='px-3 py-2 border bg-transparent rounded-md focus:outline-none focus:border-blue-500 text-white' value={"admin@usthb.com"}/>
          </div>
          <div className='flex flex-row gap-2'>
          <label htmlFor='password' className='text-gray-300 font-semibold mb-2 mt-2'>Password :</label>
          <input type={`${showPassword1 ? 'text':'password'}`} readOnly value={'admin'}  className='px-3 py-2 border bg-transparent rounded-md focus:outline-none focus:border-blue-500 text-white'/>
          <button
            className='focus:outline-none'
            onClick={HandelshowPassword1}
          >
            {showPassword1 ? <FaEyeSlash style={{color:'white'}}/> : <FaEye style={{color:'white'}} />}
          </button>
          </div>
        </form>
        <button onClick={() => setChange(!change)} className='text-white hover:text-blue-500 text-bold'>Changer les Informations</button>
      </div>
      {change && (
        <div className='  h-26 '>
          <form onSubmit={handleSave} className='flex flex-col gap-4 items-center mr-24'>
            <div className='flex flex-row gap-1 items-center'>
            <label htmlFor='nv-Email' className='text-gray-300 font-semibold mb-2 mt-2'>New Email :</label>
            <input type='text' name='email' value={inputs.email} onChange={handleInputs} className='px-3 py-2 border bg-transparent rounded-md focus:outline-none focus:border-blue-500 text-white'/>
            </div>

            <div className='flex flex-row gap-1 items-center'>
            <label htmlFor='nv-Password' className='text-gray-300 font-semibold mb-2 mt-2 '>New Password :</label>
            <input type={`${showPassword2 ? 'text':'password'}`} name='password' value={inputs.password} onChange={handleInputs} className='px-3 py-2 border bg-transparent rounded-md focus:outline-none focus:border-blue-500 text-white mr-3'/>
            <button
            className='focus:outline-none'
            onClick={HandelshowPassword2}
          >
            {showPassword2 ? <FaEyeSlash style={{color:'white'}}/> : <FaEye style={{color:'white'}} />}
          </button>
            </div>
            
            <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold  rounded mt-2 w-24 ml-24'>
              Save 
            </button>

          </form>
        </div>
      )}
      <button onClick={returnAdmin} className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-8'>
        Return Admin Page
      </button>
    </div>
  );
}
