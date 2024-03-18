import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaSearch } from 'react-icons/fa';
import { IoIosArrowBack } from 'react-icons/io';
import {Link} from 'react-router-dom'

export default function EtuDates() {
  const [dates, setDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [filterDate, setFilterDate] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:3001/etudiant/get-date')
      .then(response => setDates(response.data))
      .catch(err => console.log(err));
  }, []);

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setShowModal(true);
  };

  const filteredDates = dates.filter(date =>
    date.date.includes(filterDate)
  );

  const closeModal = () => {
    setShowModal(false);
  };
  const returnEtudiant = (e) => {
    e.preventDefault();
    navigate('/Etudiant');
  };


  return (
    <div className=" mx-auto py-8 date-container relative ">
     <div className='absolute top-0 left-0 '>
     <div className='   flex justify-start items-start mb-2 '>
          <Link to="/Etudiant" className='hover:bg-red-700 text-white bg-red-500 p-1 rounded flex items-center m-2 '>
            <IoIosArrowBack className='mr-2' />
            Retourner à la page d'étudiant
          </Link>
        </div>
      </div>
      <h1 className="text-2xl font-semibold mb-6 text-center" style={{ textDecoration: 'underline' }}>Dates</h1>
      <div className="flex items-center mb-4">
        <label htmlFor="filter" className="mr-2">Chercher une date :</label>
        <div className="relative">
          <input
            type="text"
            id="filter"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            placeholder="taper le jour"
            className="border border-gray-300 rounded-md px-8 py-1 focus:outline-none focus:ring focus:border-blue-500"
          />
          <FaSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredDates.map(date => (
          <div
            key={date._id}
            className={`bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md cursor-pointer transform transition duration-300 hover:shadow-xl`}
            onClick={() => handleDateClick(date)}
          >
            <div className="p-4">
              <div className='bg-gray-200'>
                <h3 className="text-lg font-semibold mb-2 ml-32">{date.title}</h3>
              </div>
              <p className="text-gray-600"><span className='font-bold'>Description:</span>{date.description.split(' ').slice(0, 6).join(' ')}...</p>
              <p className="text-red-500 font-bold"><span className='text-lg'>Date:</span>{new Date(date.date).toLocaleDateString()}</p>
            </div>
          </div>
        ))}
      </div>
      {showModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0  bg-gray-800 opacity-10"></div>
            </div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <h2 className="text-2xl font-semibold mb-2">{selectedDate && selectedDate.title}</h2>
                <p className="text-red-500 font-bold">{selectedDate && new Date(selectedDate.date).toLocaleDateString()}</p>
                <p><span className='font-bold'>Description:</span>{selectedDate && selectedDate.description}</p>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button onClick={closeModal} className="modal-close bg-red-500 text-white hover:bg-red-700 p-2 rounded-md m-1">
                  Fermer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


