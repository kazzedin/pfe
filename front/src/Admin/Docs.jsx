import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { IoIosArrowBack } from 'react-icons/io';
import { RiFileList3Line } from 'react-icons/ri';

const DocsPage = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [numberFile, setNumberFile] = useState(0);
  const [docs, setDocs] = useState([]);
  const [category, setCategory] = useState('Etudiant');
  const [description, setDescription] = useState('');
  const [selectedDocumentInfo, setSelectedDocumentInfo] = useState(null);
  const [showDocumentinfo,setShowDocumentInfo]=useState(false);

  useEffect(() => {
    axios.get('http://localhost:3001/admin/get-docs')
      .then(res => setDocs(res.data))
      .catch(err => console.log(err))
  }, [numberFile]);



  console.log(docs)
  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    setFile(uploadedFile);
  };

  const handleEditModalOpen = (e,document) => {
    e.stopPropagation();
    setSelectedDocument(document);
    setShowEditModal(true);
  };

  const handleEditModalClose = () => {
    setSelectedDocument(null);
    setShowEditModal(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', title);
    formData.append('category', category);
    formData.append('description', description);

    try {
      const response = await axios.post('http://localhost:3001/admin/docs', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.data.message === 'success') {
        alert('Le fichier a été stocké avec succès!');
        setTitle('');
        setDescription('');
        setCategory('Etudiant');
        setFile(null);
        setNumberFile(prev => prev + 1);
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error('Erreur lors de l\'envoi du fichier:', error.message);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', title);
    formData.append('category', category);
    formData.append('description', description);

    try {
      const response = await axios.put(`http://localhost:3001/admin/docs-modif/${selectedDocument._id}`, formData);

      if (response.data.message === 'success') {
        alert('Le fichier a été modifié avec succès!');
        setTitle('');
        setDescription('');
        setCategory('Etudiant');
        setFile(null);
        setShowEditModal(false);
        setNumberFile(prev => prev + 1);
      }
    } catch (error) {
      console.error('Erreur lors de la modification du fichier:', error.message);
    }
  };

  const handleDeleteSubmit = async (e, filename) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const response = await axios.delete(`http://localhost:3001/admin/docs-supp/${filename}`);
      if (response.data.message === 'success') {
        alert('Le fichier a été supprimé avec succès!');
        setTitle('');
        setDescription('');
        setCategory('Etudiant');
        setFile(null);
        setShowEditModal(false);
        setDocs(prevDocs => prevDocs.filter(doc => doc.file.filename !== filename));
      }
    } catch (err) {
      console.error('Erreur lors de la suppression du fichier', err);
    }
  };

  // Fonction pour générer un ID unique
  
  const HandelOpenDocinfo=(e,info)=>{
    e.preventDefault();
    setShowDocumentInfo(true);
    setSelectedDocumentInfo(info);
  }

  function formatDate(date) {
    // Créer un objet Date à partir du timestamp
    const currentDate = new Date(date);
  
    // Obtenir les composants de la date
    const day = currentDate.getDate();
    const month = currentDate.toLocaleString('default', { month: 'long' }); // Obtenir le nom du mois
    const year = currentDate.getFullYear();
  
    // Retourner la date formatée
    return `${month} ${day}, ${year}`;
  }
  
console.log(category)
  return (
    <div className="container mx-auto mt-8 overflow-auto">
      <div className="flex items-center">
        <Link to="/Admin/Setting" className="text-black rounded-md m-2 flex items-center hover:text-red-500 mt-2">
          <IoIosArrowBack className="mr-2" /> Retourner à la page d'administration
        </Link>
      </div>
      <h1 className="text-3xl font-bold mt-4 mb-8 text-center">Gestion des documents</h1>
      <button onClick={() => setShowAddModal(true)} className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-md mb-4 inline-block ml-4">Ajouter un document +</button>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
  {docs.length > 0 ? docs.map((document) => (
    <div key={document._id} className="max-w-sm rounded border overflow-hidden shadow-lg cursor-pointer transform transition duration-300 hover:shadow-xl flex flex-col justify-between" onClick={(e)=>HandelOpenDocinfo(e,document)}>
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{document.titre}</div>
        <RiFileList3Line></RiFileList3Line>
        <p className="text-gray-700 text-base">
          <span className="font-semibold">DateAjout :</span> {formatDate(document.dateAjout)}
        </p>
        <p className="text-gray-700 text-base">
          <span className="font-semibold">Destinataire :</span> {document.distinataire}
        </p>
        <p className="text-gray-700 text-base">
          <span className="font-semibold">Nom de fichier :</span> {document.file.filename}
        </p>
        <p className="text-gray-700 text-base">
          <span className="font-semibold">Description :</span> {document.description.split(' ').slice(0, 6).join(' ')}...
        </p>
      </div>
      <div className="px-6 py-4 flex justify-center items-center">
        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md mr-2" onClick={(e) => handleDeleteSubmit(e, document.file.filename)}>Supprimer</button>
        <button onClick={(e) => handleEditModalOpen(e,document)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md">Modifier</button>
      </div>
    </div>
  )) : <h4 className='font-bold text-md text-black ml-5'>Pas de documents!</h4>}
</div>

      {showAddModal && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-10">
          <div className="bg-white  p-8 rounded-lg shadow-lg fenetre-ajout-docs flex flex-col ">
            <h2 className="text-xl font-semibold mb-4" style={{textDecoration:'underline'}}>Ajouter un document</h2>
            <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
              <div className="mb-4">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">Titre:</label>
                <input type="text" id="title" className="mt-1 border focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-400 rounded-sm h-9" value={title} onChange={(e) => setTitle(e.target.value)} />
              </div>
              <div className="mb-4">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description:</label>
                <textarea id="description" className="mt-1 focus:ring-blue-500 border focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-400 rounded-sm h-9 pl-2" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
              </div>
              <div className="mb-4">
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">Catégorie:</label>
                <select id="category" className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border border-gray-400 h-9 rounded-md" value={category} onChange={(e) => setCategory(e.target.value)}>
                  <option value="Étudiant">Etudiant</option>
                  <option value="Professeur">Professeur</option>
                  <option value="Tout">Tout</option>
                </select>
              </div>
              <div className="mb-4">
                <label htmlFor="file" className="block text-sm font-medium text-gray-700">Fichier</label>
                <input type="file" id="file" className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 " onChange={handleFileChange} />
              </div>
              <div className="flex justify-end">
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">Ajouter</button>
                <button onClick={() => setShowAddModal(false)} className="ml-2 bg-gray-300 text-gray-700 px-4 py-2 rounded-md">Annuler</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showEditModal && selectedDocument && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-10 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-md  fenetre-ajout-docs flex flex-col">
            <h2 className="text-lg font-semibold mb-4">Modifier le document</h2>
            <form onSubmit={handleEditSubmit} className='flex flex-col gap-4'>
              <div className="mb-4">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">Titre</label>
                <input type="text" id="title" className="mt-1 focus:ring-blue-500 focus:border-blue-500 border  block w-full shadow-sm sm:text-sm border-gray-300 h-9 rounded-sm" value={title} onChange={(e) => setTitle(e.target.value)} />
              </div>
              <div className="mb-4">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                <textarea id="description" className="mt-1 focus:ring-blue-500 focus:border-blue-500 border block w-full shadow-sm sm:text-sm border-gray-400 h-9 rounded-sm" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
              </div> 
              <div className="mb-4">
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">Catégorie</label>
                <select id="category" className="mt-1 focus:ring-blue-500 focus:border-blue-500 border block w-full shadow-sm sm:text-sm border-gray-400 h-9 rounded-sm" value={category} onChange={(e) => setCategory(e.target.value)}>
                  <option value="Étudiant">Étudiant</option>
                  <option value="Professeur">Professeur</option>
                  <option value="Tout">Tout</option>
                </select>
              </div>
              <div className="mb-4">
                <label htmlFor="file" className="block text-sm font-medium text-gray-700">Fichier</label>
                <input type="file" id="file" className="mt-1 focus:ring-blue-500 focus:border-blue-500  block w-full  sm:text-sm  h-9 " onChange={handleFileChange} />
              </div>
              {file && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Fichier choisi :</label>
                  <span className="text-sm text-gray-600">{file.name}</span>
                </div>
              )}
              <div className="flex justify-end">
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">Enregistrer</button>
                <button onClick={handleEditModalClose} className="ml-2 bg-gray-300 text-gray-700 px-4 py-2 rounded-md">Annuler</button>
              </div>
            </form>
          </div>
        </div>
      )}
      {selectedDocumentInfo  && showDocumentinfo &&(
  <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-10">
    <div className="bg-white w-96 p-8 rounded-lg shadow-lg flex flex-col gap-2 justify-center items-start">
      <h2 className="text-xl font-semibold mb-4" style={{textDecoration:'underline'}}>{selectedDocumentInfo.titre}</h2>
      <p className="text-gray-700 text-base">
        <span className="font-semibold">Destinataire :</span> {selectedDocumentInfo.distinataire}
      </p>
      <p className="text-gray-700 text-base">
        <span className="font-semibold">Nom de fichier :</span> {selectedDocumentInfo.file.filename}
      </p>
      <p className="text-gray-700 text-base">
        <span className="font-semibold">Description :</span> {selectedDocumentInfo.description}
      </p>
      {/* Boutons pour fermer la fenêtre modale */}
      <button onClick={() => setShowDocumentInfo(false)} className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md mt-4">Fermer</button>
    </div>
  </div>
)}
    </div>
  );
}

export default DocsPage;
