import React, { useState, useEffect, useContext } from 'react';
import { Outlet, Link } from 'react-router-dom';
import axios from 'axios';
import EndSessionEtu from './EndSessionEtu';
import { EtudiantUserContext } from './EtudiantUserProvider';
import { FaSync } from 'react-icons/fa';

export default function CheckEtudiant() {
    // Le context de user
    const { setEtudiantUserEmail } = useContext(EtudiantUserContext);
    const { setPasswordEtudiant } = useContext(EtudiantUserContext);

    // État pour déterminer si l'authentification est réussie ou non
    const [valid, setValid] = useState(false);
    const [loading, setLoading] = useState(true); // Loading state

    // Fonction pour soumettre les données du formulaire et vérifier l'authentification
    axios.defaults.withCredentials = true;
    useEffect(() => {
        axios.get('http://localhost:3001/etudiant/check')
            .then(res => {
                if (res.data.Valide) {
                    setValid(true);
                    setEtudiantUserEmail(res.data.User_Email);
                    setPasswordEtudiant(res.data.User_Password);
                } else {
                    console.log(res.data.message);
                }
            })
            .catch(err => console.log(err))
            .finally(() => {
                setLoading(false); // Set loading to false after verification completes
            });
    }, []);

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
                    <EndSessionEtu />
                </div>
            )}
        </div>
    );
}
