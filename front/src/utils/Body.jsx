import React from 'react';

function Body() {
  return (
    <div>
      {/* Section Bienvenue */}
      <section className='paragraphe mb-8'>
        <h2 className="text-2xl font-bold mb-4">Bienvenue sur Pfe à Distance !</h2>
        <p>
          Notre plateforme innovante de gestion des projets de fin d'études vous offre une solution complète pour superviser, collaborer et suivre vos projets à distance. Que vous soyez un étudiant travaillant sur votre projet de fin d'études, un encadrant cherchant à guider et soutenir vos étudiants, ou un administrateur veillant au bon déroulement des projets, Pfe à Distance est là pour vous simplifier la vie.
        </p>
        <p>
          Grâce à notre interface conviviale et nos fonctionnalités avancées, vous pouvez facilement créer, organiser et suivre les projets, échanger des commentaires et des idées, fixer des jalons et des échéances, planifier des réunions virtuelles, et bien plus encore. Notre objectif est de vous offrir un environnement collaboratif et efficace pour que vous puissiez mener à bien vos projets de fin d'études, où que vous soyez.
        </p>
        <p>
          Rejoignez-nous dès aujourd'hui et découvrez comment Pfe à Distance peut vous aider à réaliser vos projets de fin d'études avec succès, où que vous soyez dans le monde.
        </p>
      </section>

      {/* Section Connexion */}
      <section id='Login' className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Connexion</h2>
        <div className="flex justify-between">
          {/* Carte de connexion Etudiant */}
          <div className='etu max-w-md mx-auto bg-white p-8 rounded shadow-lg mr-4'>
            <h4 className="text-xl font-semibold mb-4">Etudiant</h4>
            
            <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="max-w-md mx-auto bg-white p-8 rounded shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">Connexion</h2>
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700 font-semibold mb-2">Nom d'utilisateur :</label>
          <input type="text" id="username" name="username" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" placeholder="Entrez votre nom d'utilisateur" />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">Mot de passe :</label>
          <input type="password" id="password" name="password" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" placeholder="Entrez votre mot de passe" />
        </div>
        <div className="flex justify-center">
          <button type="submit" className="bg-blue-500 text-white font-semibold px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Se connecter</button>
        </div>
      </div>
    </div>



          </div>
          {/* Carte de connexion Enseignant */}
          <div className='ens max-w-md mx-auto bg-white p-8 rounded shadow-lg'>
            <h4 className="text-xl font-semibold mb-4">Enseignant</h4>

            <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="max-w-md mx-auto bg-white p-8 rounded shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">Connexion</h2>
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700 font-semibold mb-2">Nom d'utilisateur :</label>
          <input type="text" id="username" name="username" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" placeholder="Entrez votre nom d'utilisateur" />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">Mot de passe :</label>
          <input type="password" id="password" name="password" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" placeholder="Entrez votre mot de passe" />
        </div>
        <div className="flex justify-center">
          <button type="submit" className="bg-blue-500 text-white font-semibold px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Se connecter</button>
        </div>
      </div>
    </div>
             

          </div>
        </div>
      </section>

      {/* Section Contact */}
      <section id='Contact'>
        <h2 className="text-2xl font-bold mb-4">Contact</h2>
        <p>Vous pouvez contacter l'administration pour plus d'informations</p>
        <form className="mt-4">
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">Email :</label>
            <input type="text" id="email" name="email" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" placeholder="Entrez votre email" />
          </div>
          <div className="mb-4">
            <label htmlFor="message" className="block text-gray-700 font-semibold mb-2">Message :</label>
            <textarea id="message" name="message" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" placeholder="Entrez votre message ici" rows="4"></textarea>
          </div>
          <button type='submit' className="bg-blue-500 text-white font-semibold px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Envoyer</button>
        </form>
      </section>
    </div>
  );
}

export default Body;
