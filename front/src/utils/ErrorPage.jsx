import React from 'react';
import { Link } from 'react-router-dom';

export default function ErrorPage() {
  return (
    <div className='error-page min-h-screen  flex justify-center items-center'>
      <div className=' gap-8py-9 px-16'>
        <div className='flex flex-col justify-center items-center text-white'>
          <h1 className='text-4xl font-bold'>Ooops!</h1>
          <h4 className='text-xl'>You got an error. Please return to Home Page.</h4>
          <Link to='/' className='text-blue-500 hover:underline'>Home Page</Link>
        </div>
        <div>
          <img src="/error.jpg" alt="ERROR" className='w-full' />
        </div>
      </div>
    </div>
  );
}
