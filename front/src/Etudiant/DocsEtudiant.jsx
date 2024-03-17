import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaFileDownload } from 'react-icons/fa';

export default function Docs() {
  const [docs, setDocs] = useState([]);
  const [image,setImage]=useState('');

  useEffect(() => {
    axios.get('http://localhost:3001/etudiant/get-docs')
      .then(res => {
        setDocs(res.data);
      })
      .catch(err => {
        console.log(err);
      });
      setImage("http://localhost:3001/etudiant/get-thumbnail/notes (2).pdf")
  }, []);

  const downloadDocument = (filename) => {
    const downloadUrl = `http://localhost:3001/etudiant/download-doc/${filename}`;
    window.open(downloadUrl, '_blank');
  };

  return (
    <div className=" mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-6">Documents Disponibles</h1>
      {docs.length > 0 ? (
        <div className="grid gap-4">
          {docs.map(item => (
            <div key={item._id} className="border p-4 rounded-lg shadow-md flex flex-col">
              {/* Insérez ici l'élément d'image miniature */}
              <img src={`http://localhost:3001/etudiant/get-thumbnail/${item.file.filename}`} alt={item.titre} className="mb-4 rounded-md" style={{ maxWidth: '200px',maxHeight:"200px" }} />

              <div>
                <h3 className="font-semibold">Titre:</h3>
                <p className="text-lg">{item.titre}</p>
              </div>
              <div>
                <h3 className="font-semibold">Description:</h3>
                <p className="text-md">{item.description}</p>
              </div>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4 flex items-center justify-center"
                onClick={() => downloadDocument(item.file.filename)}
              >
                <FaFileDownload className="mr-2" />
                Télécharger
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center">
          <h2 className="text-lg">Aucun document disponible pour le moment</h2>
        </div>
      )}
    </div>
  );
}
