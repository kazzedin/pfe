import React from 'react';
import Contact from './Contact';
import LoginForm from './LoginForm';

function Body() {
  return (
    <div className='flex flex-col items-center justify-center '>
      {/* Section Bienvenue */}
      <section className='paragraphe mb-8 w-1/2'>
        <h2 className="text-2xl font-bold mb-4">Bienvenue sur Pfe à Distance !</h2>
        <p>
          Notre plateforme innovante de gestion des projets de fin d'études vous offre une solution complète pour superviser, collaborer et suivre vos projets à distance. Que vous soyez un étudiant travaillant sur votre projet de fin d'études, un encadrant cherchant à guider et soutenir vos étudiants, ou un administrateur veillant au bon déroulement des projets, Pfe à Distance est là pour vous simplifier la vie.
          Grâce à notre interface conviviale et nos fonctionnalités avancées, vous pouvez facilement créer, organiser et suivre les projets, échanger des commentaires et des idées, fixer des jalons et des échéances, planifier des réunions virtuelles, et bien plus encore. Notre objectif est de vous offrir un environnement collaboratif et efficace pour que vous puissiez mener à bien vos projets de fin d'études, où que vous soyez.
          Rejoignez-nous dès aujourd'hui et découvrez comment Pfe à Distance peut vous aider à réaliser vos projets de fin d'études avec succès, où que vous soyez dans le monde.
        </p>
      </section>

      {/* Section Connexion */}
      <section id='Login' className="mb-8 w-full">
        <h2 className="text-2xl font-bold mb-4">Connexion</h2>
        <div className="flex justify-between">
          {/* Carte de connexion Etudiant */}
          <div className='etu max-w-md bg-white p-8 rounded shadow-lg'>
            <h4 className="text-xl font-semibold mb-4">Etudiant</h4>
            <LoginForm />
          </div>
          {/* Carte de connexion Enseignant */}
          <div className='ens max-w-md bg-white p-8 rounded shadow-lg'>
            <h4 className="text-xl font-semibold mb-4">Enseignant</h4>
            <LoginForm />
          </div>
        </div>
      </section>

      {/* Section Contact */}
      <section id='Contact' className='px-2 py-2 w-full'>
        <h2 className="text-2xl font-bold mb-4">Contact</h2>
        <p>Vous pouvez contacter l'administration pour plus d'informations</p>
        <Contact />
      </section>
    </div>
  );
}



export default Body;
