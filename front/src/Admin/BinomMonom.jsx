import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';
import { FaCheckCircle, FaTimesCircle, FaUser, FaUserFriends } from 'react-icons/fa';
import axios from 'axios';

export default function ListeEtudiant() {
  // États
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [studentDetails, setStudentDetails] = useState(null);

  const exampleData = [
    {
      membre1: {
        "Nom/Prenom": "John Doe",
        "Matricule": "2021001",
        "Filier": "Informatique",
        "Section": "A",
        "Email": "john.doe@example.com"
      },
      membre2: {
        "Nom/Prenom": "Alice Smith",
        "Matricule": "2021003",
        "Filier": "Mathématiques",
        "Section": "B",
        "Email": "alice.smith@example.com"
      },
      Binome: true
    },
    {
      membre1: {
        "Nom/Prenom": "John Doe",
        "Matricule": "2021001",
        "Filier": "Informatique",
        "Section": "A",
        "Email": "john.doe@example.com"
      },
      membre2: {
        "Nom/Prenom": "Alice Smith",
        "Matricule": "2021003",
        "Filier": "Mathématiques",
        "Section": "B",
        "Email": "alice.smith@example.com"
      },
      Binome: true
    },
    {
      membre1: {
        "Nom/Prenom": "John Doe",
        "Matricule": "2021001",
        "Filier": "Informatique",
        "Section": "A",
        "Email": "john.doe@example.com"
      },
      membre2: {
        "Nom/Prenom": "Alice Smith",
        "Matricule": "2021003",
        "Filier": "Mathématiques",
        "Section": "B",
        "Email": "alice.smith@example.com"
      },
      Binome: true
    },
    {
      membre1: {
        "Nom/Prenom": "John Doe",
        "Matricule": "2021001",
        "Filier": "Informatique",
        "Section": "A",
        "Email": "john.doe@example.com"
      },
      membre2: {
        "Nom/Prenom": "Alice Smith",
        "Matricule": "2021003",
        "Filier": "Mathématiques",
        "Section": "B",
        "Email": "alice.smith@example.com"
      },
      Binome: true
    },
    {
      membre1: {
        "Nom/Prenom": "John Doe",
        "Matricule": "2021001",
        "Filier": "Informatique",
        "Section": "A",
        "Email": "john.doe@example.com"
      },
      membre2: {
        "Nom/Prenom": "Alice Smith",
        "Matricule": "2021003",
        "Filier": "Mathématiques",
        "Section": "B",
        "Email": "alice.smith@example.com"
      },
      Binome: true
    },
  
    {
      membre1: {
        "Nom/Prenom": "Bob Johnson",
        "Matricule": "2021004",
        "Filier": "Mathématiques",
        "Section": "B",
        "Email": "bob.johnson@example.com"
      },
      membre2: {
        "Nom/Prenom": "/", // / pour indiquer qu'il n'y a pas de membre 2
        "Matricule": "/",
        "Filier": "/",
        "Section": "/",
        "Email": "/"
      },
      Binome: false
    },
    {
      membre1: {
        "Nom/Prenom": "Bob Johnson",
        "Matricule": "2021004",
        "Filier": "Mathématiques",
        "Section": "B",
        "Email": "bob.johnson@example.com"
      },
      membre2: {
        "Nom/Prenom": "/", // / pour indiquer qu'il n'y a pas de membre 2
        "Matricule": "/",
        "Filier": "/",
        "Section": "/",
        "Email": "/"
      },
      Binome: false
    },
    {
      membre1: {
        "Nom/Prenom": "Bob Johnson",
        "Matricule": "2021004",
        "Filier": "Mathématiques",
        "Section": "B",
        "Email": "bob.johnson@example.com"
      },
      membre2: {
        "Nom/Prenom": "/", // / pour indiquer qu'il n'y a pas de membre 2
        "Matricule": "/",
        "Filier": "/",
        "Section": "/",
        "Email": "/"
      },
      Binome: false
    },
    {
      membre1: {
        "Nom/Prenom": "Bob Johnson",
        "Matricule": "2021004",
        "Filier": "Mathématiques",
        "Section": "B",
        "Email": "bob.johnson@example.com"
      },
      membre2: {
        "Nom/Prenom": "/", // / pour indiquer qu'il n'y a pas de membre 2
        "Matricule": "/",
        "Filier": "/",
        "Section": "/",
        "Email": "/"
      },
      Binome: false
    }
  ];

  useEffect(() => {
    setStudents(exampleData);
  }, []);

  const handleCloseWindow = (e) => {
    e.preventDefault();
    setShowModal(false);
  };

  const handleOpenWindow = (e, info) => {
    e.preventDefault();
    setShowModal(true);
    setStudentDetails(info);
  };

  return (
    <div className='page-etudiant relative bg-gray-500 bg-opacity-5'>
      <div className='top-0 left-0 absolute flex items-center'>
        <div className='flex items-center'>
          <Link to='/Admin/Setting' className='hover:text-red-500 text-black rounded flex items-center ml-4 mt-4'>
            <IoIosArrowBack className='mr-2' />
            Retourner à la page d'administration
          </Link>
        </div>
      </div>

      <h1 className='font-bold text-3xl mb-4 text-black mt-4 text-center'>Liste Des Binomes et Monomes</h1>

      <div className='search-bar'>
        <label htmlFor='table-search' className='sr-only'>
          Search
        </label>
        <div className='relative'>
          <div className='absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none'>
            <svg
              className='w-4 h-4 ml-2  dark:text-gray-400 text-black'
              aria-hidden='true'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 20 20'>
              <path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z' />
            </svg>
          </div>
          <input
            type='text'
            id='table-search'
            className='ml-4 bg-white text-black text-sm w-64 h-9 rounded-md border-none search placeholder:text-black'
            placeholder='Chercher Binomes/Monomes'
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
        </div>
      </div>

      <div className='table-container'>
        <div className='relative overflow-x-auto shadow-md sm:rounded-lg table-etudiant mt-4' style={{ maxHeight: 'calc(100vh - 300px)', overflowY: 'auto' }}>
          <table className='w-full text-sm text-left rtl:text-right  text-white '>
            <thead className='text-xs text-gray-700 uppercase bg-gray-300 dark:bg-gray-700 dark:text-gray-400'>
              <tr>
                <th scope='col' className='px-6 py-3 bg-gray-300 text-black'>
                  Binôme/Monôme
                </th>
                <th scope='col' className='px-6 py-3 bg-gray-300 text-black'>
                  Nom/Prenom(Membre1)
                </th>
                <th scope='col' className='px-6 py-3 bg-gray-300 text-black'>
                  Nom/Prenom(Membre2)
                </th>
                <th scope='col' className='px-6 py-3 bg-gray-300 text-black'>
                  Matricule(Membre1)
                </th>
                <th scope='col' className='px-6 py-3 bg-gray-300 text-black'>
                  Matricule(Membre2)
                </th>
                <th scope='col' className='px-6 py-3 bg-gray-300 text-black'>
                  Email(Membre1)
                </th>
                <th scope='col' className='px-6 py-3 bg-gray-300 text-black'>
                  Email(Membre2)
                </th>
                <th scope='col' className='px-6 py-3 bg-gray-300 text-black'>
                  Filier
                </th>
                <th scope='col' className='px-6 py-3 bg-gray-300 text-black'>
                  Section(Membre1)
                </th>
                <th scope='col' className='px-6 py-3 bg-gray-300 text-black'>
                  Section(Membre2)
                </th>
              </tr>
            </thead>
            <tbody>
              {students
                .filter((student, index) => {
                  if (!search) return true;
                  return (
                    String(student.membre1["Nom/Prenom"]).toLowerCase().includes(search.toLowerCase()) ||
                    String(student.membre1["Email"]).toLowerCase().includes(search.toLowerCase()) ||
                    String(student.membre1["Matricule"]).toLowerCase().includes(search.toLowerCase())
                  );
                })
                .map((row, index) => (
                  <tr
                    key={index}
                    className='bg-white border-b transition duration-300 hover:bg-gray-50  '>
                    <td className='px-6 py-4 text-black cursor-pointer'>
                      {row.Binome ? <FaUserFriends className="inline-block mr-1" /> : <FaUser className="inline-block mr-1" />}
                      {row.Binome ? 'Binôme' : 'Monôme'}
                    </td>
                    <td className='px-6 py-4 text-black cursor-pointer' onClick={(e) => handleOpenWindow(e, row.membre1)}>
                      {row.membre1["Nom/Prenom"]}
                    </td>
                    <td className='px-6 py-4 text-black cursor-pointer' onClick={(e) => handleOpenWindow(e, row.membre2)}>
                      {row.membre2["Nom/Prenom"]}
                    </td>
                    <td className='px-6 py-4 text-black'>
                      {row.membre1["Matricule"]}
                    </td>
                    <td className='px-6 py-4 text-black'>
                      {row.membre2["Matricule"]}
                    </td>
                    <td className='px-6 py-4 text-black'>
                      {row.membre1["Email"]}
                    </td>
                    <td className='px-6 py-4 text-black'>
                      {row.membre2["Email"]}
                    </td>
                    <td className='px-6 py-4 text-black'>
                      {row.membre1["Filier"]}
                    </td>
                    <td className='px-6 py-4 text-black'>
                      {row.membre1["Section"]}
                    </td>
                    <td className='px-6 py-4 text-black'>
                      {row.membre2["Section"]}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Window */}
      {showModal && studentDetails && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center ">
          <div className="bg-white p-6 rounded-lg shadow-md w-96 fenetre">
            <h2 className="text-lg font-semibold mb-4">Information Etudiant</h2>
            {/* Afficher les détails de l'étudiant */}
            <div className="mb-4">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">Nom/Prenom:</label>
              <input type="text" id="title" readOnly className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" value={studentDetails["Nom/Prenom"]} />
            </div>
            <div className="mb-4">
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">Section:</label>
              <input type="text" name="section" id="section" value={studentDetails["Section"]} readOnly />
            </div>
            <div className="mb-4">
              <label htmlFor="file" className="block text-sm font-medium text-gray-700">Filier:</label>
              <input type="text" id="filier" className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" value={studentDetails["Filier"]} />
            </div>
            <div className="mb-4">
              <label htmlFor="file" className="block text-sm font-medium text-gray-700">Matricule:</label>
              <input type="text" id="matricule" className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" value={studentDetails["Matricule"]} />
            </div>
            <div className="mb-4">
              <label htmlFor="file" className="block text-sm font-medium text-gray-700">Email:</label>
              <input type="text" id="email" className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" value={studentDetails["Email"]} />
            </div>
            {/* Autres détails */}
            <div>
              {/* Insérer ici la logique pour déterminer si l'e-mail a été envoyé */}
              <div className="mb-4">
                <label htmlFor="file" className="block text-sm font-medium  text-red-600">Etat d'envoi:</label>
                <input type="text" id="email" className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" value={'plus tard....'} />
              </div>
              {/* Insérer ici la logique pour déterminer si c'est un binôme ou un monôme */}
              <div className="mb-4">
                <label htmlFor="file" className="block text-sm font-medium  text-red-600">Etat de Binom:</label>
                <input type="text" id="email" className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" value={'plus tard....'} />
              </div>
            </div>
            <div className="flex justify-center">
              <button onClick={handleCloseWindow} className="ml-2 text-white  px-4 py-2 rounded-md bg-blue-500">Annuler</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
