import React from 'react'
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import HomePage from './utils/HomePage'
import Admin from './Admin/Admin'
import CheckAdmin from './Admin/CheckAdmin'



export default function App() {
  

  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/CheckAdmin' element={<CheckAdmin/>}/>
        <Route path='/Admin'element={<Admin/>}/>
      </Routes>
      </BrowserRouter>

    </div>
  )
}


