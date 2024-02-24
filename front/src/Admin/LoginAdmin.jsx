import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {FaTimes} from 'react-icons/fa';

export default function LoginAdmin() {
    // État pour stocker les données du formulaire
    const [inputs, setInputs] = useState({email: '', password:''});
    // État pour gérer l'affichage du message d'erreur
    const [pwderror, setpwdError] = useState(false);
    const [emlerror, setemlError] = useState(false);

    // Utilisation de useNavigate
    const navigate = useNavigate();

    // Fonction pour gérer les changements dans les champs du formulaire
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInputs({ ...inputs, [name]: value });
    };

    // cela pour LE JWT
    axios.defaults.withCredentials=true;

    // Fonction pour soumettre les données du formulaire et vérifier l'authentification
    const handleVerifier = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3001/admin/verification', { email: inputs.email, password: inputs.password })
            .then(res => {
                if (res.data.message === "Success") {
                    navigate('/Admin');
                    console.log(res.data.message);
                } else if (res.data.message === "Password Wrong" && res.data.message === "User not found") {
                    setpwdError(true);
                    setemlError(true);
                } else if (res.data.message === "Password Wrong") {
                    setpwdError(true);
                } else if (res.data.message === "User not found") {
                    setemlError(true);
                }
            })
            .catch(err => console.log(err));
    };
    return (
        <div className=' check-admin flex flex-col min-h-screen'>
            <header className="bg-gray-800 bg-opacity-25 py-4">
                <div className="flex items-center">
                    <Link to="/" className="text-white text-xl font-bold ml-3 hover:text-blue-500">Pfe a Distance</Link>
                </div>
            </header>

            <div className='flex justify-center items-center mt-43 flex-grow'>
                <div>
                    <form className="bg-gray-800 max-w-md mx-auto bg-opacity-70 p-8 rounded shadow-lg" onSubmit={handleVerifier}>
                        <h2 className="text-2xl font-bold mb-4 text-center text-white">Login</h2>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-gray-300 font-semibold mb-2">Email :</label>
                            <input type="text" id="email" name="email" className="w-full px-3 py-2 border bg-transparent rounded-md focus:outline-none focus:border-blue-500 text-white placeholder-gray-400" placeholder="Entrez votre email" value={inputs.email} onChange={handleInputChange} />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="password" className="block text-gray-300 font-semibold mb-2">Mot de passe :</label>
                            <input type="password" id="password" name="password" className="w-full px-3 py-2 border bg-transparent rounded-md focus:outline-none focus:border-blue-500 text-white placeholder-gray-400" placeholder="Entrez votre mot de passe" value={inputs.password} onChange={handleInputChange} />
                        </div>
                        
                        {pwderror? <div className="text-red-600 font-bold mb-4 flex flex-row items-center gap-1">Mot de Passe Incorrect <FaTimes className='text-red-500' /> </div>:""}
                        {emlerror? <div className="text-red-600 font-bold mb-4 flex flex-row items-center gap-1">Email Incorrect <FaTimes className='text-red-500' /> </div>:""}
                     
                        <div className="text-gray-400 text-sm mb-4">
                            Vous entrez sur le site en tant qu'administrateur.
                        </div>
                        <div className="flex justify-center">
                            <button type="submit" className="bg-blue-500 text-white font-semibold px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Se connecter</button>
                        </div>
                    </form>
                </div>
            </div>

            <footer className="bg-gray-800 bg-opacity-25 text-white py-3">
                <div className=" mx-auto flex justify-between items-center">
                    <span>© <span id="currentYear"></span> Pfe à Distance. Tous droits réservés.</span>
                    <a href="https://ent.usthb.dz/index.php/accueil" className="text-gray-400  hover:text-blue-500">Site ent USTHB</a>
                </div>
            </footer>
        </div>
    );
}
