import React, { useState, useEffect, useContext } from 'react';
import { Outlet, Link } from 'react-router-dom';
import axios from 'axios';
import RedirectingPage from '../utils/RedirectingPage';
import { AdminUserContext } from './AdminUserProvider';
import { FaSync } from 'react-icons/fa';

export default function CheckAdmin() {
    // Le context de user
    const { setAdminUserEmail } = useContext(AdminUserContext);
    const { setPasswordAdmin } = useContext(AdminUserContext);

    // État pour déterminer si l'authentification est réussie ou non
    const [valid, setValid] = useState(false);
    const [loading, setLoading] = useState(true); // Loading state

    // Fonction pour soumettre les données du formulaire et vérifier l'authentification
    axios.defaults.withCredentials = true;
    useEffect(() => {
        axios.get('http://localhost:3001/admin/check')
            .then(res => {
                if (res.data.Valide) {
                    setValid(true);
                    setAdminUserEmail(res.data.User_Email);
                    setPasswordAdmin(res.data.User_Password);
                    console.log("Verification Success");
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
                    <RedirectingPage />
                </div>
            )}
        </div>
    );
}
