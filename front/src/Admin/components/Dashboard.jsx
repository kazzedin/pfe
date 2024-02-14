import React from 'react'
import Navbar from './Navbar'

export default function Dashboard({SideBare,SetSideBar}) {
  return (
    <div className={`${SideBare ? "" : "ml-64"} w-full`}>
      <Navbar sidebare={SideBare} sidebarefunc={SetSideBar}/>
    </div>
  )
}
