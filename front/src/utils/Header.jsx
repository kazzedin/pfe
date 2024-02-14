import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons'; // Importez l'icône d'utilisateur régulier

function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className=" bg-gray-800 bg-opacity-50  opacity-9 py-4">
            <nav className="container mx-auto flex justify-between items-center relative">
                <div className="flex items-center">
                    <a href="/" className="text-white text-xl font-bold ml-3 hover:text-blue-500">Pfe a Distance</a>
                </div>
                <div className="hidden md:block mr-3">
                    <ul className="flex space-x-4">
                        <li><a href="#Login" className="text-white hover:text-blue-500">Login</a></li>
                        <li><a href="#Contact" className="text-white hover:text-blue-500">Contact</a></li>
                        {/* Utilisez Link pour naviguer vers la page d'administration */}
                        <li className='text-white hover:text-gray-300 g-1'><FontAwesomeIcon icon={faUser} className="text-white hover:text-blue-500 mr-1" /><Link to='/CheckAdmin'>Admin</Link></li>
                    </ul>
                </div>
                <div className="md:hidden hover:text-blue-500">
                    <button className="text-white focus:outline-none" onClick={toggleMenu}>
                        <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                            <path fillRule="evenodd" clipRule="evenodd" d="M4 6h16v2H4V6zm0 5h16v2H4v-2zm0 5h16v2H4v-2z" />
                        </svg>
                    </button>
                </div>
            </nav>
            {/* Afficher le menu si isMenuOpen est vrai */}
            {isMenuOpen && (
                <div className="sticky top-0 right-0 h-full bg-gray-900 bg-opacity-70 backdrop-filter backdrop-blur-lg z-50">
                    <div className="absolute top-0 right-0 mt-5 w-44 bg-gray-900 bg-opacity-90 shadow-lg p-4">
                        <ul className="flex flex-col space-y-2">
                            <li><a href="#Login" className="text-white hover:text-blue-500" onClick={toggleMenu}>Login</a></li>
                            <li><a href="#Contact" className="text-white hover:text-blue-500" onClick={toggleMenu}>Contact</a></li>
                            <li><a href="/CheckAdmin" className="text-white hover:text-blue-500" onClick={toggleMenu}>Admin</a></li>
                        </ul>
                    </div>
                </div>
            )}
        </header>
    );
}

export default Header;
