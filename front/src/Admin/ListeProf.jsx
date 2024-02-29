import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';
import * as XLSX from 'xlsx';
import { FaCheck, FaTimes} from 'react-icons/fa';
import axios from 'axios';


export default function ListeProf() {
  // États
  const [prof, setProf] = useState([]);
  const [search, setSearch] = useState('');
  const [selectAll, setSelectAll] = useState(false);
  const [individualSelection, setIndividualSelection] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [infoPrf, setInfoPrf] = useState([]);
  const [envoyer, setEnvoyer] = useState(false);
  const [envoyeProf, setEnvoyeProf] = useState([]);
  const [sectionFilier, setSectionFilier] = useState({});
  const [envoyertout, setEnvoyertout] = useState(false);

  

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
      setProf(parsedData);

      // Extraction de la section et de la filière
      let filier = null;
      let section = null;
      parsedData.some((prof) => {
        if (prof.filier && prof.section) {
          filier = prof.filier;
          section = prof.section;
          return true; // Sortir de la boucle dès qu'une section et une filière sont trouvées
        }
        return false;
      });
      // Mettre à jour l'état de la section et de la filière
      if (filier && section) {
        setSectionFilier({ filier, section });
      } else {
        console.error("Filière ou section non trouvée dans le fichier.");
      }
    };
  };

  // Fonction pour retourner à la page d'administration
  const navigate = useNavigate();
  const returnAdmin = (e) => {
    e.preventDefault();
    navigate('/Admin');
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
    prof.forEach((prof, index) => {
      newIndividualSelection[index] = newSelectAllState;
    });
    setIndividualSelection(newIndividualSelection);

    if (newSelectAllState) {
      const allProfInfo = prof.map((professeur) => ({
        nomPrenom: professeur['nom/prenom'],
        email: professeur['email'],
        filier: professeur['filier'],
        section: professeur['section'],
        loginInfo: false,
      }));
      setInfoPrf(allProfInfo);
    } else {
      setInfoPrf([]);
    }
  };

  // Fonction pour changer l'état d'un checkbox individuel
  const handleCheckboxChange = (index, nomPrenom, email, filier, section) => {
    const newIndividualSelection = { ...individualSelection };
    newIndividualSelection[index] = !newIndividualSelection[index];
    setIndividualSelection(newIndividualSelection);

    if (newIndividualSelection[index]) {
      if (!infoPrf.some((info) => info.email === email)) {
        setInfoPrf((prevInfo) => [
          ...prevInfo,
          {
            nomPrenom: nomPrenom,
            email: email,
            filier: filier,
            section: section,
            loginInfo: false,
          },
        ]);
      }
    } else {
      setInfoPrf((prevInfo) => prevInfo.filter((info) => info.email !== email));
    }
  };

  // Fonction pour envoyer les emails
  const EnvoyerEmail = (e) => {
    e.preventDefault();

    const selectedProf = prof.filter((student, index) => individualSelection[index]);
    const updatedInfoPrf = infoPrf.map((student) => ({
      ...student,
      loginInfo: selectedProf.some((selected) => selected['email'] === student['email']),
    }));

    axios
      .post('http://localhost:3001/admin/login-info-prf', { info: updatedInfoPrf })
      .then((res) => {
        if (res.data.message === 'success') {
          alert('Information sent successfully');
          setEnvoyer(true);
          setEnvoyeProf(selectedProf.map((student) => student['email'])); // Mettre à jour les étudiants envoyés
          if (infoPrf.length === prof.length) {
            setEnvoyertout(true);
          }
        } else {
          alert('Error to send Login Info');
        }
      })
      .catch((err) => console.log(err));

    setInfoPrf(updatedInfoPrf);
  };

  // Fonction pour vérifier la section et la filière
  const VerificationSectionFiliere = (filier, section) => {
    if (sectionFilier.section === section && sectionFilier.filier === filier) {
      return true;
    }
  };

  return (
    <div className='page-professeur relative bg-gray-800 bg-opacity-40'>
      <div className='top-0 left-0 absolute flex items-center'>
        <div className='flex items-center'>
          <Link onClick={returnAdmin} className='hover:text-red-700 text-white rounded flex items-center ml-4 mt-4'>
            <IoIosArrowBack className='mr-2' />
            Retourner à la page d'administration
          </Link>
        </div>
      </div>

      <h1 className='font-bold text-3xl mb-4 text-white mt-4 text-center'>Liste Professeur</h1>

      <div className='flex flex-row justify-center items-center gap-3 mb-4'>
        <label htmlFor='file-upload' className='file-upload-button'>
          Choisir un fichier
        </label>
        <input type='file' id='file-upload' onChange={handleFileUpload} accept='.xls,.xlsx' style={{ display: 'none' }} />
        {prof.length > 0 && (
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
              className='w-4 h-4 ml-6 text-gray-500 dark:text-gray-400'
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
            className='ml-4 bg-gray-800 text-white text-sm w-64 h-9 rounded-sm border-none search'
            placeholder='Chercher Professeur'
            onChange={HandelSearch}
            value={search}
          />
        </div>
      </div>

      <div className='table-container'>
        <div className='relative overflow-x-auto shadow-md sm:rounded-lg table-prof mt-4' style={{ maxHeight: 'calc(100vh - 300px)', overflowY: 'auto' }}>
          <table className='w-full text-sm text-left rtl:text-right text-white '>
            <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
              <tr>
                <th scope='col' className='p-4'>
                  <div className='flex items-center'>
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
                <th scope='col' className='px-6 py-3'>
                  Nom/Prenom
                </th>
                <th scope='col' className='px-6 py-3'>
                  Email
                </th>
                <th scope='col' className='px-6 py-3'>
                  Filier
                </th>
                <th scope='col' className='px-6 py-3'>
                  Section
                </th>
                <th scope='col' className='px-6 py-3'>
                  Etat
                </th>
              </tr>
            </thead>
            <tbody>
              {prof
                .filter((prof, index) => {
                  if (!search) return true;
                  return (
                    String(prof['nom/prenom']).toLowerCase().includes(search.toLowerCase()) ||
                    String(prof['email']).toLowerCase().includes(search.toLowerCase()) 
                  );
                })
                .map((row, index) => (
                  <tr
                    key={index}
                    className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'>
                    <td className='w-4 p-4'>
                      <div className='flex items-center'>
                        <input
                          id={`checkbox-table-search-${index}`}
                          type='checkbox'
                          className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                          checked={individualSelection[index] || false}
                          onChange={() =>
                            handleCheckboxChange(
                              index,
                              row['nom/prenom'],
                              row['email'],
                              row['filier'],
                              row['section']
                            )
                          }
                          disabled={envoyer && envoyeProf.includes(row['email'])}
                        />
                        <label htmlFor={`checkbox-table-search-${index}`} className='sr-only'>
                          checkbox
                        </label>
                      </div>
                    </td>
                    {Object.values(row).map((value, index) => (
                      <td key={index} className='px-6 py-4'>
                        {value}
                      </td>
                    ))}
                    <td>
                      {envoyer && envoyeProf.includes(row['email']) ? ( // Condition pour afficher le check icon
                        <div>
                          <p>Envoyé</p>
                          <FaCheck className='text-green-500' />
                        </div>
                      ) : (
                        <div>
                          <p>Non envoyé</p>
                          <FaTimes className='text-red-500' />
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          <div>{prof.length == 0 ? <h4>Pas de fichier selectionner ?</h4> : ''}</div>
        </div>
      </div>
    </div>
  );
}
