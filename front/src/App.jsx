import React from 'react'
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import HomePage from './utils/HomePage'



export default function App() {
  

  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
      </Routes>
      </BrowserRouter>

    </div>
  )
}


