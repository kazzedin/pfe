import React, { useState } from 'react';

export default function ListePfe() {
    const [pfeList, setPFEList] = useState([
        {
            id: 1,
            title: "Projet 1",
            description: "Un projet de développement web pour créer un site e-commerce.",
            supervisor: "John Doe",
            type: "Développement web",
            students: ["Alice", "Bob"]
        },
        {
            id: 2,
            title: "Projet 2",
            description: "Un projet d'intelligence artificielle pour prédire le comportement des clients.",
            supervisor: "Jane Smith",
            type: "IA",
            students: ["Charlie", "David"]
        },
        // Ajoutez d'autres exemples de PFE selon vos besoins
    ]);

    const [selectedPFE, setSelectedPFE] = useState(null);
    const [filter, setFilter] = useState('');

    const handleDecision = (id, decision) => {
        // Vous pouvez implémenter la logique d'envoi de la décision à l'API ici
        console.log(`Décision pour le PFE ${id} : ${decision}`);
        // Mise à jour de l'état local si nécessaire
        // Exemple : Supprimer le PFE de la liste après avoir pris une décision
        setPFEList(prevPFEList => prevPFEList.filter(pfe => pfe.id !== id));
    };

    const handlePFEClick = (id) => {
        const pfe = pfeList.find(pfe => pfe.id === id);
        setSelectedPFE(pfe);
    };

    const handleFilterChange = (e) => {
        setFilter(e.target.value);
    };

    const filteredPFEList = filter ? pfeList.filter(pfe => pfe.type.toLowerCase().includes(filter.toLowerCase())) : pfeList;

    return (
        <div className="container mx-auto px-4 py-8 bg-gray-800 bg-opacity-30">
            <h1 className="text-3xl font-bold mb-6 text-white">Liste des PFE</h1>
            <div className="mb-4">
                <label htmlFor="filter" className="block text-sm font-medium text-white">Filtrer par type de projet :</label>
                <input
                    type="text"
                    id="filter"
                    name="filter"
                    className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm"
                    value={filter}
                    onChange={handleFilterChange}
                    placeholder="Entrez un type de projet (ex: Développement web)"
                />
            </div>
            {selectedPFE ? (
                <div className="border hover:bg-gray-300 bg-gray-100 p-4 rounded-lg mb-6">
                    <h2 className="text-xl font-semibold mb-2">{selectedPFE.title}</h2>
                    <p className="text-gray-600 mb-4">{selectedPFE.description}</p>
                    <p className="text-gray-600 mb-2">Encadreur: {selectedPFE.supervisor}</p>
                    <p className="text-gray-600 mb-2">Type: {selectedPFE.type}</p>
                    <p className="text-gray-600 mb-4">Binômes: {selectedPFE.students.join(', ')}</p>
                    <div className="flex justify-end">
                        <button onClick={() => setSelectedPFE(null)} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Fermer</button>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredPFEList.map(pfe => (
                        <div key={pfe.id} className="border border-gray-300 p-4 rounded-lg cursor-pointer hover:bg-gray-300 bg-gray-100" onClick={() => handlePFEClick(pfe.id)}>
                            <h2 className="text-xl font-semibold mb-2">{pfe.title}</h2>
                            <p className="text-gray-600 mb-2">Encadreur: {pfe.supervisor}</p>
                            <p className="text-gray-600 mb-2">Type: {pfe.type}</p>
                            <p className="text-gray-600 mb-4">Binômes: {pfe.students.join(', ')}</p>
                            <div className="flex justify-between">
                                <button onClick={() => handleDecision(pfe.id, 'valider')} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Valider</button>
                                <button onClick={() => handleDecision(pfe.id, 'invalider')} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Invalider</button>
                                <button onClick={() => handleDecision(pfe.id, 'voir_plus_tard')} className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">À voir plus tard</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
