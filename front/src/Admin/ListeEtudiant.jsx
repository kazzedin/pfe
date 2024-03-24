import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';
import * as XLSX from 'xlsx';
import { FaCheckCircle, FaTimesCircle, FaAngleDown, FaAngleUp } from 'react-icons/fa';
import axios from 'axios';


export default function ListeEtudiant() {
  // États
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState('');
  const [selectAll, setSelectAll] = useState(false);
  const [individualSelection, setIndividualSelection] = useState({});
  const [infoEtu, setInfoEtu] = useState([]);
  const [envoyer, setEnvoyer] = useState(false);
  const [envoyeEtudiant, setEnvoyeEtudiant] = useState([]);
  const [info,setInfo]=useState([]);
  const [studentDetails, setStudentDetails] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const Verification=(email)=>{
    const exist=info.some(student=>student.email===email && student.etat===true);
    if(exist){
   return true;
    }else{
    return false;
    }
  }
 
const CLoseWindow=(e)=>{
  e.preventDefault();
  setShowModal(false);
}


const OpenWindow=(e,info)=>{
  e.preventDefault();
  setShowModal(true);
  setStudentDetails(info)
}


const Window = showModal && studentDetails &&(
  <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center ">
          <div className="bg-white p-6 rounded-lg shadow-md w-96 fenetre">
            
            <h2 className="text-lg font-semibold mb-4">Information Etudiant</h2>
           
              <div className="mb-4">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">Nom/Prenom:</label>
                <input type="text" id="title" readOnly className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" value={studentDetails['nom/prenom']} />
              </div>
              <div className="mb-4">
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">Section:</label>
                <input type="text" name="section" id="section" value={studentDetails['section']}  readOnly/>
              </div>
              <div className="mb-4">
                <label htmlFor="file" className="block text-sm font-medium text-gray-700">Fichier:</label>
                <input type="text" id="filier" className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" value={studentDetails['filier']} />
              </div>
              <div className="mb-4">
                <label htmlFor="file" className="block text-sm font-medium text-gray-700">Matricule:</label>
                <input type="text" id="matricule" className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" value={studentDetails['matricule']} />
              </div>
              <div className="mb-4">
                <label htmlFor="file" className="block text-sm font-medium text-gray-700">Email:</label>
                <input type="text" id="email" className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" value={studentDetails['email']} />
              </div>
              <div>
              <div className="mb-4">
                <label htmlFor="file" className="block text-sm font-medium  text-red-600">Etat d'envoi:</label>
                <input type="text" id="email" className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" value={Verification(studentDetails['email'])?"Envoyer":"Non envoyer"} />
              </div>
              <div className="mb-4">
                <label htmlFor="file" className="block text-sm font-medium  text-red-600">Etat de Binom:</label>
                <input type="text" id="email" className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" value={'plus tard....'} />
              </div>
              </div>
              <div className="flex justify-center">
                <button onClick={CLoseWindow} className="ml-2 text-white  px-4 py-2 rounded-md bg-blue-500">Annuler</button>
              </div>
            
          </div>
        </div>
);


  useEffect(()=>{
   axios.get('http://localhost:3001/admin/information-etu')
   .then(response=>{
    setInfo(response.data);
   })
   .catch(err=>console.log(err));
  },[envoyer])


  // Fonction pour charger le fichier XLSX
  const handleFileUpload = (e) => {
    const reader = new FileReader();
    reader.readAsBinaryString(e.target.files[0]);
    reader.onload = (e) => {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: 'binary' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const parsedData = XLSX.utils.sheet_to_json(sheet);
      setStudents(parsedData);    
    };
   
  };



  // Fonction pour retourner à la page d'administration
  const navigate = useNavigate();
  const returnAdmin = (e) => {
    e.preventDefault();
    navigate('/Admin/Setting');
  };

  // Fonction pour effectuer une recherche
  const HandelSearch = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  // Fonction pour sélectionner tous les checkbox
  const handleSelectAll = () => {
    const newSelectAllState = !selectAll;
    setSelectAll(newSelectAllState);

    const newIndividualSelection = {};
    students.forEach((student, index) => {
      newIndividualSelection[index] = newSelectAllState;
    });
    setIndividualSelection(newIndividualSelection);

    if (newSelectAllState) {
      const allStudentInfo = students.map((student) => ({
        nomPrenom: student['nom/prenom'],
        email: student['email'],
        matricule: student['matricule'],
        filier: student['filier'],
        section: student['section'],
        loginInfo: false,
      }));
      setInfoEtu(allStudentInfo);
    } else {
      setInfoEtu([]);
    }
  };

  // Fonction pour changer l'état d'un checkbox individuel
  const handleCheckboxChange = (index, nomPrenom, email, matricule, filier, section) => {
    const newIndividualSelection = { ...individualSelection };
    newIndividualSelection[index] = !newIndividualSelection[index];
    setIndividualSelection(newIndividualSelection);

    if (newIndividualSelection[index]) {
      if (!infoEtu.some((info) => info.email === email)) {
        setInfoEtu((prevInfo) => [
          ...prevInfo,
          {
            nomPrenom: nomPrenom,
            email: email,
            matricule: matricule,
            filier: filier,
            section: section,
            loginInfo: false,
          },
        ]);
      }
    } else {
      setInfoEtu((prevInfo) => prevInfo.filter((info) => info.email !== email));
    }
  };

  // Fonction pour envoyer les emails
  const EnvoyerEmail = (e) => {
    e.preventDefault();

    const selectedStudents = students.filter((student, index) => individualSelection[index]);
    const updatedInfoEtu = infoEtu.map((student) => ({
      ...student,
      loginInfo: selectedStudents.some((selected) => selected['email'] === student['email']),
    }));
     console.log(updatedInfoEtu)
    axios.post('http://localhost:3001/admin/login-info-etu', { info: updatedInfoEtu })
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          if (res.data.message === 'failed') {
            alert('Certains des étudiants que vous avez cochés sont déjà des étudiants avec ces informations de connexion.');
          } else {
            alert('Information sent successfully');
            setEnvoyer(true);
            setEnvoyeEtudiant(selectedStudents.map((student) => student['email'])); // Mettre à jour les étudiants envoyés
            setInfoEtu([]);
          }
        } else {
          console.error('Failed to send information:', res.data.message || res.statusText);
        }
      })
      .catch((err) => console.error('Error sending information:', err));
  
    setInfoEtu(updatedInfoEtu);
    setEnvoyer(false);
  };
  

  return (
    <div className='page-etudiant relative bg-gray-500 bg-opacity-5'>
      <div className='top-0 left-0 absolute flex items-center'>
        <div className='flex items-center'>
          <Link onClick={returnAdmin} className='hover:text-red-500 text-black rounded flex items-center ml-4 mt-4'>
            <IoIosArrowBack className='mr-2' />
            Retourner à la page d'administration
          </Link>
        </div>
      </div>

      <h1 className='font-bold text-3xl mb-4 text-black mt-4 text-center'>Liste Etudiant</h1>

      <div className='flex flex-row justify-center items-center gap-3 mb-4'>
        <label htmlFor='file-upload' className='file-upload-button'>
          Choisir un fichier
        </label>
        <input type='file' id='file-upload' onChange={handleFileUpload} accept='.xls,.xlsx' style={{ display: 'none' }} />
        {students.length > 0 && (
          <button
            disabled={!Object.values(individualSelection).some((selected) => selected)}
            className={`bg-blue-500 px-4 py-2 text-white  rounded cursor-pointer ${
              !Object.values(individualSelection).some((selected) => selected)
                ? 'opacity-50 cursor-not-allowed'
                : '  hover:bg-blue-700 '
            }`}
            onClick={EnvoyerEmail}>
            Envoyer
          </button>
        )}
      </div> 

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
            placeholder='Chercher étudiant'
            onChange={HandelSearch}
            value={search}
          />
        </div>
      </div>

      <div className='table-container'>
        <div className='relative overflow-x-auto shadow-md sm:rounded-lg table-etudiant mt-4' style={{ maxHeight: 'calc(100vh - 300px)', overflowY: 'auto' }}>
          <table className='w-full text-sm text-left rtl:text-right  text-white '>
            <thead className='text-xs text-gray-700 uppercase bg-gray-300 dark:bg-gray-700 dark:text-gray-400'>
              <tr>
                <th scope='col' className='p-4 bg-gray-300 text-black'>
                  <div className='flex items-center '>
                    <input
                      id='checkbox-all-search'
                      type='checkbox'
                      className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                      onChange={handleSelectAll}
                      checked={selectAll}
                    />
                    <label htmlFor='checkbox-all-search' className='ml-2'>
                      Sélectionner tout
                    </label>
                  </div>
                </th>
                <th scope='col' className='px-6 py-3 bg-gray-300 text-black'>
                  Nom/Prenom
                </th>
                <th scope='col' className='px-6 py-3 bg-gray-300 text-black'>
                  Email
                </th>
                <th scope='col' className='px-6 py-3 bg-gray-300 text-black'>
                  Matricule
                </th>
                <th scope='col' className='px-6 py-3 bg-gray-300 text-black'>
                  Filier
                </th>
                <th scope='col' className='px-6 py-3 bg-gray-300 text-black'>
                  Section
                </th>
                <th scope='col' className='px-6 py-3 bg-gray-300 text-black'>
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
                  <tr
                    key={index}
                    className='bg-white border-b transition duration-300 hover:bg-gray-50  '>
                    <td className='w-4 p-4 '>
                      <div className='flex items-center'>
                        <input
                          id={`checkbox-table-search-${index}`}
                          type='checkbox'
                          className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                          checked={individualSelection[index] || false ||Verification(row['email'])}
                          onChange={() =>
                            handleCheckboxChange(
                              index,
                              row['nom/prenom'],
                              row['email'],
                              row['matricule'],
                              row['filier'],
                              row['section']
                            )
                          }
                          disabled={envoyer && envoyeEtudiant.includes(row['email']) ||Verification(row['email'])}
                        />
                        <label htmlFor={`checkbox-table-search-${index}`} className='sr-only'>
                          checkbox
                        </label>
                      </div>
                    </td>
                   
                    {Object.values(row).map((value, index) => (
                      <td key={index} className='px-6 py-4  text-black cursor-pointer   ' onClick={(e) => OpenWindow(e,row)}>
                        {value}
                      </td>
                    ))}
                    <td className='text-black bg-white '>
                      {envoyer && envoyeEtudiant.includes(row['email']) ||  Verification(row['email']) ? ( // Condition pour afficher le check icon
                        <div>
                          <p>Envoyé</p>
                          <FaCheckCircle style={{color:'green'}} />
                        </div>
                      ) : (
                        <div>
                          <p>Non envoyé</p>
                          <FaTimesCircle style={{color:'red'}} />
                        </div>
                      )}
                    </td>
                    
                  </tr>
                ))}
            </tbody>
            <tr>
              <td colSpan="7" className="px-6 py-4 text-center">
            {students.length === 0 ? <h4 className='font-bold text-black'>Pas de fichier selectionner ?</h4> : ''}
            </td>
            </tr>
          </table>
          {Window}
          
        </div>
      </div>
    </div>
  );
}