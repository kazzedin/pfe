import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './utils/HomePage';
import Reset from './utils/Reset';
import InfoEtu from './utils/InfoEtu';
import InfoPrf from './utils/InfoPrf';
import AdminProfile from './Admin/AdminProfile';
import Admin from './Admin/Admin';
import CheckAdmin from './Admin/CheckAdmin';
import LoginAdmin from './Admin/LoginAdmin';
import ErrorPage from './utils/ErrorPage';
import { AdminUserProvider } from './Admin/AdminUserProvider';
import { MessageProvider } from './Admin/MessageProvider';
import { EtudiantUserProvider } from './Etudiant/EtudiantUserProvider';
import { DataProvider } from './Etudiant/DataProvider';
import Inbox from './Admin/Inbox';
import Setting from './Admin/Setting';
import Docs from './Admin/Docs';
import ListeEtudiant from './Admin/ListeEtudiant';
import ListeProf from './Admin/ListeProf';
import ListePfe from './Admin/ListePfe';
import DetailsMessages from './Admin/DetailsMessages';
import Dates from './Admin/Dates';
import ForgotPassword from './utils/ForgotPassword';
import BinomMonom from './Admin/BinomMonom';
import Homepage from './Etudiant/components/Etudiant';
import CheckEtudiant from './Etudiant/CheckEtudiant';
import ProfileEtudiant from './Etudiant/ProfileEtudiant';
import DocsEtudiant from './Etudiant/DocsEtudiant';
import {DataAdminProvider} from './Admin/DataAdminProvider'
import EtuDates from './Etudiant/EtuDates'
import ChatEtudiant from './Etudiant/ChatEtudiant'
import InboxEtu from './Etudiant/InboxEtu';
import Pfe from './Etudiant/Pfe';
import Encadreur from './Etudiant/Encadreur';
import Binome from './Etudiant/Binome';
import CheckEncadreur from './Encadreure/CheckEncadreur';
import EncadreurHomePage from './Encadreure/components/EncadreurHomePage';
import { EncadreurUserProvider } from './Encadreure/EncadreurUserProvider';
import EncProfile from './Encadreure/EncProfile';
import EncEncadreur from './Encadreure/EncEncadreur'
import EncDocs from './Encadreure/EncDocs';
import EncDates from './Encadreure/EncDates';
import EncChat from './Encadreure/EncChat';
import EncPfe from './Encadreure/EncPfe'
import EncInbox from './Encadreure/EncInbox'


export default function App() {
  return (
    <div>
      
    <AdminUserProvider>
      <BrowserRouter>
        <MessageProvider>
          <EtudiantUserProvider>
          <EncadreurUserProvider>
            <DataProvider>
              <DataAdminProvider>
            <Routes>
              <Route path='/' element={<HomePage />} />
              {/* Routes de Admin */}
              <Route element={<CheckAdmin />}>
                <Route path='/Admin' element={<Admin />} >
                  <Route path='Profile' element={<AdminProfile />}/>
                  <Route path='Inbox' element={<Inbox />} />
                  <Route path='Messages' element={<DetailsMessages/>}/>
                  <Route path='Setting' element={<Setting />} />
                  <Route path='ListeEtudiant' element={<ListeEtudiant />} />
                  <Route path='ListeProf' element={<ListeProf />} />
                  <Route path='ListePfe' element={<ListePfe />} />
                  <Route path='Docs' element={<Docs />} />
                  <Route path='Date' element={<Dates />} />
                  <Route path='Binom-Monom' element={<BinomMonom />} />
                </Route>
              </Route>
              {/* Routes de Etudiant */}
              <Route element={<CheckEtudiant/>}>
                <Route path='/Etudiant' element={<Homepage />}>
                  <Route path='Profile' element={<ProfileEtudiant/>}/>
                  <Route path='Docs' element={<DocsEtudiant/>}/>
                  <Route path='Dates' element={<EtuDates/>}/>
                  <Route path='Chat' element={<ChatEtudiant/>}/>
                  <Route path='Inbox' element={<InboxEtu/>}/>
                  <Route path='Pfe' element={<Pfe/>}/>
                  <Route path='Encadreur' element={<Encadreur/>}/>
                  <Route path='Binomes' element={<Binome/>}/>
                 
                </Route>
              </Route>
              
              {/* Routes de Encadreurs */}
              <Route element={<CheckEncadreur/>}>
                <Route path='/Encadreur' element={<EncadreurHomePage/>}>
                 <Route path='Profile' element={<EncProfile/>}/>
                 <Route path='Encadreur' element={<EncEncadreur/>}/>
                 <Route path='Pfe' element={<EncPfe/>}/>
                 <Route path='Chat' element={<EncChat/>}/>
                 <Route path='Dates' element={<EncDates/>}/>
                 <Route path='Inbox' element={<EncInbox/>}/>
                 <Route path='Docs' element={<EncDocs/>}/>
                </Route>
              </Route>
              {/* Routes Generale */}
              <Route path='/LoginAdmin' element={<LoginAdmin/>}/>
              <Route path='/ForgotPassword' element={<ForgotPassword/>}/>
              <Route path='/Reset' element={<Reset />} />
              <Route path='/InfoEtu' element={<InfoEtu />} />
              <Route path='/InfoPrf' element={<InfoPrf />} />
              <Route path='*' element={<ErrorPage/>}/>
            </Routes>
            </DataAdminProvider>
            </DataProvider>
            </EncadreurUserProvider>
          </EtudiantUserProvider>
        </MessageProvider>
      </BrowserRouter>
    </AdminUserProvider>
  </div>
  );
}
