import React, { useState, useContext } from 'react';
import axios from 'axios';
import MessageContext from '../Admin/MessageProvider';


export default function Contact() {
  const [inputs, setInputs] = useState({ email: '', message: '' });
  const { setUnreadMessages,unreadMessages } = useContext(MessageContext);
 

  const handleEnvoyer = (e) => {
    e.preventDefault();

    axios.post('http://localhost:3001/admin/contact', {
      sender: inputs.email,
      message: inputs.message,
      type: 'contact'
    })
    .then(res => {
      console.log(res);
      alert('Your message has been sent');
      setInputs({ email: '', message: '' });
      setUnreadMessages(true);
    })
    .catch(err => {
      console.log(err);
      alert('An error has occurred!!!');
    });
  };

  const handleInputs = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs({ ...inputs, [name]: value });
    
  };
console.log(unreadMessages)
  return (
    <form className="mt-4" onSubmit={handleEnvoyer}>
      <div className="mb-4">
        <label htmlFor="email" className="block text-black font-semibold mb-2">Email :</label>
        <input type="text" id="email" name="email" className="w-1/2 px-3 py-2 border bg-transparent border-black rounded-md focus:outline-none focus:border-blue-500 text-black placeholder-gray-600" placeholder="Entrez votre email" value={inputs.email} onChange={handleInputs} />
      </div>
      <div className="mb-4">
        <label htmlFor="message" className="block text-black font-semibold mb-2">Message :</label>
        <textarea id="message" name="message" className="w-1/2 px-3 py-2  bg-transparent border border-black rounded-md focus:outline-none focus:border-blue-500 text-black placeholder-gray-600 " placeholder="Entrez votre message ici" rows="4" value={inputs.message} onChange={handleInputs}></textarea>
      </div>
      <button type='submit' className={`bg-blue-500 text-white font-semibold px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600 ${(!inputs.email || !inputs.message) ? 'opacity-50 cursor-not-allowed' : ''}`} disabled={!inputs.email || !inputs.message}>Envoyer</button>
    </form>
  );
}
