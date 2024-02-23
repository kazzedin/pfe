import React from 'react';
import Body from './Body';
import Footer from './Footer';
import Header from './Header';

export default function HomePage() {
  return (
    <div className="contenaire flex flex-col min-h-screen bg-gray-200 ">
      {/* Header  */}
      <div className="absolute top-0 w-full header "><Header /></div>

      {/* Body */}
      <div className="flex-grow mt-20 "><Body /></div>

      {/* Footer */}
      <div className=" bottom-0 w-full"><Footer /></div>
    </div>
  );
}
