import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-white py-4  bottom-0 w-full shadow-lg">
      <div className=" mx-auto flex justify-between items-center">
        <span className='ml-7 text-gray-700'>© Pfe à Distance. Tous droits réservés.</span>
        <div className='flex flex-col'>
          <a href="https://ent.usthb.dz/index.php/accueil" className="text-black hover:text-blue-500 mr-7" title='ent.usthb'>ent USTHB</a>
        
        </div>
      </div>
    </footer>
  );
}
