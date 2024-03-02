import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaTimes } from 'react-icons/fa';

export default function LoginAdmin() {
    const [inputs, setInputs] = useState({ email: '', password: '' });
    const [pwdError, setPwdError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInputs({ ...inputs, [name]: value });
    };

    axios.defaults.withCredentials = true;

    const handleVerification = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3001/admin/verification', { email: inputs.email, password: inputs.password })
            .then(res => {
                if (res.data.message === "Success") {
                    navigate('/Admin');
                } else if (res.data.message === "Password Wrong" && res.data.message === "User not found") {
                    setPwdError(true);
                    setEmailError(true);
                } else if (res.data.message === "Password Wrong") {
                    setPwdError(true);
                    setEmailError(false);
                } else if (res.data.message === "User not found") {
                    setEmailError(true);
                    setPwdError(false);
                }
            })
            .catch(err => console.log(err));
    };

    return (
        <div className='check-admin flex flex-col min-h-screen'>
            <header className="bg-white shadow-md py-4  top-0 w-full z-50">
                <div className="flex items-center">
                    <Link to="/" className="text-black text-2xl font-bold ml-3 hover:text-blue-500">Pfe à Distance</Link>
                </div>
            </header>

            <div className='flex justify-center items-center mt-10 flex-grow'>
                <div>
                    <form className="bg-gray-100 max-w-md mx-auto p-8 rounded shadow-lg" onSubmit={handleVerification}>
                        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Connexion</h2>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">Email :</label>
                            <input type="text" id="email" name="email" className={`w-full px-3 py-2 border ${emailError ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:border-blue-500 text-gray-800 placeholder-gray-400`} placeholder="Entrez votre email" value={inputs.email} onChange={handleInputChange} />
                            {emailError && <FaTimes className='text-red-500 absolute top-2 right-2' />}
                        </div>
                        <div className="mb-6">
                            <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">Mot de passe :</label>
                            <input type="password" id="password" name="password" className={`w-full px-3 py-2 border ${pwdError ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:border-blue-500 text-gray-800 placeholder-gray-400`} placeholder="Entrez votre mot de passe" value={inputs.password} onChange={handleInputChange} />
                            {pwdError && <FaTimes className='text-red-500 absolute top-2 right-2' />}
                        </div>
                        {pwdError && <p className="text-red-500 text-sm mb-2">Mot de passe incorrect</p>}
                        {emailError && <p className="text-red-500 text-sm mb-2">Email incorrect</p>}
                        <div className="text-gray-600 text-sm mb-4">
                            Vous êtes sur le point de vous connecter en tant qu'administrateur.
                        </div>
                        <div className="flex justify-center">
                            <button type="submit" className="bg-blue-500 text-white font-semibold px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600 transition-colors duration-300">Se connecter</button>
                        </div>
                    </form>
                </div>
            </div>

            <footer className="bg-white py-4  bottom-0 w-full shadow-lg">
                <div className="mx-auto flex justify-between items-center">
                    <span>© <span id="currentYear">{new Date().getFullYear()}</span> Pfe à Distance. Tous droits réservés.</span>
                    <a href="https://ent.usthb.dz/index.php/accueil" className="text-black hover:text-blue-500">Site ent USTHB</a>
                </div>
            </footer>
        </div>
    );
}
