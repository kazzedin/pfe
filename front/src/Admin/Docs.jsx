import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';
import { RiFileList3Line } from 'react-icons/ri';

const DocsPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Étudiant');

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    setFile(uploadedFile);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logique pour ajouter le document à la liste des documents
    const newDocument = {
      id: documents.length + 1,
      title: title,
      type: "Document",
      category: category
    };
    setDocuments([...documents, newDocument]);
    // Réinitialiser les champs et fermer la fenêtre modale
    setTitle('');
    setCategory('Étudiant');
    setFile(null);
    setShowModal(false);
  };

  const [documents, setDocuments] = useState([
    { id: 1, title: "Guide pour la rédaction du mémoire", type: "Document", category: "Étudiant" },
    { id: 2, title: "Modèle de plan de mémoire", type: "Document", category: "Étudiant" },
    { id: 3, title: "Instructions pour la soumission en ligne", type: "Document", category: "Étudiant" },
    { id: 4, title: "Guide pour l'évaluation des PFE", type: "Document", category: "Professeur" },
    { id: 5, title: "Grille d'évaluation", type: "Document", category: "Professeur" },
  ]);

  return (
    <div className="container mx-auto mt-8  bg-gray-800 bg-opacity-40">
      <div className="flex items-center">
        <Link to="/Admin" className="text-blue-500 flex items-center">
          <IoIosArrowBack className="mr-2" /> Retour à l'espace administrateur
        </Link>
      </div>
      <h1 className="text-3xl text-white font-bold mt-4 mb-8">Gestion des documents</h1>
      <button onClick={() => setShowModal(true)} className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4 inline-block">Ajouter un document</button>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {documents.map(document => (
          <div key={document.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">{document.title}</h2>
              <RiFileList3Line className="text-gray-600 text-2xl" />
            </div>
            <div className="flex items-center text-gray-600 mb-2">
              <span className="mr-2">{document.type}</span>
              <span>({document.category})</span>
            </div>
            <div className="flex justify-end">
              <a href="#" className="text-blue-500 hover:underline">Télécharger</a>
            </div>
          </div>
        ))}
      </div>

      {/* Fenêtre modale pour ajouter un document */}
      {showModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-md w-96">
            <h2 className="text-lg font-semibold mb-4">Ajouter un document</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">Titre</label>
                <input type="text" id="title" className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" value={title} onChange={(e) => setTitle(e.target.value)} />
              </div>
              <div className="mb-4">
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">Catégorie</label>
                <select id="category" className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" value={category} onChange={(e) => setCategory(e.target.value)}>
                  <option value="Étudiant">Étudiant</option>
                  <option value="Professeur">Professeur</option>
                </select>
              </div>
              <div className="mb-4">
                <label htmlFor="file" className="block text-sm font-medium text-gray-700">Fichier</label>
                <input type="file" id="file" className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" onChange={handleFileChange} />
              </div>
              <div className="flex justify-end">
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">Ajouter</button>
                <button onClick={() => setShowModal(false)} className="ml-2 bg-gray-300 text-gray-700 px-4 py-2 rounded-md">Annuler</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default DocsPage;
