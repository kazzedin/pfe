import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-regular-svg-icons';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function LoginForm(prop) {
  const [path, setPath] = useState('');
  const [input, setInput] = useState({});
  const [showPassword, setShowPassword] = useState(false); // Ajoutez l'état pour gérer l'affichage du mot de passe
  const navigate=useNavigate()
  const HandelInput = (e) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (prop.type === 'Etu') {
      setPath('/InfoEtu');
    } else {
      setPath('/InfoPrf');
    }
  }, [prop.type]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const HandelLogin = (e) => {
    e.preventDefault();
    if (prop.type === 'Etu') {
      axios
        .post('http://localhost:3001/etudiant/login-etu', {
          email: input.email,
          password: input.password,
        })
        .then((res) => {
          if (res.data.message === 'success') {
            alert('Login successful');
            setInput({});
            navigate('/Etudiant')
          } else {
            alert('Login failed');
          }
        })
        .catch((err) => console.log(err));
    } else {
      axios
        .post('http://localhost:3001/etudiant/login-prf', {
          email: input.email,
          password: input.password,
        })
        .then((res) => {
          if (res.data.message === 'success') {
            alert('Login successful');
            setInput({});
          } else {
            alert('Login failed');
          }
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="flex justify-center items-center bg-transparent">
      <div className="max-w-lg mx-auto bg-white p-8 rounded shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-center text-black">Login</h2>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-800 font-semibold mb-2">
            Email :
          </label>
          <input
            type="text"
            id="email"
            name="email"
            className="w-full px-3 py-2 border border-blue-500 rounded-md focus:outline-none focus:border-blue-700 text-gray-800 placeholder-gray-400"
            placeholder="Entrez votre email"
            value={input.email}
            onChange={(e) => HandelInput(e)}
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-800 font-semibold mb-2">
            Mot de passe :
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              className="w-full px-3 py-2 border border-blue-500 rounded-md focus:outline-none focus:border-blue-700 text-gray-800 placeholder-gray-400"
              placeholder="Entrez votre mot de passe"
              value={input.password}
              onChange={(e) => HandelInput(e)}
            />
            <span className="absolute right-0 mt-3 mr-3 cursor-pointer" onClick={togglePasswordVisibility}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          <div className="flex flex-col justify-center items-center mt-2 ">
            <a href="/ForgotPassword" className="text-blue-500 hover:underline">
              Forgot password ?
            </a>
            <div className="flex items-center ">
              <FontAwesomeIcon icon={faQuestionCircle} style={{ color: 'blue', marginRight: '0.5rem' }} />
              <Link to={path} className="text-blue-500 hover:underline flex items-center">
                Je ne connais pas mon login !{' '}
              </Link>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-blue-500 text-white font-semibold px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            onClick={(e) => HandelLogin(e)}
          >
            Se connecter
          </button>
        </div>
      </div>
    </div>
  );
}
