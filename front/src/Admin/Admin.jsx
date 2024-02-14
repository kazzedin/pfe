import React,{useState} from 'react'
import Sidebar from './components/Sidebar'
import Dashboard from './components/Dashboard'

export default function Admin() {
  const [sideBare,setSideBare]=useState(false)
  return (
    <div className='flex'> 
      <Sidebar sidebar={sideBare}/>
      <Dashboard sidebar={sideBare} sidebareFunc={setSideBare}/>
    </div>
  )
}
