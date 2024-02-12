import React from 'react';
import Body from './Body';
import Footer from './Footer';
import Header from './Header';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header en haut */}
      <div className="absolute top-0 w-full"><Header /></div>

      {/* Body au centre */}
      <div className="flex-grow"><Body /></div>

      {/* Footer en bas */}
      <div className=" bottom-0 w-full"><Footer /></div>
    </div>
  );
}
