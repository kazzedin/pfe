import React, { useEffect, useState } from 'react';
import { BsCalendar } from 'react-icons/bs';
import { IoIosArrowBack } from 'react-icons/io';
import { useNavigate,Link } from 'react-router-dom';
import axios from 'axios';

function Dates() {
    const [dates, setDates] = useState([]);
    const [newDate, setNewDate] = useState('');
    const [newTitle, setNewTitle] = useState('');
    const [newDefinition, setNewDefinition] = useState('');
    const [count, setCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editDateId, setEditDateId] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        axios.get('http://localhost:3001/admin/date')
            .then(res => {
                setDates(res.data);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, [count]);

    const handleAddDate = () => {
        if (newDate && newTitle && newDefinition) {
            axios.post('http://localhost:3001/admin/ajout-date', { date: newDate, title: newTitle, definition: newDefinition })
                .then(res => {
                    if (res.data.message === 'success') {
                        alert('Ajout de date réussi');
                        setCount(prev => prev + 1);
                        setDates(prevDates => [...prevDates, { date: newDate, title: newTitle, definition: newDefinition }]);
                    } else {
                        alert('Erreur lors de l\'ajout de date');
                    }
                })
                .catch(err => {
                    console.error(err);
                    alert('Erreur lors de l\'ajout de date');
                });
            setNewDate('');
            setNewTitle('');
            setNewDefinition('');
        } else {
            alert('Veuillez remplir tous les champs');
        }
    };

    const handelSupprimer = (id) => {
        axios.delete(`http://localhost:3001/admin/supp-date/${id}`)
            .then(res => {
                if (res.data.message === 'success') {
                    alert('Message supprimé avec succès');
                    setDates(prev => prev.filter(date => date._id !== id));
                }
            })
            .catch(err => console.error(err));
    };

    const handleEdit = () => {
        axios.put(`http://localhost:3001/admin/modif-date/${editDateId}`, { date: newDate, title: newTitle, definition: newDefinition })
            .then(res => {
                if (res.data.message === 'success') {
                    alert('Message modifié avec succès');
                    setDates(prev => prev.map(date => date._id === editDateId ? { ...date, date: newDate, title: newTitle, definition: newDefinition } : date));
                    setShowEditModal(false);
                }
            })
            .catch(err => console.error(err));
    };

    const openEditModal = (id, date, title, definition) => {
        setShowEditModal(true);
        setEditDateId(id);
        setNewDate(date);
        setNewTitle(title);
        setNewDefinition(definition);
    };

    const closeEditModal = () => {
        setShowEditModal(false);
        setEditDateId(null);
        setNewDate('');
        setNewTitle('');
        setNewDefinition('');
    };
    
    const returnAdmin = (e) => {
        e.preventDefault();
        navigate('/Admin/Setting');
    }

    return (
        <div className="container mx-auto px-4 py-8  page-date bg-gray-500 bg-opacity-5">
            <h1 className="text-xl font-bold mb-6">Dates importantes</h1>
            <div className='absolute left-0 top-0 flex items-center'>
                <div className='flex items-center '>
                    <Link onClick={returnAdmin} className='hover:text-red-500 text-black rounded return-admin flex items-center'>
                        <IoIosArrowBack className="mr-2" />
                        Retourner à la page d'administration
                    </Link>
                </div>
            </div>
            <div className="flex gap-4 mb-4">
                <input type="date" value={newDate} onChange={(e) => setNewDate(e.target.value)} className="border border-gray-300 rounded px-4 py-2" />
                <input type="text" placeholder="Titre de la date" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} className="border border-gray-300 rounded px-4 py-2" />
                <input type="text" placeholder="Définition" value={newDefinition} onChange={(e) => setNewDefinition(e.target.value)} className="border border-gray-300 rounded px-4 py-2" />
                <button onClick={handleAddDate} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">Ajouter</button>
            </div>
            {loading ? (
                <p>Chargement...</p>
            ) : error ? (
                <p>Une erreur s'est produite: {error}</p>
            ) : dates.length === 0 ? (
                <h4>Pas de date entrée.</h4>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                    {dates.map((date, index) => (
                        <div key={index} className="p-4 bg-white rounded-lg shadow-md flex items-center">
                            <BsCalendar className="text-blue-500 mr-2" />
                            <div>
                                <h2 className="text-lg font-semibold mb-2">{date.title}</h2>
                                <p>{new Date(date.date).toLocaleDateString()}</p>
                                <p>{date.definition}</p>
                                <div className="flex gap-1">
                                    <button onClick={() => openEditModal(date._id, date.date, date.title, date.definition)} className="text-white bg-blue-500 p-1 rounded-md hover:bg-blue-700">Modifier</button>
                                    <button onClick={() => handelSupprimer(date._id)} className="text-white bg-red-500 p-1 rounded-md hover:bg-red-700">Supprimer</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            {showEditModal && (
                <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-8 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-4">Modifier une date</h2>
                        <input type="date" value={newDate} onChange={(e) => setNewDate(e.target.value)} className="border border-gray-300 rounded px-4 py-2 mb-2" />
                        <input type="text" placeholder="Titre de la date" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} className="border border-gray-300 rounded px-4 py-2 mb-2" />
                        <input type="text" placeholder="Définition" value={newDefinition} onChange={(e) => setNewDefinition(e.target.value)} className="border border-gray-300 rounded px-4 py-2 mb-4" />
                        <div className="flex justify-end">
                            <button onClick={handleEdit} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">Modifier</button>
                            <button onClick={closeEditModal} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 ml-2">Annuler</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Dates;
