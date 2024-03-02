import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';

function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className="bg-white shadow-md py-4  top-0 w-full z-50">
            <nav className="mx-auto  flex justify-between items-center">
                <div className="flex items-center">
                    <Link to="/" className="text-black hover:text-blue-500 text-2xl font-bold  ml-7">Pfe a Distance</Link>
                </div>
                <div className="hidden md:block mr-7  ">
                    <ul className="flex space-x-6 flex-row items-center">
                        <li><a href="#Login" className="hover:text-blue-500 text-black hover:border hover:border-blue-500 rounded-2xl p-1">Login</a></li>
                        <li><a href="#Contact" className="hover:text-blue-500 text-black hover:border hover:border-blue-500 rounded-2xl p-1">Contact</a></li>
                        <li><a href="#About" className="hover:text-blue-500 text-black hover:border hover:border-blue-500 rounded-2xl p-1">A propos</a></li>
                        <li className="hover:text-blue-500 text-black hover:border  hover:border-blue-500 rounded-2xl p-1">
                            <Link to='/Admin' className='flex flex-row items-center'>
                                <FaUser className="mr-1" />Admin
                            </Link>
                        </li>
                       
                    </ul>
                </div>
                <div className="md:hidden mr-7"> {/* Ajout d'une classe pour le positionnement */}
                    <button className="text-black focus:outline-none" onClick={toggleMenu}>
                        <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                            <path fillRule="evenodd" clipRule="evenodd" d="M4 6h16v2H4V6zm0 5h16v2H4v-2zm0 5h16v2H4v-2z" />
                        </svg>
                    </button>
                </div>
            </nav>
            {isMenuOpen && (
                <div className="md:hidden fixed top-0 right-0 mt-16 mr-4"> {/* Modifié pour positionner le menu en haut à droite */}
                    <div className="bg-white w-64 rounded shadow-lg p-4">
                        <ul className="flex flex-col space-y-2">
                            <li><a href="#Login" className="hover:text-blue-500 text-black" onClick={toggleMenu}>Login</a></li>
                            <li><a href="#Contact" className="hover:text-blue-500 text-black" onClick={toggleMenu}>Contact</a></li>
                            <li><a href="#About" className="hover:text-blue-500 text-black" onClick={toggleMenu}>A propos</a></li>
                            <li><a href="/Admin" className="hover:text-blue-500 text-black" onClick={toggleMenu}>Admin</a></li>
                            
                        </ul>
                    </div>
                </div>
            )}
        </header>
    );
}

export default Header;
