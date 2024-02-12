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
    <div className='contenaire flex flex-col items-center justify-center  '>

      {/* Section Bienvenue */}
      <section className='paragraphe mb-8 text-center'>
        <h2 className="titre text-3xl font-bold mb-4 text-black-700">Bienvenue sur Pfe à Distance !</h2>
        <p className='text-lg text-gray-800'>
          Notre plateforme innovante de gestion des projets de fin d'études vous offre une solution complète pour superviser, collaborer et suivre vos projets à distance. Grâce à notre interface conviviale et nos fonctionnalités avancées, vous pouvez facilement créer, organiser et suivre les projets, échanger des commentaires et des idées, fixer des jalons et des échéances, planifier des réunions virtuelles, et bien plus encore.
        </p>
      </section>

      {/* Section Connexion */}
      <section id='Login' className="mb-8 w-full flex justify-center flex-col items-center">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <div className="flex justify-center items-center gap-20">
          {/* Carte de connexion Etudiant */}
          <div className={'etu max-w-md bg-white p-8 rounded shadow-lg cursor-pointer transition-transform transform  hover:-translate-y-1'}>
            <h4 className="text-xl font-semibold mb-4" onClick={handleChoixEtu}>
              <span className="mr-2">👨‍🎓</span>Etudiant
            </h4>
            <p className={choixetu ? 'hidden' : 'block'}>Si vous êtes étudiant, cliquez ici</p>
            {choixetu && (<LoginForm />)}
          </div>
          {/* Carte de connexion Enseignant */}
          <div className={'ens max-w-md bg-white p-8 rounded shadow-lg cursor-pointer transition-transform transform choixprf hover:-translate-y-1'} onClick={handleChoixPrf}>
            <h4 className="text-xl font-semibold mb-4">
              <span className="mr-2">👨‍🏫</span>Enseignant
            </h4>
            <p className={choixprf ? 'hidden' : 'block'}>Si vous êtes Enseignant, cliquez ici</p>
            {choixprf && (<LoginForm />)}
          </div>
        </div>
      </section>

      {/* Section Contact */}
      <section id='Contact' className='contact px-2 py-2 w-full '>
        <h2 className="text-2xl font-bold mb-4">Contact</h2>
        <p>Vous pouvez contacter l'administration pour plus d'informations</p>
        <Contact />
      </section>

    </div>
  );
}

export default Body;
