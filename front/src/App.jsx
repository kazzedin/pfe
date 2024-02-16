import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './utils/HomePage';
import Reset from './utils/Reset';
import Info from './utils/Info';
import Profile from './utils/Profile';
import Admin from './Admin/Admin';
import CheckAdmin from './Admin/CheckAdmin';
import LoginAdmin from './Admin/LoginAdmin';

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />} />

          
          <Route  element={<CheckAdmin />}>
            <Route path='/Admin' element={<Admin />} />
            <Route path='/Profile' element={<Profile />} />
          </Route>
          
          
          <Route path='/LoginAdmin' element={<LoginAdmin/>}/>
          <Route path='/Reset' element={<Reset />} />
          <Route path='/Info' element={<Info />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
