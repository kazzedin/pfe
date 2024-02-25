import React, { useState } from 'react';
import Select from 'react-select';
import { Link, useNavigate } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';
import * as XLSX from 'xlsx';

export default function ListeEtudiant() {
  const [students, setStudents] = useState([]);
  const [filter, setFilter] = useState('');
  const [subFilter, setSubFilter] = useState('');

  const handleFileUpload = (e) => {
    const reader = new FileReader();
    reader.readAsBinaryString(e.target.files[0]);
    reader.onload = (e) => {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const parsedData = XLSX.utils.sheet_to_json(sheet);
      setStudents(parsedData);
    };
  }

  const handleFilterChange = (selectedOption) => {
    setFilter(selectedOption);
    setSubFilter('');
  };

  const handleSubFilterChange = (selectedOption) => {
    setSubFilter(selectedOption);
  };

  const options = [
    { value: 'acad', label: 'Acad' },
    { value: 'isil', label: 'ISIL' },
    { value: 'gtr', label: 'GTR' }
  ];

  const subOptions = {
    acad: [
      { value: 'acad a', label: 'Acad A' },
      { value: 'acad b', label: 'Acad B' },
      { value: 'acad c', label: 'Acad C' }
    ],
    isil: [
      { value: 'isil a', label: 'ISIL A' },
      { value: 'isil b', label: 'ISIL B' }
    ]
  };

  const navigate = useNavigate();
  const returnAdmin = (e) => {
    e.preventDefault();
    navigate('/Admin');
  };

  return (
    <div className='page-etudiant relative bg-gray-800 bg-opacity-40'>
      <div className='top-0 left-0 absolute flex items-center'>
        <div className='flex items-center'>
          <Link onClick={returnAdmin} className='hover:text-red-700 text-white rounded flex items-center ml-4 mt-4'>
            <IoIosArrowBack className="mr-2" />
            Retourner à la page d'administration
          </Link>
        </div>
      </div>

      <h1 className='font-bold text-3xl mb-4 text-white mt-4 text-center'>Liste Etudiant</h1>

      <div className='flex flex-row justify-center items-center gap-3 mb-4'>
        <label htmlFor="file-upload" className="file-upload-button">
          Choisir un fichier
        </label>
        <input type="file" id="file-upload" onChange={handleFileUpload} accept=".xls,.xlsx" style={{ display: 'none' }} />

        <Select
          value={filter}
          onChange={handleFilterChange}
          options={options}
          placeholder="Sélectionner une filière"
          className="mr-4"
        />

        {filter && (
          <Select
            value={subFilter}
            onChange={handleSubFilterChange}
            options={subOptions[filter.value]}
            placeholder={`Sélectionner une filière ${filter.label}`}
            className="mr-4"
          />
        )}
      </div>

      <div className="search-bar">
        <label htmlFor="table-search" className="sr-only">Search</label>
        <div className="relative">
          <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg className="w-4 h-4 ml-2 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
          </div>
          <input type="text" id="table-search" className="ml-4 bg-gray-800 text-white text-sm w-64 h-9 rounded-sm border-none search" placeholder="Chercher étudiant"/>
        </div>
      </div>

      <div className="table-container">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg table-etudiant mt-4" style={{ maxHeight: 'calc(100vh - 300px)', overflowY: 'auto' }}>
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="p-4">
                  <div className="flex items-center">
                    <input id="checkbox-all-search" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                    <label htmlFor="checkbox-all-search" className="sr-only">All</label>
                  </div>
                </th>
                <th scope="col" className="px-6 py-3">
                  Nom/Prenom
                </th>
                <th scope="col" className="px-6 py-3">
                  Email
                </th>
                <th scope="col" className="px-6 py-3">
                  Matricule
                </th>
                <th scope="col" className="px-6 py-3">
                  Filier
                </th>
                <th scope="col" className="px-6 py-3">
                  Section
                </th>
              </tr>
            </thead>
            <tbody>
              {students.map((row, index) => (
                <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <td className="w-4 p-4">
                    <div className="flex items-center">
                      <input id="checkbox-table-search-2" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                      <label htmlFor="checkbox-table-search-2" className="sr-only">checkbox</label>
                    </div>
                  </td>
                  {Object.values(row).map((value, index) => (
                    <td key={index} className="px-6 py-4">{value}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <div>
            {students.length < 0 ? <h4>Loading....</h4> : ""}
          </div>
        </div>
      </div>
    </div>
  );
}
