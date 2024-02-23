import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { FaEye, FaEyeSlash, FaCheck, FaTimes } from 'react-icons/fa';
import { IoIosArrowBack } from 'react-icons/io';
import { AdminUserContext } from './AdminUserProvider';

export default function Profile() {
  const [change, setChange] = useState(false);
  const [inputs, setInputs] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [showPassword3, setShowPassword3] = useState(false);
  const navigate = useNavigate();
  const { adminUserEmail } = useContext(AdminUserContext);
  const { passwordAdmin } = useContext(AdminUserContext);

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

  axios.defaults.withCredentials = true;
  const handleSave = (e) => {
    e.preventDefault();
    if (inputs.password === inputs.confirmPassword) { // Checking if passwords match before sending the request
      axios.put('http://localhost:3001/admin/profil', { email: inputs.email, password: inputs.password, find: adminUserEmail })
        .then((res) => {
          if (res.data.message === 'Success') {
            setChange(false); // Resetting the modification mode after saving
            alert('Vous avez changé vos informations avec succès. You are being redirected to the login page.');
            // Make a post request to the logout route to delete cookies since we changed the information and need to log in again
            axios.get('http://localhost:3001/admin/logout')
              .then(res => {
                navigate('/LoginAdmin');
                console.log(res);
              })
              .catch(err => console.log(err));
          } else {
            alert('Une erreur est survenue');
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setPasswordMatch(false); // Set password match to false if passwords don't match
    }
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

  const handleCancel = () => {
    setChange(false);
  };

  

  return (
    <div className={`flex flex-col bg-gray-800 bg-opacity-50 profil-page ${change ? 'expanded' : ''} `}>

      <div className='flex items-center return'>
        <Link onClick={returnAdmin} className='hover:text-red-700 text-white rounded return-admin flex items-center'>
          <IoIosArrowBack className="mr-2" />
          Return Admin Page
        </Link>
      </div>
      <div className='flex items-start justify-center flex-col w-1/2 ml-20  '>
        <div className='bg-white rounded-full w-44 h-44 flex items-center justify-center overflow-hidden ml-7'>
          {selectedImage ? (
            <img src={selectedImage} alt='Selected' className='h-full w-full object-cover' />
          ) : (
            <img src='/public/profil.jpg' alt='Default' className='h-full w-full object-cover' />
          )}
        </div>
        <label htmlFor='fileInput' className='bg-gray-800 bg-opacity-50 opacity-9 text-white rounded-md px-2 py-1 cursor-pointer hover:text-blue-500 mt-2 ml-20 '>
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

      <div className='grid grid-cols-2 h-64 '>
        <form className='flex flex-col items-start gap-3 first-input  '>
          <div className='flex gap-2 flex-col items-center '>
            <label htmlFor='Email' className='text-gray-300 font-semibold mt-2 mr-16 '>Email :</label>
            <input type='text' key='email' readOnly className='px-3 py-2 border bg-transparent rounded-md focus:outline-none focus:border-blue-500 text-white ml-24' value={adminUserEmail} />
          </div>
          <div className='flex flex-col gap-2 items-center'>
            <label htmlFor='password' className='text-gray-300 font-semibold mt-2 mr-16'>Password :</label>
            <div className='flex flex-row items-center gap-2'>
            <input type={`${showPassword1 ? 'text' : 'password'}`} key='password' readOnly value={passwordAdmin} className='px-3 py-2 border bg-transparent rounded-md focus:outline-none focus:border-blue-500 text-white ml-24' />
            <button
              className='focus:outline-none'
              onClick={(e) => handleShowPassword('current', e)}
            >
              {showPassword1 ? <FaEyeSlash style={{ color: 'white' }} /> : <FaEye style={{ color: 'white' }} />}
            </button>
            </div>
          </div>
          {!change && (
            <button onClick={() => setChange(true)} className='text-white hover:text-blue-500 text-bold ml-24 mt-2 font-bold '>Changer les Informations ?</button>
          )}
        </form>

        {change && (
          
            <form onSubmit={handleSave} className='flex flex-col gap-4 items-start border border-red-700  '>
              <div className='flex flex-col gap-3 items-start mb-10'>
                <div className='flex flex-col gap-1 items-start ml-10 '>
                  <label htmlFor='nv-Email' className='text-gray-300 font-semibold mb-1 mt-2'>New Email :</label>
                  <input
                    type='text'
                    key='newEmail'
                    name='email'
                    value={inputs.email || ''}
                    onChange={handleInputs}
                    className='px-3 py-2 border bg-transparent rounded-md focus:outline-none focus:border-blue-500 text-white placeholder-gray-400'
                    placeholder='Enter Your new Email'
                  />
                </div>

                <div className='flex flex-col gap-3 items-start'>
                  <div className='flex flex-col  items-center gap-1'>

                    <label htmlFor='nv-Password' className='text-gray-300 font-semibold mb-2 mt-2 ml-2'>New Password :</label>
                    <div className='flex flex-row items-center gap-1'>
                    <input
                      type={`${showPassword2 ? 'text' : 'password'}`}
                      key='newPassword'
                      name='password'
                      value={inputs.password || ''}
                      onChange={handleInputs}
                      className='px-3 py-2 border bg-transparent rounded-md focus:outline-none focus:border-blue-500 text-white mr-3 placeholder-gray-400'
                      placeholder='Enter Your New Password'
                    />
                    <button
                      className='focus:outline-none'
                      onClick={(e) => handleShowPassword('new', e)}
                    >
                      {showPassword2 ? <FaEyeSlash style={{ color: 'white' }} /> : <FaEye style={{ color: 'white' }} />}
                    </button>
                    </div>
                  </div>

                  {  inputs.confirmPassword ? inputs.confirmPassword ===inputs.password ? <div className='flex items-center text-white bg-black bg-opacity-45 gap-1 ml-36'><p>Correct Password</p> <FaCheck style={{ color: 'green' }}  /> </div>: <div className='flex flex-row bg-black bg-opacity-45 text-white  items-center gap-1 ml-36 '> <p>Wrong Password </p> <FaTimes style={{ color: 'red' }} /></div> :''}
                  <div className='flex flex-col items-center gap-1'>

                    <label htmlFor='nv-Password' className='text-gray-300 font-semibold mb-2 mt-2'>Verify Password :</label>
                    <div className='flex flex-row items-center gap-1'>
                    <input
                      type={`${showPassword3 ? 'text' : 'password'}`}
                      key='confirmPassword'
                      name='confirmPassword'
                      value={inputs.confirmPassword || ''}
                      onChange={handleInputs}
                      className='px-3 py-2 border bg-transparent rounded-md focus:outline-none focus:border-blue-500 text-white mr-3 placeholder-gray-400'
                      placeholder='Confirme Your Password'
                    />
                    <button
                      className='focus:outline-none'
                      onClick={(e) => handleShowPassword('confirm', e)}
                    >
                      {showPassword3 ? <FaEyeSlash style={{ color: 'white' }} /> : <FaEye style={{ color: 'white' }} />}
                    </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className='flex flex-row gap-4 items-center ml-32'>
              <button className={`bg-blue-500 hover:bg-blue-700 text-white font-bold rounded mt-2 w-24 ${inputs.confirmPassword===inputs.password ? '' : 'opacity-50 cursor-not-allowed'}`} 
        type="button" 
        onClick={handleSave}
        disabled={!(inputs.confirmPassword===inputs.password)}>
  Save
</button>
                <button className='bg-red-500 hover:bg-red-700 text-white font-bold rounded mt-2 w-24' type="button" onClick={handleCancel}>
                  Cancel
                </button>
              </div>
            </form>
        )}
      </div>
    </div>
  );
}