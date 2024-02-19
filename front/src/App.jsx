import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './utils/HomePage';
import Reset from './utils/Reset';
import Info from './utils/Info';
import AdminProfile from './Admin/AdminProfile';
import Admin from './Admin/Admin';
import CheckAdmin from './Admin/CheckAdmin';
import LoginAdmin from './Admin/LoginAdmin';
import ErrorPage from './utils/ErrorPage';
import { AdminUserProvider } from './Admin/AdminUserProvider';
import Inbox from './Admin/Inbox';
import Setting from './Admin/Setting';
import Docs from './Admin/Docs';
import ListeEtudiant from './Admin/ListeEtudiant';
import ListeProf from './Admin/ListeProf';
import ListePfe from './Admin/ListePfe';
import DetailsMessages from './Admin/DetailsMessages';

export default function App() {
  return (
    <div>
      <AdminUserProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />} />

          
          <Route  element={<CheckAdmin />}>
            <Route path='/Admin' element={<Admin />} >

            <Route path='Profile' element={<AdminProfile />} />

            <Route path='Inbox' element={<Inbox />} >
              <Route path='Messages' element={<DetailsMessages/>}/>
            </Route>
            
            <Route path='Setting' element={<Setting />} />
            <Route path='ListeEtudiant' element={<ListeEtudiant />} />
            <Route path='ListeProf' element={<ListeProf />} />
            <Route path='ListePfe' element={<ListePfe />} />
            <Route path='Docs' element={<Docs />} />
            
            </Route>
          </Route>
          
          
          <Route path='/LoginAdmin' element={<LoginAdmin/>}/>
          <Route path='/Reset' element={<Reset />} />
          <Route path='/Info' element={<Info />} />
          <Route path='*' element={<ErrorPage/>}/>
        </Routes>
      </BrowserRouter>
      </AdminUserProvider>
    </div>
  );
}
