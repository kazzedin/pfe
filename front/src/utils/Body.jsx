import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Importez le composant Link de react-router-dom
import Contact from './Contact';
import LoginForm from './LoginForm';

const Body = () => {
  const [choixEtu, setChoixEtu] = useState(false);
  const [choixPrf, setChoixPrf] = useState(false);

  const handleChoixEtu = () => {
    setChoixEtu(!choixEtu);
    setChoixPrf(false);
  };

  const handleChoixPrf = () => {
    setChoixPrf(!choixPrf);
    setChoixEtu(false);
  };

  const WelcomeSection = () => (
    <section className="paragraphe mb-8 flex flex-row items-center justify-center">
      <div className="max-w-lg mr-8">
        <p className="text-lg text-black">
          <span className="titre text-5xl font-bold mb-4 text-black">Bienvenue sur Pfe à Distance ! </span>
          Notre plateforme innovante de gestion des projets de fin d'études vous offre une solution complète pour superviser, collaborer et suivre vos projets à distance. Grâce à notre interface conviviale et nos fonctionnalités avancées, vous pouvez facilement créer, organiser et suivre les projets, échanger des commentaires et des idées, fixer des jalons et des échéances, planifier des réunions virtuelles, et bien plus encore.
        </p>
      </div>
      <div>
        <img src="Home.png" alt="crew member" className="image" />
      </div>
    </section>
  );

  const LoginSection = () => (
    <section id="Login" className="mb-8 w-full flex justify-center flex-col items-center">
      <h2 className="text-2xl font-bold text-black mb-4">Connectez-vous</h2>
      <div className="flex justify-center items-center gap-20">
        <div className={`etu max-w-md bg-gray-100 bg-opacity-40 p-8 rounded-lg shadow-lg cursor-pointer transition-transform transform ${choixEtu ? 'translate-y-0 ease-out' : '-translate-y-2'}`}>
          <h4 className="text-xl font-semibold mb-4 text-black hover:text-blue-500" onClick={handleChoixEtu}>
            Étudiant <hr className={`${choixEtu ? 'hidden' : 'block'}`} />
          </h4>
          <p className={`text-sm ${choixEtu ? 'hidden' : 'block'} text-black mb-2`}>Si vous êtes étudiant, cliquez ici</p>
          {choixEtu && <LoginForm />}
        </div>
        <div className={`ens max-w-md bg-gray-100 bg-opacity-40 p-8 rounded-lg shadow-lg cursor-pointer transition-transform transform ${choixPrf ? 'translate-y-0 ease-out' : '-translate-y-2'}`}>
          <h4 className="text-xl font-semibold mb-4 text-black hover:text-blue-500" onClick={handleChoixPrf}>
            Enseignant <hr className={`${choixPrf ? 'hidden' : 'block'}`} />
          </h4>
          <p className={`text-sm ${choixPrf ? 'hidden' : 'block'} text-black mb-2`}>Si vous êtes enseignant, cliquez ici</p>
          {choixPrf && <LoginForm />}
        </div>
      </div>
     
    </section>
  );
  

  const ContactSection = () => (
    <section id="Contact" className="contact px-2 py-2 w-full bg-gray-100 p-8 rounded-lg text-black text-center shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Contact</h2>
      <p>Vous pouvez contacter l'administration pour plus d'informations</p>
      <Contact />
    </section>
  );
  

  const AboutSection = () => (
    <section id="About" className=" p-8 rounded-lg  ">
      <h2 className="text-2xl font-bold mb-4 text-center">À Propos de Pfe à Distance</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className=" p-4 rounded-lg">
          <h3 className="text-xl font-semibold mb-2 text-blue-600">Avantages de notre Plateforme</h3>
          <ul className="list-disc ml-6 flex flex-col gap-3">
            <li className="">Supervision facile des projets de fin d'études à distance.</li>
            <li className="">Collaboration efficace entre étudiants et enseignants.</li>
            <li className="">Suivi précis des étapes et des échéances du projet.</li>
            <li className="">Communication instantanée via des outils intégrés.</li>
          </ul>
        </div>
        <div className=" p-4 rounded-lg">
          <h3 className="text-xl font-semibold mb-2 text-blue-600">Fonctionnalités Clés</h3>
          <ul className="list-disc ml-6 flex flex-col gap-3">
            <li className="">Gestion des projets avec création de tâches et attribution.</li>
            <li className="">Forum de discussion pour échanger des idées et des conseils.</li>
            <li className="">Calendrier pour planifier des réunions et des deadlines.</li>
            <li className="">Stockage sécurisé des documents liés au projet.</li>
          </ul>
        </div>
      </div>
    </section>
  );
  

  return (
    <div className="contenaire2 flex flex-col items-center justify-center">
      <WelcomeSection />
      <LoginSection />
      <AboutSection />
      <ContactSection />
    </div>
  );
};

export default Body;
