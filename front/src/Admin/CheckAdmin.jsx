import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function CheckAdmin() {
    // État pour stocker les données du formulaire
    const [inputs, setInputs] = useState({ email: '', password: '' });

    // État pour déterminer si l'authentification est réussie ou non
    const [valid, setValid] = useState(false);

    // Utilisation de useNavigate
    const navigate = useNavigate();

    // Fonction pour gérer les changements dans les champs du formulaire
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInputs({ ...inputs, [name]: value });
    };

    // Fonction pour soumettre les données du formulaire et vérifier l'authentification
    const handleVerifier = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/admin/verification', inputs);
            if (response.data.message === "Success") {
                navigate('/Admin');
                setValid(true);
            } else {
                alert("Vérification échouée");
            }
        } catch (error) {
            console.error("Erreur lors de la vérification:", error);
            alert("Une erreur est survenue lors de la vérification");
        }
    };

    return (
        <div className=' check-admin flex flex-col min-h-screen'>
            <header className="bg-gray-800 py-4">
                <div className="flex items-center">
                    <a href="/" className="text-white text-xl font-bold ml-3 hover:text-blue-500">Pfe a Distance</a>
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
                        <div className="text-gray-400 text-sm mb-4">
                            Vous entrez sur le site en tant qu'administrateur.
                        </div>
                        <div className="flex justify-center">
                            <button type="submit" className="bg-blue-500 text-white font-semibold px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Se connecter</button>
                        </div>
                    </form>
                </div>
            </div>

            <footer className="bg-gray-800 text-white py-3">
                <div className="container mx-auto flex justify-between items-center">
                    <span>© <span id="currentYear"></span> Pfe à Distance. Tous droits réservés.</span>
                    <a href="https://ent.usthb.dz/index.php/accueil" className="text-gray-400  hover:text-blue-500">Site ent USTHB</a>
                </div>
            </footer>
        </div>
    );
}
