import React, { useEffect, useState } from 'react';
import { BsInfoCircle } from 'react-icons/bs';
import axios from 'axios';

export default function Setting() {
    // State pour gérer les différentes fonctionnalités de paramètres
    const [selectedSetting, setSelectedSetting] = useState(null);
    const [date,setDate]=useState(0);
    const [message,setMessage]=useState(0);
    const [user,setUsers]=useState(0);
    const [docs,setDocs]=useState(0);
    const [pfe,setPfe]=useState(0);

    const [time, setTime] = useState(new Date());

    // Mettre à jour la date toutes les secondes
    useEffect(() => {
        const intervalID = setInterval(() => {
            setTime(new Date());
        }, 1000);
        
        return () => clearInterval(intervalID);
    }, []);

    useEffect(()=>{
        //date
     axios.get('http://localhost:3001/admin/get-date')
     .then(res=>setDate(res.data))
     .catch(err=>console.log(err))
     //message
      axios.get('http://localhost:3001/admin/get-msg')
     .then(res=>setMessage(res.data))
     .catch(err=>console.log(err))
    //users
     axios.get('http://localhost:3001/admin/get-usr')
     .then(res=>setUsers(res.data))
     .catch(err=>console.log(err))
     //docs
     axios.get('http://localhost:3001/admin/get-docs')
     .then(res=>setDocs(res.data))
     .catch(err=>console.log(err))
     //pfe
      /*axios.get('http://localhost:3001/admin/get-pfe')
     .then(res=>setPfe(res.data))
     .catch(err=>console.log(err)) */
    },[])

    // Fonction pour afficher le contenu de la fonctionnalité sélectionnée
    const handleSettingClick = (setting) => {
        setSelectedSetting(setting);
    };

   

    return (
        <div className="container mx-auto px-4 py-8 0 z-0 page-setting bg-gray-500 bg-opacity-5 overflow-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-300">
             <h1 className="text-2xl font-bold mb-6">Informations générales</h1>
             <p className=" text-gray-600">{time.toLocaleString()}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                    { title: 'Gestion des utilisateurs', key: 'users' },
                    { title: 'Gestion des messages', key: 'messages' },
                    { title: 'Gestion des documents', key: 'document' },
                    { title: 'Gestion des PFE', key: 'pfe' },
                    { title: 'Gestion des dates', key: 'date' },
                    { title: 'Gestion des Binomes/Monomes', key: 'binom/monom' }
                ].map(({ title, key }) => (
                    <div key={key}>
                        <div className="p-4 bg-white rounded-lg shadow-md">
                            <h2 className="text-lg font-semibold mb-4">{title}</h2>
                            <button onClick={() => handleSettingClick(key)} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Voir</button>
                        </div>
                    </div>
                ))}
            </div>
            {/* Contenu de la fonctionnalité sélectionnée */}
            {selectedSetting && (
                 <div className="mt-8">
                 {selectedSetting === 'users' && (
                     <div className="p-4 bg-white rounded-lg shadow-md">
                         <h2 className="text-xl font-semibold mb-4">Gestion des utilisateurs</h2>
                         <div className="flex flex-col gap-4 ">
                             <div className="flex items-center">
                                 <BsInfoCircle className="text-blue-500 mr-2" />
                                 <label htmlFor="etu" >Nombre d'étudiants recever les inforamtion:</label>
                                 <input type="text" id="etu" readOnly defaultValue={0} className="ml-2  border" value={user.etu} />
                             </div>
                             <div className="flex items-center">
                                 <BsInfoCircle className="text-blue-500 mr-2" />
                                 <label htmlFor="prf" >Nombre de professeurs recever les informations:</label>
                                 <input type="text" id="prf" readOnly defaultValue={0} className="ml-2  border " value={user.prf} />
                             </div>

                             <div className="flex items-center">
                                 <BsInfoCircle className="text-blue-500 mr-2" />
                                 <label htmlFor="prf" >Nombre de etudiant non recever les informations:</label>
                                 <input type="text" id="prf" readOnly defaultValue={0} className="ml-2  border " value={user.etun} />
                             </div>

                             <div className="flex items-center">
                                 <BsInfoCircle className="text-blue-500 mr-2" />
                                 <label htmlFor="prf" >Nombre de professeurs non recever les informations:</label>
                                 <input type="text" id="prf" readOnly defaultValue={0} className="ml-2  border " value={user.prfn} />
                             </div>

                             <div className="flex items-center">
                                 <BsInfoCircle className="text-blue-500 mr-2" />
                                 <label htmlFor="total" >Nombre total d'utilisateurs avec informations de connexion:</label>
                                 <input type="text" id="total" readOnly defaultValue={0} className="ml-2  border " value={user.totalrec} />
                             </div>

                             <div className="flex items-center">
                                 <BsInfoCircle className="text-blue-500 mr-2" />
                                 <label htmlFor="total" >Nombre total d'utilisateurs sans informations de connexion:</label>
                                 <input type="text" id="total" readOnly defaultValue={0} className="ml-2  border " value={user.totalnrec}/>
                             </div>
                         </div>
                     </div>
                 )}
                    {selectedSetting === 'messages' && (
                      <div className="p-4 bg-white rounded-lg shadow-md">
                      <h2 className="text-xl font-semibold mb-4">Gestion des messages</h2>
                      <div className="flex flex-col gap-4">
                          <div className="flex items-center">
                              <BsInfoCircle className="text-blue-500 mr-2" />
                              <label htmlFor="contact" >Nombre de messages type contact:</label>
                              <input type="text" id="contact" readOnly defaultValue={0} className="ml-2 border" value={message.contact} />
                          </div>
                          <div className="flex items-center">
                              <BsInfoCircle className="text-blue-500 mr-2" />
                              <label htmlFor="etu" >Nombre de messages de type login-info (étudiant):</label>
                              <input type="text" id="etu" readOnly defaultValue={0} className="ml-2 border" value={message.etu} />
                          </div>
                          <div className="flex items-center">
                              <BsInfoCircle className="text-blue-500 mr-2" />
                              <label htmlFor="prf" >Nombre de messages de type login-info (professeur):</label>
                              <input type="text" id="prf" readOnly defaultValue={0} className="ml-2 border" value={message.prf} />
                          </div>
                          <div className="flex items-center">
                              <BsInfoCircle className="text-blue-500 mr-2" />
                              <label htmlFor="nr" >Nombre de messages répondu:</label>
                              <input type="text" id="nr" readOnly defaultValue={0} className="ml-2 border" value={message.rep} />
                          </div>
                          <div className="flex items-center">
                              <BsInfoCircle className="text-blue-500 mr-2" />
                              <label htmlFor="nnr" >Nombre de messages non répondu:</label>
                              <input type="text" id="nnr" readOnly defaultValue={0} className="ml-2 border" value={message.nerp} />
                          </div>
                          <div className="flex items-center">
                              <BsInfoCircle className="text-blue-500 mr-2" />
                              <label htmlFor="total" >Nombre total de messages:</label>
                              <input type="text" id="total" readOnly defaultValue={0} className="ml-2 border" value={message.total} />
                          </div>
                      </div>
                  </div>
                    )}
                    {selectedSetting === 'document' && (
                        <div className="p-4 bg-white rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-4">Gestion des Documents</h2>
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center">
                                <BsInfoCircle className="text-blue-500 mr-2" />
                                <label htmlFor="docs" >Nombre de documents ajoutés:</label>
                                <input type="text" id="docs" readOnly defaultValue={0} className="ml-2 border" value={docs.count} />
                            </div>
                        </div>
                    </div>
                    )}
                    {selectedSetting === 'pfe' && (
                     <div className="p-4 bg-white rounded-lg shadow-md">
                     <h2 className="text-xl font-semibold mb-4">Gestion des PFE</h2>
                     <div className="flex flex-col gap-4">
                         <div className="flex items-center">
                             <BsInfoCircle className="text-blue-500 mr-2" />
                             <label htmlFor="pfev" >Nombre de PFE validés:</label>
                             <input type="text" id="pfev" readOnly defaultValue={0} className="ml-2 border" />
                         </div>
                         <div className="flex items-center">
                             <BsInfoCircle className="text-blue-500 mr-2" />
                             <label htmlFor="pfenv" >Nombre de PFE non-validés:</label>
                             <input type="text" id="pfenv" readOnly defaultValue={0} className="ml-2 border" />
                         </div>
                         <div className="flex items-center">
                             <BsInfoCircle className="text-blue-500 mr-2" />
                             <label htmlFor="pfeav" >Nombre de PFE à voir:</label>
                             <input type="text" id="pfeav" readOnly defaultValue={0} className="ml-2 border" />
                         </div>
                         <div className="flex items-center">
                             <BsInfoCircle className="text-blue-500 mr-2" />
                             <label htmlFor="total" >Nombre Total de PFE:</label>
                             <input type="text" id="total" readOnly defaultValue={0} className="ml-2 border" />
                         </div>
                     </div>
                 </div>
                    )}
                    {selectedSetting === 'date' &&(
                        <div className="p-4 bg-white rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-4">Gestion des dates</h2>
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center">
                                <BsInfoCircle className="text-blue-500 mr-2" />
                                <label htmlFor="date" >Nombre de date entrer:</label>
                                <input type="text" id="date" readOnly defaultValue={0} className="ml-2 border" value={date.count} />
                            </div>
                        </div>
                    </div>
                    )

                    }
                    {selectedSetting==='binom/monom'&&
                   <div className="p-4 bg-white rounded-lg shadow-md">
                   <h2 className="text-xl font-semibold mb-4">Gestion des Binomes et Monomes</h2>
                   <div className="flex flex-col gap-4">
                       <div className="flex items-center">
                           <BsInfoCircle className="text-blue-500 mr-2" />
                           <label htmlFor="binom" >Nombre des Binomes:</label>
                           <input type="text" id="binom" readOnly defaultValue={0} className="ml-2 border" />
                       </div>
                       <div className="flex items-center">
                           <BsInfoCircle className="text-blue-500 mr-2" />
                           <label htmlFor="monom" >Nombre des Monomes:</label>
                           <input type="text" id="monom" readOnly defaultValue={0} className="ml-2 border"  />
                       </div>
                   </div>
               </div>
                    }
                </div>
            )}
        </div>
    );
}
