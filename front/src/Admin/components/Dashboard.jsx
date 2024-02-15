import React from 'react';
import Navbar from './Navbar';

export default function Dashboard(props) {
  return (
    <div className={`${props.sidebar ? "w-full" : "w-8/12  scroll-hidden ml-64 nav-page"}`}>
      <Navbar sidebar={props.sidebar} sidebareFunc={props.sidebareFunc}/>
    </div>
  )
}
