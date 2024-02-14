import React, { useState } from 'react';
import Contact from './Contact';
import LoginForm from './LoginForm';

function Body() {
  // State pour la sélection de l'utilisateur (étudiant/enseignant)
  const [choixetu, setChoixetu] = useState(false);
  const [choixprf, setChoixprf] = useState(false);

  // Gestionnaires d'événements pour le changement de sélection
  const handleChoixEtu = () => {
    setChoixetu(!choixetu);
    setChoixprf(false); // Assure qu'une seule sélection est active à la fois
  };

  const handleChoixPrf = () => {
    setChoixprf(!choixprf);
    setChoixetu(false); // Assure qu'une seule sélection est active à la fois
  };

  return (
    <div className='contenaire2 flex flex-col items-center justify-center'>

      {/* Section Bienvenue */}
      <section className='paragraphe mb-8 text-center  p-8 rounded-lg'>
        <h2 className="titre text-3xl font-bold mb-4 text-white">Bienvenue sur Pfe à Distance !</h2>
        <p className='text-lg text-white'>
          Notre plateforme innovante de gestion des projets de fin d'études vous offre une solution complète pour superviser, collaborer et suivre vos projets à distance. Grâce à notre interface conviviale et nos fonctionnalités avancées, vous pouvez facilement créer, organiser et suivre les projets, échanger des commentaires et des idées, fixer des jalons et des échéances, planifier des réunions virtuelles, et bien plus encore.
        </p>
      </section>

      {/* Section Connexion */}
      <section id='Login' className="mb-8 w-full flex justify-center flex-col items-center">
        <h2 className="text-2xl font-bold text-white mb-4">Login</h2>
        <div className="flex justify-center items-center gap-20">
          {/* Carte de connexion Etudiant */}
          <div className={`etu max-w-md bg-gray-800 bg-opacity-40 p-8 rounded-lg shadow-lg cursor-pointer transition-transform transform ${choixetu ? 'translate-y-0 ease-out' : '-translate-y-2'}`} >
            
            <h4 className="text-xl font-semibold mb-4 text-white hover:text-blue-500 " onClick={handleChoixEtu}>
              Étudiant <hr className={`${choixetu ? 'hidden':'block'}`} />  
            </h4>
            <p className={`text-sm ${choixetu ? 'hidden' : 'block'} text-white mb-2`}>Si vous êtes étudiant, cliquez ici</p>
            {choixetu && (<LoginForm />)}
          </div>
          {/* Carte de connexion Enseignant */}
          <div className={`ens max-w-md bg-gray-800 bg-opacity-40 p-8 rounded-lg shadow-lg cursor-pointer transition-transform transform ${choixprf ? 'translate-y-0 ease-out' : '-translate-y-2'}`} >
            
            <h4 className="text-xl font-semibold mb-4 text-white hover:text-blue-500" onClick={handleChoixPrf}>
              Enseignant <hr className={`${choixprf ? 'hidden':'block'}`} />
            </h4>
            <p className={`text-sm ${choixprf ? 'hidden' : 'block'} text-white mb-2`}>Si vous êtes enseignant, cliquez ici</p>
            {choixprf && (<LoginForm />)}
          </div>
        </div>
      </section>

      {/* Section Contact */}
      <section id='Contact' className='contact px-2 py-2 w-full bg-gray-800 bg-opacity-50 p-8 rounded-lg text-white text-center'>
        <h2 className="text-2xl font-bold mb-4">Contact</h2>
        <p>Vous pouvez contacter l'administration pour plus d'informations</p>
        <Contact />
      </section>

    </div>
  );
}

export default Body;
