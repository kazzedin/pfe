import React, { useState, useEffect, useContext } from 'react';
import { Outlet, Link } from 'react-router-dom';
import axios from 'axios';
import EndSessionEnc from './EndSessionEncadreur';
import { EncadreurUserContext } from './EncadreurUserProvider';
import { FaSync } from 'react-icons/fa';

export default function CheckEncadreur() {
    // Le context de user
    const { setEncadreurUserEmail } = useContext(EncadreurUserContext);
    const { setPasswordEncadreur } = useContext(EncadreurUserContext);

    // État pour déterminer si l'authentification est réussie ou non
    const [valid, setValid] = useState(false);
    const [loading, setLoading] = useState(true); // Loading state

    // Fonction pour soumettre les données du formulaire et vérifier l'authentification
    axios.defaults.withCredentials = true;
    useEffect(() => {
        axios.get('http://localhost:3001/encadreur/check')
            .then(res => {
                if (res.data.Valide) {
                    setValid(true);
                    setEncadreurUserEmail(res.data.User_Email);
                    setPasswordEncadreur(res.data.User_Password);
                } else {
                    console.log(res.data.message);
                }
            })
            .catch(err => console.log(err))
            .finally(() => {
                setLoading(false); // Set loading to false after verification completes
            });
    }, []);
console.log(valid)
    return (
        <div>
            {loading ? ( // Show loading indicator if loading
                <div className='loading-page min-h-screen flex flex-col items-center justify-center text-xl text-white'>
                <FaSync className='animate-spin mb-2' size={24} /> {/* Refresh icon with spinning animation */}
                Loading...
            </div>
            ) : valid ? (
                <Outlet />
            ) : (
                <div>
                    <EndSessionEnc />
                </div>
            )}
        </div>
    );
}
