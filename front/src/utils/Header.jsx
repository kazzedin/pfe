import React from 'react';
import {NavLink} from 'react-router-dom'

function Header() {
    return (
        <header className="bg-gray-800 py-4">
            <nav className="container mx-auto flex justify-between items-center">
                <div className="flex items-center">
                    <a href="/" className="text-white text-xl font-bold">Pfe a Distance</a>
                </div>
                <div className="hidden md:block">
                    <ul className="flex space-x-4">
                        <li><a href="#Login" className="text-white hover:text-gray-300">Login</a></li>
                        <li><a href="#Contact" className="text-white hover:text-gray-300">Contact</a></li>
                    </ul>
                </div>
                <div className="md:hidden">
                    <button className="text-white focus:outline-none">
                        <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                            <path fillRule="evenodd" clipRule="evenodd" d="M4 6h16v2H4V6zm0 5h16v2H4v-2zm0 5h16v2H4v-2z" />
                        </svg>
                    </button>
                </div>
            </nav>
        </header>
    );
}

export default Header;
