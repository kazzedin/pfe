import React, { useState } from 'react';
import Select from 'react-select';
import { Link, useNavigate } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';
import * as XLSX from 'xlsx';
import {FaCheck, FaTimes,FaAngleDown, FaAngleUp} from 'react-icons/fa';
import axios from 'axios';

export default function ListeEtudiant() {
  const [students, setStudents] = useState([]);
  const [filter, setFilter] = useState('');
  const [subFilter, setSubFilter] = useState('');
  const [search, setSearch] = useState('');
  const [selectAll, setSelectAll] = useState(false);
  const [individualSelection, setIndividualSelection] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [emailEtu, setEmailEtu] = useState([]);
  const [envoyer, setEnvoyer]=useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

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

  

  const navigate = useNavigate();
  const returnAdmin = (e) => {
    e.preventDefault();
    navigate('/Admin');
  };

  const HandelSearch=(e)=>{
    e.preventDefault();
    setSearch(e.target.value);
  }

  const handleSelectAll = () => {
    const newSelectAllState = !selectAll;
    setSelectAll(newSelectAllState);
    
    const newIndividualSelection = {};
    students.forEach((student, index) => {
      newIndividualSelection[index] = newSelectAllState;
    });
    setIndividualSelection(newIndividualSelection);
  
    if (newSelectAllState) {
      // Si "Sélectionner tout" est coché, ajoutez tous les e-mails à la liste
      const allEmails = students.map(student => student['email']);
      setEmailEtu(new Set(allEmails));
    } else {
      // Si "Sélectionner tout" est décoché, effacez la liste des e-mails
      setEmailEtu(new Set());
    }
  };
  

  const handleCheckboxChange = (index, email) => {
    const newIndividualSelection = { ...individualSelection };
    newIndividualSelection[index] = !newIndividualSelection[index];
    setIndividualSelection(newIndividualSelection);
  
    if (newIndividualSelection[index]) {
      // Case is checked, add email to the list
      setEmailEtu(prevEmails => new Set([...prevEmails, email]));
    } else {
      // Case is unchecked, remove email from the list
      setEmailEtu(prevEmails => {
        const updatedEmails = new Set(prevEmails);
        updatedEmails.delete(email);
        return updatedEmails;
      });
    }
  };

  
console.log(emailEtu)
  const EnvoyerEmail=(e)=>{
    e.preventDefault()
    const emaillArray=[...emailEtu]
    
    axios.post('http://localhost:3001/admin/login-info',{email:emaillArray})
    .then(res=>{
      if(res.data.message==='success'){
        alert('Success to send Login Info')
        setEnvoyer(true);
      }else{
        alert('Error to send Login Info')
      }
    })
    .catch(err=>console.log(err))

    setEnvoyer(false);
  }

  
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
        {students.length > 0 && (
        <button
          disabled={!Object.values(individualSelection).some(selected => selected)}
          className={`bg-blue-500 px-4 py-2 text-white  rounded cursor-pointer ${
            !Object.values(individualSelection).some(selected => selected) ? 'opacity-50 cursor-not-allowed' : '  hover:bg-blue-700 '
          }`}
          onClick={EnvoyerEmail}>
          Envoyer
        </button>
      )}
        <div className="top-0 right-0 absolute flex text-left mr-2 mt-2">
      <button onClick={toggleMenu} type="button" className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none ">
        Options
        {isOpen ? <FaAngleUp className="ml-2" /> : <FaAngleDown className="ml-2" />}
      </button>
      {isOpen && (
        <div className=" absolute right-0 mt-10 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            <p  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Edit</p>
            <p  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">View</p>
            <p  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Delete</p>
          </div>
        </div>
      )}
    </div>

       
      </div>

      <div className="search-bar">
        <label htmlFor="table-search" className="sr-only">Search</label>
        <div className="relative">
          <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg className="w-4 h-4 ml-6 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
          </div>
          <input type="text" id="table-search" className="ml-4 bg-gray-800 text-white text-sm w-64 h-9 rounded-sm border-none search" placeholder="Chercher étudiant" onChange={HandelSearch} value={search}/>
        </div>
      </div>

      <div className="table-container">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg table-etudiant mt-4" style={{ maxHeight: 'calc(100vh - 300px)', overflowY: 'auto' }}>
          <table className="w-full text-sm text-left rtl:text-right text-white ">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
              <th scope="col" className="p-4">
  <div className="flex items-center">
    <input 
      id="checkbox-all-search" 
      type="checkbox" 
      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" 
      onChange={handleSelectAll} 
      checked={selectAll}
    />
    <label htmlFor="checkbox-all-search" className="ml-2">Sélectionner tout</label>
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
                <th scope="col" className="px-6 py-3">
                  Etat
                </th>
              </tr>
            </thead>
            <tbody>
              {students
                .filter((student, index) => {
                  if (!search) return true;
                  return (
                    String(student['nom/prenom']).toLowerCase().includes(search.toLowerCase()) ||
                    String(student['email']).toLowerCase().includes(search.toLowerCase()) ||
                    String(student['matricule']).toLowerCase().includes(search.toLowerCase())
                  );
                })
                .map((row, index) => (
                  <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <td className="w-4 p-4">
                      <div className="flex items-center">
                        <input 
                          id={`checkbox-table-search-${index}`} 
                          type="checkbox" 
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" 
                          checked={individualSelection[index] || false}
                          onChange={() => handleCheckboxChange(index,row['email'])}
                        />
                        <label htmlFor={`checkbox-table-search-${index}`} className="sr-only">checkbox</label>
                      </div>
                    </td>
                    {Object.values(row).map((value, index) => (
                      <td key={index} className="px-6 py-4">{value}</td>
                    ))}
                   <td>
  {
    envoyer && emailEtu.has(row['email']) ? 
    <div><p>Envoyé</p><FaCheck className='text-green-500' /></div> :
    <div><p>Non envoyé</p><FaTimes className='text-red-500' /></div>
  }
</td>
                  </tr>
                ))}
            </tbody>
          </table>
          <div>{students.length < 0 ? <h4>Loading....</h4> : ""}</div>
        </div>
      </div>
    </div>
  );
}